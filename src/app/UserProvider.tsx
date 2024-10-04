"use client";
import useLocalStorage, { removeStorage } from "@/constant/useLocalStorage";
import { createContext, useContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "@/store/index";
export const UserContext = createContext<AuthContextProps | undefined>(
  undefined
);
interface AuthContextProps {
  isAuthenticated: boolean;
  login: (data: any) => void;
  logout: () => void;
  userDetails: {
    user_id: number;
    name: string;
    profile_image: string;
    token: string;
    email: string;
    promoter_id: number;
    login_type: string;
  };
}

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState<any>({
    user_id: null,
    name: "",
    profile_image: "",
  });
  const [localStorage, setLocalStorage] = useLocalStorage<any>(
    "loginUser",
    null
  );
  useEffect(() => {
    async function fetch() {
      if (
        localStorage?.token &&
        localStorage?.user_details &&
        localStorage?.user_details?.user_id
      ) {
        setIsAuthenticated(true);
        setUserDetails(localStorage?.user_details);
      }
    }
    fetch();
    // eslint-disable-next-line
  }, []);
  const login = (data: any) => {
    console.log(data, "comes from dispatch");
    setIsAuthenticated(true);
    let newStoreData = {
      token: data.token,
      user_details: {
        token: data.token,
        email: data.email || "",
        user_id: data.user_id || "",
        ...data?.user_details[0],
      },
    };

    setLocalStorage(newStoreData);
    setUserDetails(newStoreData?.user_details);
  };

  const logout = async () => {
    await removeStorage("loginUser");
    setIsAuthenticated(false);
  };

  return (
    <Provider store={store}>
      <UserContext.Provider
        value={{ isAuthenticated, login, logout, userDetails }}
      >
        {children}
      </UserContext.Provider>
    </Provider>
  );
}

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// components/AuthModal.js
import { useState } from "react";
import { createPortal } from "react-dom"; // To render modal outside of the main DOM hierarchy
import Link from "next/link";

const AuthModal = ({ isOpen, onClose }) => {
  console.log(isOpen, "hello modalll");
  if (!isOpen) return null; // Do not render modal if not open

  return (
    <div style={modalOverlayStyle}>
      <div style={modalWrapperStyle}>
        <div style={modalStyle}>
          <div style={modalHeaderStyle}>
            <Link href="#" onClick={onClose}>
              x
            </Link>
          </div>

          <div style={modalBodyStyle}>{}</div>
        </div>
      </div>
    </div>
  );
};

const modalWrapperStyle = {
  width: "500px",
  height: "600px",
};

const modalStyle = {
  background: "white",
  height: "100%",
  width: "100%",
  borderRadius: "15px",
  padding: "15px",
};

const modalOverlayStyle = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
};

const modalBodyStyle = {
  paddingTop: "10px",
};

const modalHeaderStyle = {
  display: "flex",
  justifyContent: "flex-end",
  fontSize: "25px",
};

export default AuthModal;

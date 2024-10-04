"use client";
import React, { useState } from "react";
import AutoCompleteGoogle from "./AutoCompleteGoogle";

function LocationDropdown({
  locationFilter = [],
  setLocationFilter,
}: {
  locationFilter: any[];
  setLocationFilter: Function;
}) {
  const [location, setLocation] = useState<Boolean>(false);

  const handleSelectLocation = (e: any) => {
    setLocationFilter(e);
  };

  const openLocation = (event: any) => {
    event.preventDefault();
    setLocation(location ? false : true);
  };
  return (
    <div className="location-drop">
      <a
        // onClick={openLocation}
        className="btn btn-location text-left"
        href="#"
        role="button"
        id="location-drop-id"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {" "}
        Location{" "}
      </a>
      <ul
        className="dropdown-menu location-drop-list w-auto"
        aria-labelledby="location-drop-id"
      >
        <form>
          <AutoCompleteGoogle
            select={locationFilter}
            setSelect={handleSelectLocation}
          />
        </form>
      </ul>
    </div>
  );
}

export default React.memo(LocationDropdown);

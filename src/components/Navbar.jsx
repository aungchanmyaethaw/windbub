import React from "react";
import { FaSearch } from "react-icons/fa";
import { useAppContext } from "../../contexts/placeContext";
const Navbar = () => {
  const { handleOpen, filterDetails, handleFocusField } = useAppContext();

  const handleOpenbyLocation = () => {
    handleFocusField("location");
    handleOpen();
  };

  const handleOpenbyGuests = () => {
    handleFocusField("guests");
    handleOpen();
  };

  return (
    <nav className="py-8 mb-8 flex justify-between items-center">
      <div>
        <img src="../src/assets/logo.png" alt="logo" />
      </div>
      <div
        className="flex items-center  px-4 !pr-0  shadow-md rounded-2xl cursor-pointer"
        onClick={handleOpen}
      >
        {filterDetails.location ? (
          <h2
            className="py-4 px-4 border-r border-slate-300 text-dark"
            onClick={handleOpenbyLocation}
          >
            {filterDetails.location}
          </h2>
        ) : (
          <h2
            className="py-4 px-4 border-r border-slate-300 text-dark"
            onClick={handleOpenbyLocation}
          >
            All Cities, Finland
          </h2>
        )}
        {filterDetails.guests ? (
          <h2
            className=" py-4 px-4 whitespace-nowrap  border-r border-slate-300 text-dark"
            onClick={handleOpenbyGuests}
          >
            {filterDetails.guests}
          </h2>
        ) : (
          <h2
            className=" py-4 px-4 whitespace-nowrap  border-r border-slate-300 text-gray"
            onClick={handleOpenbyGuests}
          >
            Add guests
          </h2>
        )}
        <div className="flex w-[4rem] h-full justify-center items-center">
          <FaSearch fill="#eb5757" size="1.25rem" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

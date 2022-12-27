import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAppContext } from "../../contexts/placeContext";
const Locations = ({ handleInputLocation, currentLocation }) => {
  const { allCities } = useAppContext();

  return (
    <motion.ul
      initial={{ y: "-10%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-10%", opacity: 0 }}
      transition={{ type: "tween", delay: 0.25 }}
    >
      <li
        className={`group text-dark flex items-center px-8 py-4 hover:bg-primary-color cursor-pointer ${
          currentLocation === "" ? "!text-primary-color" : null
        }`}
        onClick={() => {
          handleInputLocation("");
        }}
      >
        <FaMapMarkerAlt
          fill="#4f4f4f"
          size="1.25rem"
          className={`group-hover:fill-white  ${
            currentLocation === "" ? "fill-primary-color" : null
          }`}
        />
        <span className="ml-2 font-medium group-hover:text-white" id="city">
          All Cities
        </span>
        <span className=" font-medium group-hover:text-white">, Finland</span>
      </li>
      {allCities.map((city) => (
        <li
          key={city}
          className={`group text-dark flex items-center px-8 py-4 hover:bg-primary-color cursor-pointer ${
            currentLocation === city ? "!text-primary-color" : null
          }`}
          onClick={() => {
            handleInputLocation(city);
          }}
        >
          <FaMapMarkerAlt
            fill="#4f4f4f"
            size="1.25rem"
            className={`group-hover:fill-white  ${
              currentLocation === city ? "fill-primary-color" : null
            }`}
          />
          <span className="ml-2 font-medium group-hover:text-white" id="city">
            {city}
          </span>
          <span className="font-medium group-hover:text-white">, Finland</span>
        </li>
      ))}
    </motion.ul>
  );
};

export default Locations;

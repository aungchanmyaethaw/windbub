import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "../../contexts/placeContext";
import Locations from "./Locations";
import Guests from "./Guests";
const TopSearchbar = () => {
  const {
    handleClose,
    handleFocusField,
    focusField,
    setFilterDetails,
    filterDetails,
    ages,
    setAges,
  } = useAppContext();

  const [isLocation, setIsLocation] = useState(false);
  const [isGuests, setIsGuests] = useState(false);
  const [tempAges, setTempAges] = useState(ages);
  const [activeLocation, setActiveLocation] = useState(filterDetails.location);

  const locationRef = useRef();
  const guestRef = useRef();

  useEffect(() => {
    if (focusField === "location") {
      setIsLocation(true);
      setIsGuests(false);
    } else {
      setIsLocation(false);
      setIsGuests(true);
    }
  }, [focusField]);

  useEffect(() => {
    if (filterDetails.location !== "") {
      locationRef.current.value = filterDetails.location;
      setActiveLocation(filterDetails.location.split(",")[0]);
    }
    if (filterDetails.guests !== "") {
      guestRef.current.value = filterDetails.guests;
    }
  }, [filterDetails]);

  const handleInputLocation = (city) => {
    setActiveLocation(city);
    if (city === "") return (locationRef.current.value = "");
    locationRef.current.value = city + ", Finland";
  };

  const handleInputGuests = (total) => {
    if (total === 0) {
      return (guestRef.current.value = "");
    }
    guestRef.current.value = total > 1 ? `${total} guests` : `1 guest`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (locationRef) {
      setFilterDetails((prev) => {
        return { ...prev, location: locationRef.current.value };
      });
    }
    if (guestRef) {
      setFilterDetails((prev) => {
        return { ...prev, guests: guestRef.current.value };
      });
    }

    setAges(tempAges);

    handleClose();
  };

  return (
    <Backdrop
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      onClick={handleClose}
    >
      <TopSearchbarContainer
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        onClick={(e) => e.stopPropagation()}
        transition={{ type: "tween" }}
      >
        <ContainerStyled>
          <form className="flex items-center gap-4  shadow-md rounded-2xl ">
            {/* location */}
            <div
              className={`py-2 px-8 rounded-2xl border-2 border-transparent grow ${
                isLocation ? "border-2 !border-dark" : null
              }`}
              onClick={() => handleFocusField("location")}
            >
              <label
                htmlFor="location"
                className="block mb-1 uppercase text-xs font-bold text-dark"
              >
                location
              </label>
              <input
                type="text"
                className="focus:border-none focus:outline-none pointer-events-none placeholder:text-dark"
                placeholder="All Cities, Finland"
                ref={locationRef}
                disabled
              />
            </div>
            {/* guests */}

            <div
              className={`border-2 border-transparent py-2 px-8  rounded-2xl ${
                isGuests ? "border-2 !border-dark" : null
              } basis-1/3 `}
              onClick={() => handleFocusField("guests")}
            >
              <label
                htmlFor="guests"
                className="block mb-1 uppercase text-xs font-bold text-dark"
              >
                guests
              </label>
              <input
                type="text"
                className="focus:border-none focus:outline-none pointer-events-none"
                placeholder="Add Guests"
                ref={guestRef}
                disabled
              />
            </div>
            {/* submit */}
            <div className=" flex justify-center items-center basis-1/4">
              <button
                className="flex items-center gap-2 font-semibold text-white bg-primary-color px-6 py-4 rounded-xl hover:bg-[#f06565]"
                onClick={handleSubmit}
                type="submit"
              >
                <FaSearch />
                Search
              </button>
            </div>
          </form>

          <section className="mt-6 flex items-center gap-4 ">
            <div className="grow">
              <AnimatePresence>
                {isLocation ? (
                  <Locations
                    handleInputLocation={handleInputLocation}
                    currentLocation={activeLocation}
                  />
                ) : null}
              </AnimatePresence>
            </div>
            <div className="px-8 basis-1/3 ">
              <AnimatePresence>
                {isGuests ? (
                  <Guests
                    handleInputGuests={handleInputGuests}
                    tempAges={tempAges}
                    setTempAges={setTempAges}
                  />
                ) : null}
              </AnimatePresence>
            </div>
            <div className="basis-1/4" />
          </section>
        </ContainerStyled>
      </TopSearchbarContainer>
    </Backdrop>
  );
};

export default TopSearchbar;

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
  opacity: 1;
`;

const TopSearchbarContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 50vh;
  background-color: #fff;
`;

const ContainerStyled = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 4em 2em;
`;

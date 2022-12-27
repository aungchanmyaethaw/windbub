import { createContext, useContext, useState, useMemo, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

const API_URL = "http://localhost:8000/places";

export function AppContextProvider({ children }) {
  const { data, status } = useFetch(["places"], API_URL);
  const [isTopSearchbarOpen, setIsTopSearchbarOpen] = useState(false);
  const [focusField, setFocusField] = useState("location");
  const [filterDetails, setFilterDetails] = useState({
    location: "",
    guests: "",
  });
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [ages, setAges] = useState({ adults: 0, children: 0 });

  useEffect(() => {
    let tempArray = [];

    if (filterDetails.location !== "") {
      const { location, guests } = filterDetails;
      const tempCity = location.split(",")[0];
      const numGuests = Number(guests.split(" ")[0]) || 0;
      tempArray = data?.filter(
        ({ city, maxGuests }) => city === tempCity && numGuests <= maxGuests
      );
      setFilteredPlaces(tempArray);
    } else if (filterDetails.location === "" && filterDetails.guests !== "") {
      const { guests } = filterDetails;

      const numGuests = Number(guests.split(" ")[0]);
      tempArray = data?.filter(({ maxGuests }) => numGuests <= maxGuests);
      setFilteredPlaces(tempArray);
    } else {
      setFilteredPlaces(data);
    }
  }, [filterDetails, data]);

  const handleOpen = () => {
    setIsTopSearchbarOpen(true);
    document.body.style.maxHeight = "100vh";
    document.body.style.overflowY = "hidden";
  };
  const handleClose = () => {
    setIsTopSearchbarOpen(false);
    document.body.style.maxHeight = "";
    document.body.style.overflowY = "";
    setFocusField("location");
  };
  const handleFocusField = (field) => {
    setFocusField(field);
  };

  const allCities = useMemo(() => {
    return [...new Set(data?.map(({ city }) => city))];
  }, [data]);

  const contextValue = {
    filteredPlaces,
    status,
    handleOpen,
    handleClose,
    isTopSearchbarOpen,
    handleFocusField,
    focusField,
    filterDetails,
    allCities,
    setFilterDetails,
    setAges,
    ages,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

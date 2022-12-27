import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/placeContext";
import InputGroup from "./InputGroup";

const Guests = ({ handleInputGuests, tempAges, setTempAges }) => {
  const { ages } = useAppContext();
  const [totalGuests, setTotalGuests] = useState(
    tempAges.children + tempAges.adults
  );
  useEffect(() => {
    handleInputGuests(totalGuests);
  }, [totalGuests]);

  return (
    <motion.div
      initial={{ y: "-10%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-25%", opacity: 0 }}
      transition={{ type: "tween", delay: 0.25 }}
      className="flex flex-col gap-10"
    >
      <InputGroup
        title="Adults"
        subTitle="Ages 13 or above"
        handleTotalGuests={setTotalGuests}
        isAdult
        initialValue={tempAges.adults}
        setTempAges={setTempAges}
      />
      <InputGroup
        title="Children"
        subTitle="Ages 2-12"
        handleTotalGuests={setTotalGuests}
        initialValue={tempAges.children}
        setTempAges={setTempAges}
      />
    </motion.div>
  );
};

export default Guests;

import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const InputGroup = ({
  title,
  subTitle,
  handleTotalGuests,
  isAdult = false,
  initialValue,
  setTempAges,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleIncreaseValue = () => {
    setValue((prev) => prev + 1);
    handleTotalGuests((prev) => prev + 1);
    if (isAdult) {
      setTempAges((prev) => {
        return { ...prev, adults: prev.adults + 1 };
      });
    } else {
      setTempAges((prev) => {
        return { ...prev, children: prev.children + 1 };
      });
    }
  };

  const handleDecreaseValue = () => {
    if (value <= 0) return 0;

    setValue((prev) => prev - 1);
    handleTotalGuests((prev) => prev - 1);
    if (isAdult) {
      setTempAges((prev) => {
        return { ...prev, adults: prev.adults - 1 };
      });
    } else {
      setTempAges((prev) => {
        return { ...prev, children: prev.children - 1 };
      });
    }
  };

  return (
    <div className="flex flex-col gap-1 ">
      <h2 className="font-semibold text-lg leading-3">{title}</h2>
      <span className="text-gray">{subTitle}</span>
      <div className="flex items-center gap-4 mt-2">
        <button
          className="group p-1 border border-dark rounded-md hover:bg-primary-color hover:border-primary-color"
          onClick={handleDecreaseValue}
        >
          <AiOutlineMinus fill="#333" className="group-hover:fill-white" />
        </button>
        <span className="text-dark font-semibold">{value}</span>
        <button
          className="group p-1 border border-dark rounded-md hover:bg-primary-color hover:border-primary-color"
          onClick={handleIncreaseValue}
        >
          <AiOutlinePlus fill="#333" className="group-hover:fill-white" />
        </button>
      </div>
    </div>
  );
};

export default InputGroup;

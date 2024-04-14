import { useState } from "react";
import { countryList } from "../constants/country-list";
import PropTypes from "prop-types";

const ComboBox = ({ value, setValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(countryList);
  const [codeFound, setCodeFound] = useState("");

  const toggleMenu = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleInputChange = (e) => {
    if (e.target.value === "+" || e.target.value.startsWith("+")) setValue(e.target.value);

    else if (isNaN(e.target.value)) {
      return
    }

    
    let filteredOptions = !value
    ? countryList
    : countryList.filter((option) => option.code.includes(value));
    setFilteredOptions(filteredOptions);
    
    let codeFound = filteredOptions.find((option) => option.code === value);
    if(codeFound) setCodeFound(codeFound);

    setValue(e.target.value);
  };

  const handleOptionClick = (code) => {
    let isValidCode = false;
    for (let i = 0; i < countryList.length; i++) {
      if (countryList[i].code === code) {
        isValidCode = true;
        break;
      }
    }

    if (!isValidCode) {
      return
    }
    setValue(code);
    setIsOpen(false);
  };

  const checkCountryCode = (code) => {
    let isValidCode = false;
    for (let i = 0; i < countryList.length; i++) {
      if (countryList[i].code === code) {
        isValidCode = true;
        break;
      }
    }
    if (!isValidCode) {
      setValue("")
    }
  }

  return (
    <>
      <div className="relative w-[100px] z-40">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          className="shadow-md relative z-30 bg-gray-100 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 w-full"
          placeholder="+91"
          onClick={toggleMenu}
          onBlur={checkCountryCode}
        />
        {isOpen && (
          <div className="max-h-[200px] overflow-y-scroll absolute mt-1 w-[100px] bg-white border border-gray-300 rounded shadow-md">
            {filteredOptions?.map((option, index) => (
              <div
                key={index}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100
                ${index === filteredOptions?.length - 1
                    ? "border-b border-gray-300"
                    : ""
                  }
              `}
                onClick={() => handleOptionClick(option.code)}
              >
                {option.code}
              </div>
            ))}
            {filteredOptions?.length === 0 && (
              <div className="px-3 py-2 text-wrap text-xs">Invalid code</div>
            )}
          </div>
        )}
      </div>
      {isOpen && <div className="absolute inset-0 bg-transparent z-30" onClick={() => setIsOpen(false)}>

      </div>}
    </>
  );
};

export default ComboBox;

ComboBox.propTypes = {
  data: PropTypes.array,
  value: PropTypes.string,
  setValue: PropTypes.func,
};

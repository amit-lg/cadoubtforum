import PropTypes from "prop-types";
import Button from "./Button";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";

const PasswordInput = ({
  placeholder,
  value,
  onChange,
  className,
  name,
  required,
  error,
  setError,
}) => {
  const [showPass, setShowPass] = useState(false);
  const toggleShowPass = () => {
    setShowPass((showPass) => !showPass);
  };
  return (
    <div
      className={`
        bg-gray-100
        rounded-md
        w-full
        flex
        items-center
        justify-between
        relative
        z-20
        shadow-md
        ${error && "border-2 border-red-500"}
        ${className}
        `}
    >
      <input
        type={showPass ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        onBlur={() => setError(false)}
        required={required}
        className={`
            p-2
            outline-none
            rounded-md
            bg-gray-100
            text-sm
            w-[90%]
        `}
      />
      <Button
        variant="transparent"
        className="border-none"
        type="button"
        onClick={toggleShowPass}
      >
        {showPass ? (
          <BsEyeSlash className="text-gray-500" />
        ) : (
          <BsEye className="text-gray-500" />
        )}
      </Button>
    </div>
  );
};

export default PasswordInput;

PasswordInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  register: PropTypes.func,
  required: PropTypes.bool,
  error: PropTypes.bool,
  setError: PropTypes.func,
};

import PropTypes from "prop-types";

const Input = ({
  placeholder,
  value,
  onChange,
  className,
  name,
  type,
  required,
  error,
  setError,
  maxLength,
  pattern
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      name={name}
      required={required}
      onBlur={() => setError(false)}
      pattern={pattern}
      
      className={`
            relative
            z-30
            p-2
            outline-none
            rounded-md
            shadow-md
            bg-gray-100
            w-full
            text-sm
            ${error && "border-2 border-red-500"}
            ${className}
        `}
    />
  );
};

export default Input;

Input.propTypes = {
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
  maxLength: PropTypes.number,
  pattern: PropTypes.string
};

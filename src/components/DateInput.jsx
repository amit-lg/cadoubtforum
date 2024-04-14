import PropTypes from "prop-types";
const DateInput = ({
  name,
  id,
  type,
  label,
  placeholder,
  onChange,
  value,
  disabled,
  error,
}) => {
  return (
    <div className="mb-3 w-full">
      <p
        id="date"
        className="block font-medium mb-[2px] text-blue-500"
        htmlFor={"date"}
      >
        {label}
      </p>
      <div className="relative">
        <input
          disabled={disabled}
          value={value}
          name={name}
          onChange={onChange}
          type={type}
          className={`px-2 py-2 border w-full outline-none rounded-md ${
            error ? "border-red-500" : ""
          }`}
          id="date"
          placeholder={placeholder}
        />
        {/* <label className="cursor-pointer absolute bg-transparent top-0 left-0 bg-red-500 w-full h-full" htmlFor="date"></label> */}
      </div>
      <div className="h-4 text-red-500 text-xs">
        {error && <span>{error}</span>}
      </div>
    </div>
  );
};

export default DateInput;

DateInput.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
};

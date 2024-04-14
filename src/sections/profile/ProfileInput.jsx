import PropTypes from "prop-types";
const ProfileInput = ({
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
      <label className="block font-medium mb-[2px] text-blue-500" htmlFor={id}>
        {label}
      </label>
      <input
        disabled={disabled}
        value={value}
        name={name}
        onChange={onChange}
        type={type}
        className={`px-2 py-2 border w-full outline-none rounded-md ${
          error ? "border-red-500" : ""
        }`}
        id={id}
        placeholder={placeholder}
      />
      <div className="h-4 text-red-500 text-xs">{error && <span>{error}</span>}</div>
    </div>
  );
};

export default ProfileInput;

ProfileInput.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool
};

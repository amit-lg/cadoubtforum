import PropTypes from "prop-types";
const ProfileTextArea = ({
  name,
  id,
  type,
  label,
  placeholder,
  onChange,
  value,
  disabled
}) => {
  return (
    <div className="mb-3 w-full">
      <label className="block font-medium mb-[2px] text-blue-500" htmlFor={id}>
        {label}
      </label>
      <textarea
        value={value}
        name={name}
        onChange={onChange}
        type={type}
        className="px-2 py-2 border w-full outline-none rounded-md whitespace-pre-wrap"
        id={id}
        placeholder={placeholder}
        rows={5}
        disabled={disabled}
      />
    </div>
  );
};

export default ProfileTextArea;

ProfileTextArea.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool
};

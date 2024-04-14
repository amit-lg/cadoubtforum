import PropTypes from "prop-types";

const Button = ({ type, name, onClick, children, variant , className, fullWidth , disabled , textColor}) => {
  return (
    <button 
        disabled={disabled}
        type={type} 
        name={name} 
        onClick={onClick}
        className={`
            p-2
            px-4
            outline-none
            focus:outline-none
            text-sm
            rounded-md
            ${textColor ? textColor : "text-white"}
            ${!disabled && "bg-blue-500"}
            ${variant === "outline" && "border-2 border-white"}
            ${variant === "transparent" && "border-2 border-white bg-transparent"}
            ${variant === "contained" && "bg-black"}
            ${fullWidth && "w-full"}
            ${disabled && "cursor-not-allowed bg-blue-200"}
            ${className}
        `}
    >
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  variant : PropTypes.string,
  className : PropTypes.string,
  fullWidth : PropTypes.bool,
  disabled : PropTypes.bool,
  textColor : PropTypes.string
};

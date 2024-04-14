import PropTypes from "prop-types";
const Badge = ({ value }) => {
  return (
    <div className="text-[10px] leading-0 bg-blue-500 rounded-full text-white font-semibold h-5 w-5 flex items-center justify-center absolute -top-2 left-5">
      {value}
    </div>
  );
};

export default Badge;

Badge.propTypes = {
  value: PropTypes.number,
};

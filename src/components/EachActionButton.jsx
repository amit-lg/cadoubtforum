import PropTypes from "prop-types";

const EachActionButton = ({Icon , value , selected }) => {
  return (
    <div className={`cursor-pointer flex items-center gap-1 ${selected ? "text-blue-500" : "text-gray-400"}`}>
      <span className="material-symbols-outlined">
        {Icon}
      </span>
      <div className="text-sm">{value}</div>
    </div>
  );
};

export default EachActionButton;

EachActionButton.propTypes = {
  Icon: PropTypes.node,
  value: PropTypes.number,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  setLiked: PropTypes.func,
};

import PropTypes from "prop-types";

const Card = ({ children , className }) => {
  return (
    <div className={`w-full p-3 shadow rounded-lg bg-white ${className}`}>
      {children}
    </div>
  );
};

export default Card;

Card.propTypes = {
  children: PropTypes.node,
  className : PropTypes.string
}
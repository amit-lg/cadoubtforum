import PropTypes from "prop-types";

const Icon = ({ children }) => {
  return (
    <div className="shadow w-[30px] h-[30px] flex items-center justify-center p-1 bg-gray-300 rounded-full">
        {children}
    </div>
    );
};

export default Icon;

Icon.propTypes = {
    children : PropTypes.node
};

import PropTypes from "prop-types";

const Avatar = ({ className, user, size }) => {
  return (
    <div
      className={`
        ${size === "small" ? "w-[30px] h-[30px]" : "h-[40px] w-[40px]"} flex items-center justify-center rounded-full ${
        user?.image ? "" : "bg-gray-400"
      }
        ${className}
        `}
    >
      {user?.image ? (
        <img
          src={user?.image}
          alt={user?.name ? user?.name : "User Avatar"}
          className="rounded-full h-full w-full object-cover"
        />
      ) : (
        <span className="text-white text-xl">
          {user?.name?.split(" ")[0].charAt(0)}
        </span>
      )}
    </div>
  );
};

export default Avatar;

Avatar.propTypes = {
  user: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
};

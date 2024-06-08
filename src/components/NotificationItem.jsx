import { Link } from "react-router-dom";
import Avatar from "./ui/Avatar";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { closeNotification } from "../redux/reducers/appReducer";

const NotificationItem = ({ notification }) => {
  const dispatch = useDispatch();

  const user = {
    name: notification?.user?.name,
    image: notification?.user?.profile,
  };

  const closeNotificationMenu = () => {
    dispatch(closeNotification());
  };
  return (
    <Link
      onClick={closeNotificationMenu}
      to={`/question/${notification?.questionid}`}
      className={`flex items-start space-x-3 ${notification?.notseen ? "bg-gray-100" : ""} bg-white border-b p-3`}
    >
      <Avatar user={user} />
      <div className="flex flex-col space-y-1">
        <span className="text-sm font-semibold text-blue-500">
          {user?.name}
        </span>
        <span className="text-sm text-gray-500">{notification?.message}</span>
      </div>
    </Link>
  );
};

export default NotificationItem;

NotificationItem.propTypes = {
  notification: PropTypes.object,
};

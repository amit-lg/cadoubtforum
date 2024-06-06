import { useDispatch, useSelector } from "react-redux";
import { closeNotification } from "../redux/reducers/appReducer";
import { MdClose } from "react-icons/md";
import useOutsideClick from "../hooks/usClickOutside";
import { useRef } from "react";
import NotificationItem from "./NotificationItem";

const Notifications = () => {
  const { notifications } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const target = useRef();

  const closeNotificationMenu = () => {
    dispatch(closeNotification());
  };

  useOutsideClick(target, closeNotificationMenu);
  return (
    <>
      <div ref={target} className={`w-full h-full relative`}>
        <div
          onClick={closeNotificationMenu}
          className="absolute z-50 top-2 right-2"
        >
          <MdClose color="black" fontSize="1.5rem" className="cursor-pointer" />
        </div>
        <div className="h-full w-full bg-white bg-opacity-500 m-auto text-gray-500 shadow-lg py-7 overflow-y-scroll">
          {
            notifications?.length === 0 && (
              <div className="text-center flex items-center justify-center h-full w-full">
                No Notifications yet
              </div>
            )
          }
          {notifications?.map((notification, idx) => (
            <NotificationItem key={idx} notification={notification} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Notifications;

import { useDispatch } from "react-redux";
import { closeNotification } from "../redux/reducers/appReducer";
import { MdClose } from "react-icons/md";

const Notifications = () => {
  const dispatch = useDispatch();

  const closeNotificationMenu = () => {
    dispatch(closeNotification());
  };

  return (
    <>
      <div className={`w-full h-full relative`}>
        <div
          onClick={closeNotificationMenu}
          className="absolute z-50 top-2 right-2"
        >
          <MdClose color="black" fontSize="1.5rem" className="cursor-pointer"/>
        </div>
        <div className="h-full w-full bg-white bg-opacity-500 m-auto flex items-center justify-center text-gray-500 shadow-lg">
          <div className="">
            Coming Soon
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;

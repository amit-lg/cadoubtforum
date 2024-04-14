import Avatar from "./ui/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { closeMobileSidebar } from "../redux/reducers/appReducer";

const UserDetails = () => {
  const dispatch = useDispatch();
  const { collapsedSidebar } = useSelector((state) => state.app);
  const { user } = useSelector((state) => state.user);

  const closeSidebar = () => {
    dispatch(closeMobileSidebar());
  }
  return (
    <Link onClick={closeSidebar} to="/profile" className={`${collapsedSidebar ? "flex-col gap-2 p-1" : "flex-row p-3"} rounded-md flex items-center relative ${collapsedSidebar ? "bg-transparent" : "delay bg-blue-700"}`}>
      <Avatar user={user} />

      <div className={`${collapsedSidebar ? "ml-0" : "ml-3"} flex flex-col`}>
        <span className={`${collapsedSidebar ? "hidden text-center text-xs" : "flex text-sm"}  text-white font-semibold`}>{user?.name}</span>
        <span className={`${collapsedSidebar ? "flex text-center text-xs" : "hidden text-sm"}  text-white font-semibold`}>{user?.name?.split(" ")[0]}</span>
      </div>
    </Link>
  );
};

export default UserDetails;

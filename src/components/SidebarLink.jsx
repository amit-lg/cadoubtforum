import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { closeMobileSidebar } from "../redux/reducers/appReducer";
import { useDispatch, useSelector } from "react-redux";

const SidebarLink = ({ route, location }) => {
  const { collapsedSidebar } = useSelector((state) => state.app);

  const dispatch = useDispatch();
  const closeSidebar = () => {
    dispatch(closeMobileSidebar());
  };

  return (
    <Link
      onClick={closeSidebar}
      key={route.href}
      to={route.href}
      className={`
      ${!collapsedSidebar ? "m-1" : "my-1"} 
      text-sm group flex 
      ${collapsedSidebar ? "p-5  w-max mx-auto" : "p-3 w-full justify-start"} 
      font-medium cursor-pointer hover:text-white hover:bg-white/30 rounded-lg transition 
      ${
        location.pathname === route.href ? "bg-blue-600" : ""
      }`}
    >
      <div
        className={`
          flex items-center flex-1
          ${collapsedSidebar ? "flex-col" : "flex-row"}
        `}
      >
        {location.pathname === route.href ? (
          <route.selectedIcon
            className={`${collapsedSidebar ? "w-5 h-5" : "w-5 h-5 mr-3"}`}
          />
        ) : (
          <route.icon
            className={`${collapsedSidebar ? "w-5 h-5" : "w-5 h-5 mr-3"}`}
          />
        )}

        {!collapsedSidebar && <span
          className={`font-${
            location.pathname === route.href ? "semibold" : "medium"
          } text-sm text-center `}
        >
          {route.label}
        </span>}
      </div>
    </Link>
  );
};

export default SidebarLink;

SidebarLink.propTypes = {
  route: PropTypes.object,
  location: PropTypes.object,
};
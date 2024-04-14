import { otherRoutes, routes } from "../constants/navLinks";
import UserDetails from "./UserDetails";
import { user } from "../mocks/user";
import { useLocation } from "react-router-dom";
import SidebarLinks from "./SidebarLink";
import {  useSelector } from "react-redux";
import PropTypes from "prop-types";

const Sidebar = ({ handleSidebarState , forMobile}) => {
  const { collapsedSidebar } = useSelector((state) => state.app);

  
  const location = useLocation();
  return (
    <div className=" pt-4 pb-12 flex flex-col h-full text-white bg-blue-500">
      <div className={`py-3 flex-1 relative h-max ${!forMobile && collapsedSidebar ? "px-1 justify-center items-center" : "px-5"}`}>
        {/* Logo */}
        <a
          href="https://aswinibajaj.com/"
          className={`relative flex items-center mb-10 z-50 ${!forMobile &&collapsedSidebar ? "justify-center" : "justify-start"}`}
          target="_blank"
        >
          <div
            className={`
              flex items-center gap-3
              ${!forMobile && collapsedSidebar ? "flex-col" : "flex-row"}
          `}
          >
            <img
              height={50}
              width={50}
              src="https://ik.imagekit.io/vt3qjswze/AB%20Logo/Picture1.png?updatedAt=1696576437741"
              alt="ASWINI BAJAJ"
            />
            {!forMobile && !collapsedSidebar && <h1 className="text-xl font-bold">CA DoubtForum</h1>}
          </div>
        </a>

        {/* Sidebar links */}
        <div className="relative z-50 fade-enter">
          {routes?.map((route) => (
            <SidebarLinks key={route.label} route={route} location={location} />
          ))}
        </div>

        <div
          className="hidden lg:block absolute w-full h-full top-0 left-0 z-40"
          onClick={handleSidebarState}
        ></div>
      </div>

      {/* Help links */}
      <div className={`relative ${collapsedSidebar ? "px-1" : "px-5"}`}>
        <div className="py-3">
          {otherRoutes?.map((route) => (
            <SidebarLinks key={route.label} route={route} location={location} />
          ))}
        </div>
        <UserDetails user={user} />
        {/* <Link to="/test">
          test
        </Link> */}
      </div>
    </div>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  handleSidebarState: PropTypes.func,
  forMobile: PropTypes.bool
};

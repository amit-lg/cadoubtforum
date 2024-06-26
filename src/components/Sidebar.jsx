import { otherRoutes, routes } from "../constants/navLinks";
import UserDetails from "./UserDetails";
import { user } from "../mocks/user";
import { useLocation } from "react-router-dom";
import SidebarLinks from "./SidebarLink";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MdArrowBack, MdFeedback } from "react-icons/md";
import { closeMobileSidebar, openFeedbackPopup } from "../redux/reducers/appReducer";

const Sidebar = ({ handleSidebarState, forMobile }) => {
  const { collapsedSidebar } = useSelector((state) => state.app);

  const dispatch = useDispatch();
  const openFeedbackForm = () => {
    dispatch(openFeedbackPopup());
    dispatch(closeMobileSidebar());
  };

  const location = useLocation();
  return (
    <div className=" pt-4 pb-12 flex flex-col h-full text-white bg-blue-500">
      {!forMobile && <div onClick={() => handleSidebarState()} className="cursor-pointer h-[100px] w-[50px] rounded-r-full rounfed-t-full absolute bg-blue-500 top-1/2 -right-5 -translate-y-1/2 flex items-center justify-end p-2">
        <MdArrowBack  className={`${collapsedSidebar ? "rotate-180" : "rotate-0"} transition-all duration-200 ease-in-out`}/>
      </div>}
      <div
        className={`py-3 flex-1 relative h-max ${
          !forMobile && collapsedSidebar
            ? "px-1 justify-center items-center"
            : "px-5"
        }`}
      >
        {/* Logo */}
        {/* {!forMobile && <div onClick={() => handleSidebarState()} className={`cursor-pointer absolute top-0 ${collapsedSidebar ? "left-1/2 -translate-x-1/2" : "right-2"} p-1 border rounded-full z-50 `}>
          <MdArrowBack className={`transition-all duration-300 ease-in-out ${collapsedSidebar ? "rotate-180" : "rotate-0"}`}/>
        </div>} */}
        <a
          href="https://aswinibajaj.com/"
          className={`relative flex items-center mt-10 mb-10 z-50 ${
            !forMobile && collapsedSidebar ? "justify-center" : "justify-start"
          }`}
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
            {!collapsedSidebar && (
              <h1 className="delay text-base md:text-xl font-bold">
                CA DoubtForum
              </h1>
            )}
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
      <div className={`mt-3 relative ${collapsedSidebar ? "px-1" : "px-5"}`}>
        <div>
          {otherRoutes?.map((route) => (
            <SidebarLinks key={route.label} route={route} location={location} />
          ))}
        </div>
        <div
          id={"feedback"}
          className={`
            ${!collapsedSidebar ? "m-1" : "my-1"} 
            text-sm group flex p-3
            ${collapsedSidebar ? "w-max mx-auto" : "w-full justify-start"} 
            font-medium cursor-pointer hover:text-white hover:bg-white/30 rounded-lg transition 
        `}
          onClick={openFeedbackForm}
        >
          <div
            className={`
              flex items-center flex-1
              ${collapsedSidebar ? "flex-col" : "flex-row"}
          `}
          >
            <MdFeedback
              className={`w-5 h-5 ${collapsedSidebar ? "mr-0" : "mr-3"}`}
            />

            {!collapsedSidebar && (
              <span className={`delay  text-sm text-center `}>Your Feedback</span>
            )}
          </div>
        </div>
        <UserDetails user={user} />
      </div>
    </div>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  handleSidebarState: PropTypes.func,
  forMobile: PropTypes.bool,
};

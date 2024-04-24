import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  closeMobileSidebar,
  setSearchText,
} from "../redux/reducers/appReducer";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters as clearAllQuestionFilters } from "../redux/reducers/allQuestionsReducer";
import { clearFilters as clearAskedQuestionFilters } from "../redux/reducers/askedQuestionsReducer";
import { clearFilters as clearPinnedQuestionFilters } from "../redux/reducers/pinnedQuestionsReducer";
import { clearFilters as clearUnansweredQuestionFilters } from "../redux/reducers/unansweredQuestionsReducer";

const SidebarLink = ({ route, location }) => {
  const { collapsedSidebar } = useSelector((state) => state.app);

  const dispatch = useDispatch();
  const closeSidebar = () => {
    dispatch(closeMobileSidebar());
    dispatch(clearAllQuestionFilters());
    dispatch(clearAskedQuestionFilters());
    dispatch(clearPinnedQuestionFilters());
    dispatch(clearUnansweredQuestionFilters());
    dispatch(setSearchText(""));
  };

  return (
    <Link
      onClick={closeSidebar}
      id={route.id}
      key={route.href}
      to={route.href}
      className={`
      ${!collapsedSidebar ? "m-1" : "my-1"} 
      text-sm group flex p-3
      ${collapsedSidebar ? "w-max mx-auto" : "w-full justify-start"} 
      font-medium cursor-pointer hover:text-white hover:bg-white/30 rounded-lg transition 
      ${location.pathname === route.href ? "bg-blue-600" : ""}`}
    >
      <div
        className={`
          flex items-center flex-1
          ${collapsedSidebar ? "flex-col" : "flex-row"}
        `}
      >
        {location.pathname === route.href ? (
          <route.selectedIcon
            className={`w-5 h-5 ${collapsedSidebar ? "mr-0" : "mr-3"}`}
          />
        ) : (
          <route.icon
            className={`w-5 h-5 ${collapsedSidebar ? "mr-0" : "mr-3"}`}
          />
        )}

        {!collapsedSidebar && (
          <span
            className={`delay font-${
              location.pathname === route.href ? "semibold" : "medium"
            } text-sm text-center `}
          >
            {route.label}
          </span>
        )}
      </div>
    </Link>
  );
};

export default SidebarLink;

SidebarLink.propTypes = {
  route: PropTypes.object,
  location: PropTypes.object,
};

// import Search from "./Search";
import { IoMdNotifications } from "react-icons/io";
import { MdArrowUpward, MdMenu, MdSearch } from "react-icons/md";
import Badge from "./ui/Badge";
import { useDispatch, useSelector } from "react-redux";
import {
  openMobileSidebar,
  openNotification,
  setSearchText,
} from "../redux/reducers/appReducer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { debounceTest } from "../utils/debounce";
import { notificationSeen } from "../apiCalls/notifications";
import {
  setAllToSeen,
  setNotificationCount,
} from "../redux/reducers/notificationReducer";
// import { removeCookies } from "../utils/cookies";
// import { logoutSuccess } from "../redux/reducers/userReducer";
// import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const { notificationState } = useSelector((state) => state.app);

  const location = useLocation();
  const [showSearchBox, setShowSearchBox] = useState(false);

  const [searchTextLocal, setSearchTextLocal] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearchTextLocal = (e) => {
    setSearchTextLocal(e.target.value);

    const debouncedSearchData = debounceTest(
      () => handleSearchTextGlobal(e.target.value),
      1000
    );

    debouncedSearchData();
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch((prev) => !prev);
  };

  const handleSearchTextGlobal = (value) => {
    dispatch(setSearchText(value));
  };

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const openSidebar = () => {
    dispatch(openMobileSidebar());
  };

  const openNotificationMenu = async () => {
    dispatch(openNotification());
    const response = await notificationSeen();
    if (response?.status === 200 || response?.status === 201) {
      dispatch(setAllToSeen());
      dispatch(setNotificationCount(0));
    }
  };

  useEffect(() => {
    setSearchTextLocal("");
    if (
      location.pathname === "/all-questions" ||
      location.pathname === "/asked-questions" ||
      location.pathname === "/pinned-questions" ||
      location.pathname === "/unanswered-questions"
    ) {
      setShowSearchBox(true);
    } else {
      setShowSearchBox(false);
    }
  }, [location.pathname, showSearchBox]);

  return (
    <div className="flex items-center py-3 px-3 md:px-8 bg-white ">
      <div className="relative flex w-full items-center justify-between">
        <div className="flex items-center gap-5">
          <div
            onClick={openSidebar}
            className="flex lg:hidden shadow-md p-2  rounded-full  cursor-pointer"
          >
            <MdMenu className="text-blue-500" fontSize="1.5rem" />
          </div>

          <a
            href="https://aswinibajaj.com/"
            className="flex md:hidden items-center "
            target="_blank"
          >
            <img
              height={50}
              width={50}
              src="https://ik.imagekit.io/vt3qjswze/AB%20Logo/Picture1.png?updatedAt=1696576437741"
              alt="ASWINI BAJAJ"
            />
          </a>

          <h3 className="hidden sm:flex text-md sm:text-xl md:text-2xl font-semibold">
            Hello {user?.name?.split(" ")[0]}, 👋
          </h3>
        </div>
        {/* <Search /> */}

        <div className="flex items-center gap-2">
          <div
            onClick={openNotificationMenu}
            className="relative cursor-pointer"
          >
            <Badge value={0} />
            <IoMdNotifications
              className={`${
                notificationState
                  ? "text-3xl text-blue-500"
                  : "text-3xl hover:text-blue-500"
              }`}
            />
          </div>
          {showSearchBox && (
            <div
              onClick={toggleMobileSearch}
              className="flex sm:hidden relative cursor-pointer"
            >
              <MdSearch className={`text-3xl text-blue-500`} />
            </div>
          )}

          {showSearchBox ? (
            <div className="hidden sm:flex h-full w-[250px] items-center bg-gray-100 rounded-md border border-white">
              <input
                placeholder="Search"
                type="text"
                className="px-1 py-2 bg-gray-100 rounded-md border-none outline-none w-full h-full"
                value={searchTextLocal}
                onChange={handleSearchTextLocal}
              />
              <div className="p-2 h-full rounded-r-md">
                <MdSearch className="text-2xl" />
              </div>
            </div>
          ) : null}
          {/* <div onClick={handleLogout} className="cursor-pointer">
            <MdLogout className="text-2xl text-red-500" />
          </div> */}
        </div>

        {/* Mobile search  */}
        <div
          className={`md:hidden bg-gray-200 rounded-md flex w-full items-center h-[60px] transition-all ease-in-out duration-300 absolute ${
            showMobileSearch ? "-top-1" : "-top-[80px]"
          }`}
        >
          <input
            placeholder="Search"
            type="text"
            className="px-1 py-2 rounded-md bg-transparent border-none outline-none w-[95%] h-full"
            value={searchTextLocal}
            onChange={handleSearchTextLocal}
          />
          <MdArrowUpward
            onClick={toggleMobileSearch}
            className="w-[5%] m-1 text-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

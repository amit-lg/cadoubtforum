// import Search from "./Search";
import { IoMdNotifications } from "react-icons/io";
import { MdMenu, MdSearch } from "react-icons/md";
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
// import { removeCookies } from "../utils/cookies";
// import { logoutSuccess } from "../redux/reducers/userReducer";
// import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const { notificationState } = useSelector((state) => state.app);

  const location = useLocation();
  const [showSearchBox, setShowSearchBox] = useState(false);

  const [searchTextLocal, setSearchTextLocal] = useState("");

  const handleSearchTextLocal = (e) => {
    setSearchTextLocal(e.target.value);

    const debouncedSearchData = debounceTest(() => handleSearchTextGlobal(e.target.value), 1500);

    debouncedSearchData();
  };

  const handleSearchTextGlobal = (value) => {
    dispatch(setSearchText(value));
  };

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const openSidebar = () => {
    dispatch(openMobileSidebar());
  };

  const openNotificationMenu = () => {
    dispatch(openNotification());
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
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="flex lg:hidden shadow-md p-2  rounded-full  cursor-pointer">
            <MdMenu
              onClick={openSidebar}
              className="text-blue-500"
              fontSize="1.5rem"
            />
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

        <div className="flex items-center gap-6">
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

          {showSearchBox ? (
            <div className="h-full w-[250px] flex items-center bg-gray-100 rounded-md border border-white">
              <div className="p-2 h-full rounded-r-md">
                <MdSearch className="text-2xl" />
              </div>
              <input
                placeholder="Search"
                type="text"
                className="px-1 py-2 bg-gray-100 rounded-md border-none outline-none w-full h-full"
                value={searchTextLocal}
                onChange={handleSearchTextLocal}
              />
            </div>
          ) : null}
          {/* <div onClick={handleLogout} className="cursor-pointer">
            <MdLogout className="text-2xl text-red-500" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

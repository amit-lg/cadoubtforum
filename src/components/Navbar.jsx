// import Search from "./Search";
import { IoMdNotifications } from "react-icons/io";
import { MdLogout, MdMenu } from "react-icons/md";
import Badge from "./ui/Badge";
import { useDispatch, useSelector } from "react-redux";
import { openMobileSidebar, openNotification } from "../redux/reducers/appReducer";
import { removeCookies } from "../utils/cookies";
import { logoutSuccess } from "../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openSidebar = () => {
    dispatch(openMobileSidebar());
  };

  const handleLogout = () => {
    removeCookies();
    dispatch(logoutSuccess());
    navigate("/")
  }

  const openNotificationMenu = () => {
    dispatch(openNotification())
  }

  return (
    <div className="flex items-center py-5 px-3 md:px-8 bg-transparent">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="flex lg:hidden shadow-md p-2  rounded-full">
            <MdMenu onClick={openSidebar} fontSize="1.5rem" color="#5A32EA" />
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
            Hello {user?.name?.split(" ")[0]} , 👋
          </h3>
        </div>
        {/* <Search /> */}

        <div className="flex items-center gap-6">
          <div onClick={openNotificationMenu} className="relative cursor-pointer">
            <Badge value={10} />
            <IoMdNotifications className="text-3xl" />
          </div>
          <div onClick={handleLogout} className="cursor-pointer">
            <MdLogout className="text-2xl text-red-500" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;

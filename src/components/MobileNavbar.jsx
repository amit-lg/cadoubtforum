import Sidebar from "./Sidebar";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { closeMobileSidebar } from "../redux/reducers/appReducer";

const MobileSidebar = () => {
  const {mobileSidebarState} = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(closeMobileSidebar());
  };
  
  return (
    <>
      <div
        className={`lg:hidden fixed top-0 left-0 h-full flex w-full z-50 shadow-lg transform transition-transform duration-300 ${
          mobileSidebarState === true ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className={`w-[85%] sm:w-[40%] relative h-full`}>
          <div onClick={closeSidebar} className="absolute z-50 top-2 right-2 cursor-pointer">
            <MdClose
              color="white"
              fontSize="1.5rem"
            />
          </div>
          <Sidebar forMobile={true}/>
        </div>
        <div
          className="'w-[30%] sm:w-[60%] h-full z-50"
          onClick={closeSidebar}
        ></div>
      </div>
    </>
  );
};

export default MobileSidebar;

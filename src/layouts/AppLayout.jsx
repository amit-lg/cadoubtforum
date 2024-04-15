import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/MobileNavbar";
import { useDispatch, useSelector } from "react-redux";
import {
  emptyReportData,
  handleCollapseSidebar,
  setShowReportModal,
} from "../redux/reducers/appReducer";
import { MdAdd } from "react-icons/md";
import AskQuestion from "../components/AskQuestion";
import { useCallback, useEffect, useState } from "react";
import { getUser } from "../apiCalls/user/auth";
import { setProfile } from "../redux/reducers/userReducer";
import Report from "../components/Report";
import Notifications from "../components/Notifications";
import { removeCookies } from "../utils/cookies";
import ImagePopup from "../components/ImagePopup";
import RaiseIssuePopup from "../components/RaiseIssuePopup";
import FeedbackPopup from "../components/FeedbackPopup";

const AppLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const {
    showReportModal,
    notificationState,
    raiseIssuePopup,
  } = useSelector((state) => state.app);
  const { imagePopupState , feedBackPopup } = useSelector((state) => state.app);

  const [showAskQuestionModal, setShowAskQuestionModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { collapsedSidebar } = useSelector((state) => state.app);

  const handleSidebarState = () => {
    dispatch(handleCollapseSidebar());
  };

  const closeShowReportModal = () => {
    dispatch(setShowReportModal(false));
    dispatch(emptyReportData());
  };

  const handleAskQuestionModal = () => {
    setShowAskQuestionModal((showAskQuestionModal) => !showAskQuestionModal);
  };

  const fetchUser = useCallback(async () => {
    const response = await getUser();
    if (response.status === 200) {
      dispatch(setProfile(response.data));
    } else {
      removeCookies();
      navigate("/");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated, fetchUser]);

  return (
    <div className="relative w-full">
      <div className="h-screen w-full">
        <div
          className={`
          hidden h-full z-30 lg:flex md:flex-col md:fixed md:inset-y-0 bg-gray-900 transition-all duration-300 ease-in-out
          ${collapsedSidebar ? "w-16" : "xl:w-72 lg:w-66"}
        `}
        >
          <Sidebar handleSidebarState={handleSidebarState} />
        </div>

        <main
          className={`${
            collapsedSidebar ? "lg:pl-16" : "lg:pl-64 xl:pl-72"
          } bg-background transition-all ease-in-out duration-300`}
        >
          <Navbar />
          <div className="py-3 px-4 md:pl-10 md:pr-8 bg-transparent h-[89vh] overflow-auto">
            <Outlet />

            <div
              onClick={handleAskQuestionModal}
              className="ask-doubt-btn overflow-hidden h-[50px] w-[50px] doubt-animation cursor-pointer absolute bottom-5 right-5 flex gap-3 rounded-full items-center justify-start p-2 text-white bg-blue-500"
            >
              <div className="w-[200px] h-[50px] flex gap-5 items-center">
                <div className="flex items-center justify-center w-[35px] h-[50px]">
                  <MdAdd className="text-xl" />
                </div>
                <div className="text-nowrap">Ask a Doubt</div>
              </div>
            </div>

            {showAskQuestionModal && (
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <AskQuestion handleClose={handleAskQuestionModal} />
              </div>
            )}

            {showReportModal && (
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <Report handleClose={closeShowReportModal} />
              </div>
            )}

            {imagePopupState && (
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <ImagePopup handleClose={closeShowReportModal} />
              </div>
            )}

            {feedBackPopup && (
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <FeedbackPopup handleClose={closeShowReportModal} />
              </div>
            )}

            {raiseIssuePopup && (
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <RaiseIssuePopup handleClose={closeShowReportModal} />
              </div>
            )}
            {/* <div
              className={`absolute ${
                notificationState ? "right-0" : "-right-[300px]"
              } top-0 h-[70vh] w-[300px] transition-all ease-in-out duration-300`}
            >
              <Notifications />
            </div> */}
          </div>
        </main>
        <MobileSidebar />
      </div>
    </div>
  );
};

export default AppLayout;

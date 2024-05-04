import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/MobileNavbar";
import { useDispatch, useSelector } from "react-redux";
import {
  closeAskQuestion,
  emptyReportData,
  handleCollapseSidebar,
  openAskQuestion,
  setShowReportModal,
} from "../redux/reducers/appReducer";
import { MdAdd } from "react-icons/md";
import AskQuestion from "../components/AskQuestion";
import { useCallback, useEffect } from "react";
import { getUser } from "../apiCalls/user/auth";
import { setProfile } from "../redux/reducers/userReducer";
import Report from "../components/Report";
import Notifications from "../components/Notifications";
import { removeCookies } from "../utils/cookies";
import ImagePopup from "../components/ImagePopup";
import RaiseIssuePopup from "../components/RaiseIssuePopup";
import FeedbackPopup from "../components/FeedbackPopup";
import CalenderPopup from "../components/CalenderPopup";
import FormSuccessPopup from "../components/FormSuccessPopup";
import { useResponsive } from "../hooks/useResponsive";

const AppLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { showReportModal, notificationState, raiseIssuePopup, askQuestion } =
    useSelector((state) => state.app);
  const {
    imagePopupState,
    feedBackPopup,
    calenderPopup,
    submitSuccessPopopForFeedback,
    submitSuccessPopopForIssue,
  } = useSelector((state) => state.app);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDesktop } = useResponsive();

  const { collapsedSidebar } = useSelector((state) => state.app);

  const handleSidebarState = () => {
    dispatch(handleCollapseSidebar());
  };

  const closeShowReportModal = () => {
    dispatch(setShowReportModal(false));
    dispatch(emptyReportData());
  };

  const handleAskQuestionModal = () => {
    if (askQuestion === true) {
      dispatch(closeAskQuestion());
    } else {
      dispatch(openAskQuestion());
    }
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
      <div className="h-auto w-full">
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
          } bg-gray-100 h-full transition-all ease-in-out duration-300`}
        >
          <Navbar />

          <div className="py-3 px-3 md:px-4 md:pl-10 md:pr-8 bg-transparent h-[92vh] overflow-auto">
            <Outlet />

            <div
              id={isDesktop ? "" : "ask-doubt-btn"}
              onClick={handleAskQuestionModal}
              className="flex md:hidden ask-doubt-btn overflow-hidden h-[50px] w-[50px] doubt-animation cursor-pointer absolute bottom-5 right-5 gap-3 rounded-full items-center justify-start p-2 text-white bg-blue-500"
            >
              <div
                // id="ask-doubt-btn"
                className="w-[200px] h-[50px] flex gap-5 items-center"
              >
                <div className="flex items-center justify-center w-[35px] h-[50px]">
                  <MdAdd className="text-xl" />
                </div>
                <div className="text-nowrap">Ask a Doubt</div>
              </div>
            </div>

            <div
              id={isDesktop ? "ask-doubt-btn" : ""}
              onClick={handleAskQuestionModal}
              className="ask-doubt-btn hidden md:flex overflow-hidden h-[50px] w-max cursor-pointer absolute bottom-5 right-5 gap-3 rounded-full items-center justify-start p-2 text-white bg-blue-500"
            >
              <div className="w-[200px] h-[50px] flex gap-5 items-center">
                <div className="flex items-center justify-center w-[35px] h-[50px]">
                  <MdAdd className="text-xl" />
                </div>
                <div className="text-nowrap">Ask a Doubt</div>
              </div>
            </div>

            {askQuestion && (
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

            {calenderPopup && (
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <CalenderPopup />
              </div>
            )}

            {submitSuccessPopopForFeedback && (
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <FormSuccessPopup type="feedback" />
              </div>
            )}

            {submitSuccessPopopForIssue && (
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <FormSuccessPopup type="issue" />
              </div>
            )}
          </div>
        </main>
        <MobileSidebar />
        <div
          className={`absolute ${
            notificationState ? "right-0" : "-right-[300px]"
          } top-0 h-full w-[300px] transition-all ease-in-out duration-300`}
        >
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

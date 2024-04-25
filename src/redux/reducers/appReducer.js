import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobileSidebarState: false,
  collapsedSidebar: false,
  globalPointValue: "",
  globalTopicvalue: "",
  globalSubjectvalue: "",
  mounted: false,
  showReportModal: false,
  reportData: {},
  notificationState: false,
  imagePopupState: false,
  raiseIssuePopup: false,
  imagePopupImg: "",
  showVerifyEmail: false,
  showResetSuccess: false,
  tempToken: "",
  feedBackPopup: false,
  calenderPopup: false,
  askQuestion : false,
  event: {},
  searchText: "",
  submitSuccessPopopForFeedback: false, // submit successPopop
  submitSuccessPopopForIssue: false, // submit successPopop
  likedQuestion: [], // array of question id , question liked - true , false  , count
};

export const counterSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openMobileSidebar: (state) => {
      state.mobileSidebarState = true;
    },
    closeMobileSidebar: (state) => {
      state.mobileSidebarState = false;
    },
    openNotification: (state) => {
      state.notificationState = true;
    },
    closeNotification: (state) => {
      state.notificationState = false;
    },

    openImagePopup: (state) => {
      state.imagePopupState = true;
    },
    closeImagePopup: (state) => {
      state.imagePopupState = false;
    },

    openRaiseIssuePopup: (state) => {
      state.raiseIssuePopup = true;
    },

    closeRaiseIssuePopup: (state) => {
      state.raiseIssuePopup = false;
    },

    openAskQuestion: (state) => {
      state.askQuestion = true;
    },

    closeAskQuestion: (state) => {
      state.askQuestion = false;
    },

    openCalenderPopup: (state, action) => {
      state.calenderPopup = true;
      state.event = action.payload;
    },

    closeCalenderPopup: (state) => {
      state.calenderPopup = false;
      state.event = {};
    },

    openVerifyEmail: (state) => {
      state.showVerifyEmail = true;
    },
    closeVerifyEmail: (state) => {
      state.showVerifyEmail = false;
    },
    setImagePopupImg: (state, action) => {
      state.imagePopupImg = action.payload;
    },

    openResetSuccess: (state) => {
      state.showResetSuccess = true;
    },
    closeResetSuccess: (state) => {
      state.showResetSuccess = false;
    },
    openFeedbackPopup: (state) => {
      state.feedBackPopup = true;
    },
    closeFeedbackPopup: (state) => {
      state.feedBackPopup = false;
    },

    setGlobalPointValue: (state, action) => {
      state.globalPointValue = action.payload;
    },

    setTempToken: (state, action) => {
      state.tempToken = action.payload;
    },

    setGlobalTopicValue: (state, action) => {
      state.globalTopicvalue = action.payload;
    },
    setGlobalSubjectValue: (state, action) => {
      state.globalSubjectvalue = action.payload;
    },

    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },

    setShowReportModal: (state, action) => {
      state.showReportModal = action.payload;
    },

    emptyReportData: (state) => {
      state.reportData = {};
    },

    setReportData: (state, action) => {
      state.reportData = action.payload;
    },
    openSubmitSuccessPopopForFeedback: (state) => {
      state.submitSuccessPopopForFeedback = true;
    },
    closeSubmitSuccessPopopForFeedback: (state) => {
      state.submitSuccessPopopForFeedback = false;
    },
    openSubmitSuccessPopopIssue: (state) => {
      state.submitSuccessPopopForIssue = true;
    },
    closeSubmitSuccessPopopIssue: (state) => {
      state.submitSuccessPopopForIssue = false;
    },
    handleCollapseSidebar: (state) => {
      if (state.collapsedSidebar) {
        state.collapsedSidebar = false;
      } else {
        state.collapsedSidebar = true;
      }
    },
    addToLikedQuestion: (state, action) => {
      // Action.payload is an object with question id , liked - true , false , count find if question exists in the state.likedQuestion array if it exists update its count to the passed count and its liked to the liked value to the passed liked value
      const { liked, count, questionid } = action.payload;

      // Find the index of the existing question with the same id
      const existingIndex = state.likedQuestion.findIndex(
        (item) => item.questionid === questionid
      );

      if (existingIndex !== -1) {
        // Remove the existing item
        state.likedQuestion.splice(existingIndex, 1);
      }

      // Add the new item
      state.likedQuestion.push({ liked, count, questionid });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTempToken,
  closeVerifyEmail,
  openVerifyEmail,
  openRaiseIssuePopup,
  closeRaiseIssuePopup,
  setImagePopupImg,
  openImagePopup,
  closeImagePopup,
  openNotification,
  closeNotification,
  setReportData,
  emptyReportData,
  openMobileSidebar,
  closeMobileSidebar,
  handleCollapseSidebar,
  setGlobalPointValue,
  setGlobalTopicValue,
  setGlobalSubjectValue,
  setShowReportModal,
  openResetSuccess,
  closeResetSuccess,
  openFeedbackPopup,
  closeFeedbackPopup,
  openCalenderPopup,
  closeCalenderPopup,
  addToLikedQuestion,
  removeFromQuestion,
  setSearchText,
  openSubmitSuccessPopopForFeedback,
  closeSubmitSuccessPopopForFeedback,
  openSubmitSuccessPopopIssue,
  closeSubmitSuccessPopopIssue,
  openAskQuestion,
  closeAskQuestion,
} = counterSlice.actions;

export default counterSlice.reducer;

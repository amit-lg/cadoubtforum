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

    setShowReportModal: (state, action) => {
      state.showReportModal = action.payload;
    },

    emptyReportData: (state) => {
      state.reportData = {};
    },

    setReportData: (state, action) => {
      state.reportData = action.payload;
    },

    handleCollapseSidebar: (state) => {
      if (state.collapsedSidebar) {
        state.collapsedSidebar = false;
      } else {
        state.collapsedSidebar = true;
      }
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
  closeFeedbackPopup
} = counterSlice.actions;

export default counterSlice.reducer;

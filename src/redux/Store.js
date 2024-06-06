import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appReducer";
import userReducer from "./reducers/userReducer";
import allQuestionsReducer from "./reducers/allQuestionsReducer";
import pinnedQuestionsReducer from "./reducers/pinnedQuestionsReducer";
import askedQuestionsReducer from "./reducers/askedQuestionsReducer";
import askQuestionReducer from "./reducers/askQuestionReducer";
import unansweredQuestionsReducer from "./reducers/unansweredQuestionsReducer";
import notificationReducer from "./reducers/notificationReducer";

export const Store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    all: allQuestionsReducer,
    pinned: pinnedQuestionsReducer,
    asked: askedQuestionsReducer,
    unanswered: unansweredQuestionsReducer,
    ask: askQuestionReducer,
    notification: notificationReducer,
  },
});

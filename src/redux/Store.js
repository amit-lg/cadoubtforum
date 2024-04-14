import { configureStore } from '@reduxjs/toolkit'
import appReducer from './reducers/appReducer'
import userReducer from './reducers/userReducer'
import testReducer from './reducers/testReducer'
import allQuestionsReducer from './reducers/allQuestionsReducer'
import pinnedQuestionsReducer from './reducers/pinnedQuestionsReducer'
import askedQuestionsReducer from './reducers/askedQuestionsReducer'
import unansweredQuestionsReducer from './reducers/unansweredQuestionsReducer'

export const Store = configureStore({
  reducer: {
    app: appReducer,
    user : userReducer,
    test : testReducer,
    all : allQuestionsReducer,
    // pinned : pinnedQuestionsReducer,
    // asked : askedQuestionsReducer,
    // unanswered : unansweredQuestionsReducer
  },
})
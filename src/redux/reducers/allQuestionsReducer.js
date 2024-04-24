import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  questionId: "",
  hasMore: false,
  page: 0,
  subjects: [],
  topics: [],
  points: [],
  subjectValue: "",
  topicValue: "",
  pointsValue: "",
  filter: "",
  topicName: "",
  subjectName: "",
  pointsName: "",
};

export const allQuestionsSlice = createSlice({
  name: "all",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      const questions = [...state.questions, ...action.payload];
      console.log("--------------------------------------------");
      console.log(questions);
      const set = new Set(questions);
      console.log(set);
      console.log("--------------------------------------------");
      state.questions = Array.from(set);
    },
    clearQuestions: (state) => {
      state.questions = new Array();
    },
    setHasMore: (state, action) => {
      console.log(action.payload);
      state.hasMore = action.payload;
    },
    setQuestionId: (state, action) => {
      state.questionId = action.payload;
    },
    setSubjects: (state, action) => {
      state.subjects = action.payload;
    },
    setTopics: (state, action) => {
      state.topics = action.payload;
    },
    setPoints: (state, action) => {
      state.points = action.payload;
    },
    setSubjectName: (state, action) => {
      state.subjectName = action.payload;
    },
    setTopicName: (state, action) => {
      state.topicName = action.payload;
    },
    setPointName: (state, action) => {
      state.pointsName = action.payload;
    },
    setTopicValue: (state, action) => {
      state.topicValue = action.payload;
    },
    setSubjectVlue: (state, action) => {
      state.subjectValue = action.payload;
    },
    setPointsValue: (state, action) => {
      state.pointsValue = action.payload;
    },
    incrementPage: (state) => {
      state.page = state.page + 1;
      console.log(state.page);
    },
    initPage: (state) => {
      state.page = 0;
    },
    clearFilters: (state) => {
      state.pointsValue = "";
      state.subjectValue = "";
      state.topicValue = "";
      state.pointsName = "";
      state.subjectName = "";
      state.topicName = "";
      state.questionId = "";
      state.questions = [];
      state.page = 0;
      state.hasMore = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  clearFilters,
  setPointName,
  setPointsValue,
  setSubjectName,
  setSubjectVlue,
  setTopicName,
  setTopicValue,
  setSubjects,
  setTopics,
  setPoints,
  setDropdownData,
  setQuestions,
  setHasMore,
  setQuestionId,
  clearQuestions,
  incrementPage,
  initPage,
} = allQuestionsSlice.actions;

export default allQuestionsSlice.reducer;

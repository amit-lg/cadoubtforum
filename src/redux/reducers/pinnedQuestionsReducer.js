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

export const pinnedQuestionsSlice = createSlice({
  name: "pinned",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      const set = new Set();
      for (let item of action.payload) {
        set.add(item);
      }
      const arr = Array.from(set);
      state.questions = [...arr];
    },
    clearQuestions: (state) => {
      state.questions = [];
    },
    setHasMore: (state, action) => {
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
    },
    initPage: (state) => {
      state.page = 0;
    },
    removeQuestion: (state, action) => {
      state.questions = state.questions.filter(
        (question) => question.id !== action.payload
      );
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
  removeQuestion
} = pinnedQuestionsSlice.actions;

export default pinnedQuestionsSlice.reducer;

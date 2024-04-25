import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  images: [],
  imagesPreview: [],
  questionText: "",
  isAsked: false,
};

export const askQuestionsSlice = createSlice({
  name: "ask",
  initialState,
  reducers: {
    setSubjects: (state, action) => {
      state.subjects = action.payload;
    },
    setTopics: (state, action) => {
      state.topics = action.payload;
    },
    setIsAsked: (state, action) => {
      state.isAsked = action.payload;
    },
    setPoints: (state, action) => {
      state.points = action.payload;
    },
    setSubjectName: (state, action) => {
      state.subjectName = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setImagesPreview: (state, action) => {
      state.imagesPreview = action.payload;
    },
    setQuestionText: (state, action) => {
      state.questionText = action.payload;
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
    clearFilters: (state) => {
      state.pointsValue = "";
      state.subjectValue = "";
      state.topicValue = "";
      state.pointsName = "";
      state.subjectName = "";
      state.topicName = "";
    },
    initState: (state) => {
      state.images = [];
      state.imagesPreview = [];
      state.questionText = "";
      state.isAsked = false;
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
  setImages,
  setQuestionText,
  setIsAsked,
  initState,
  setImagesPreview,
} = askQuestionsSlice.actions;

export default askQuestionsSlice.reducer;

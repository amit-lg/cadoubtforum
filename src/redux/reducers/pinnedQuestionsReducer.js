import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  hasMore: true,
  questionId : "",
};

export const pinnedQuestionsSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = [...state.questions, ...action.payload];
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    setQuestionId: (state, action) => {
      state.questionId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setQuestions, setHasMore , setQuestionId } = pinnedQuestionsSlice.actions;

export default pinnedQuestionsSlice.reducer;
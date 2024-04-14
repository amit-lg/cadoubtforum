import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  hasMore: true,
  questionId : "",
};

export const testSlice = createSlice({
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
    clearQuestions: (state) => {
      state.questions = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setQuestions, clearQuestions , setHasMore , setQuestionId } = testSlice.actions;

export default testSlice.reducer;

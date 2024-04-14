import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  hasMore: true,
  questionId : "",
};

export const allQuestionsSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
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
  },
});

// Action creators are generated for each case reducer function
export const { setQuestions, setHasMore , setQuestionId , clearQuestions } = allQuestionsSlice.actions;

export default allQuestionsSlice.reducer;

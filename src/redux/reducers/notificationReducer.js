import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  notifications: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    incrementCount: (state) => {
      state.count += 1;
    },
    decrementCount: (state) => {
      state.count -= 1;
    },
    addToNotifications: (state, action) => {
      state.notifications = [...state.notifications, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementCount, decrementCount, addToNotifications } =
  notificationSlice.actions;

export default notificationSlice.reducer;

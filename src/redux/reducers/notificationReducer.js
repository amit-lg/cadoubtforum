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
      if (state.notifications.length > 10) {
        // remove the 10th notification
        state.notifications.shift();
        state.notifications = [action.payload, ...state.notifications];
      } else {
        state.notifications = [action.payload , ...state.notifications];
      }
    },

    setNotifications: (state, action) => {
      state.notifications = action.payload;
      state.notifications?.map((notification) => {
        if (notification?.notseen?.length > 0) {
          state.count += 1;
        }
      });
    },
    setAllToSeen: (state) => {
      const temp = [...state.notifications];
      temp?.map((notification) => {
        if (notification?.notseen) {
          notification.notseen = {};
        }
      });
      state.notifications = [...temp];
    },
    setNotificationCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setNotificationCount,
  setAllToSeen,
  incrementCount,
  decrementCount,
  addToNotifications,
  setNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;

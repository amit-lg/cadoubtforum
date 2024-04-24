import { createSlice } from "@reduxjs/toolkit";
import { setAccessToken } from "../../utils/cookies";
import {
  eventsForFinal,
  eventsForFoundation,
  eventsForIntermediate,
} from "../../mocks/dates";

const initialState = {
  user: {
    userId: "",
    email: "",
    name: "",
    batch: {},
    dob: "",
    phone: "",
    image: "",
    bio: "",
    linkedInUrl: "",
    twitterUrl: "",
    instaUrl: "",
    fbUrl: "",
    dates: [],
  },
  isAuthenticated: false,
  token: "",
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const token = action.payload.token;
      state.user.email = action.payload.profile.email;
      state.user.userId = action.payload.profile.userId;
      state.user.name = action.payload.profile.username;
      state.isAuthenticated = true;
      state.token = token;
      state.user.batch = action.payload.profile.batch;
      state.user.image = action.payload.profile.profile;
      if (action.payload.profile.batch.Level.Name === "Foundation") {
        state.user.dates = eventsForFoundation;
      } else if (action.payload.profile.batch.Level.Name === "Intermediate") {
        state.user.dates = eventsForIntermediate;
      } else if (action.payload.profile.batch.Level.Name === "Final") {
        state.user.dates = eventsForFinal;
      }
      setAccessToken(token);
    },

    setName: (state, action) => {
      state.user.name = action.payload;
    },

    setImage: (state, action) => {
      state.user.image = action.payload;
    },

    setBio: (state, action) => {
      state.user.bio = action.payload;
    },
    setPhone: (state, action) => {
      state.user.phone = action.payload;
    },
    setDOB: (state, action) => {
      state.user.dob = action.payload;
    },

    setLinkedInUrl: (state, action) => {
      state.user.linkedInUrl = action.payload;
    },

    setTwitterUrl: (state, action) => {
      state.user.twitterUrl = action.payload;
    },

    setInstaUrl: (state, action) => {
      state.user.instaUrl = action.payload;
    },

    setFbUrl: (state, action) => {
      state.user.fbUrl = action.payload;
    },

    logoutSuccess: (state) => {
      state.user = {};
      state.isAuthenticated = false;
    },
    setProfile: (state, action) => {
      state.user.name = action.payload.username;
      state.user.email = action.payload.email;
      state.user.userId = action.payload.id;
      state.user.batch = action.payload?.batch;
      state.user.image = action.payload.profile;
      if (action.payload?.batch?.Level?.Name === "Foundation") {
        state.user.dates = eventsForFoundation;
      } else if (action.payload?.batch?.Level?.Name === "Intermediate") {
        state.user.dates = eventsForIntermediate;
      } else if (action.payload?.batch?.Level?.Name === "Final") {
        state.user.dates = eventsForFinal;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setDOB,
  setProfile,
  loginSuccess,
  logoutSuccess,
  setName,
  setBio,
  setLinkedInUrl,
  setTwitterUrl,
  setInstaUrl,
  setFbUrl,
  setPhone,
  setImage,
} = counterSlice.actions;

export default counterSlice.reducer;

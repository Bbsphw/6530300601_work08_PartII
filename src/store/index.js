// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import friendsReducer from "./slices/friendsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    friends: friendsReducer,
  },
  middleware: (getDefault) => getDefault({ serializableCheck: false }),
});

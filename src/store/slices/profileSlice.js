// src/store/slices/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../../services/userService";
import { AuthService } from "../../services/authService";

export const fetchProfile = createAsyncThunk("profile/fetch", async () => {
  const user = AuthService.currentUser();
  if (!user) throw new Error("Not authenticated");
  return await UserService.get(user.uid, user);
});

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (patch) => {
    const user = AuthService.currentUser();
    if (!user) throw new Error("Not authenticated");
    await UserService.update(user.uid, patch);
    return await UserService.get(user.uid, user);
  }
);

const slice = createSlice({
  name: "profile",
  initialState: { data: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (s) => {
        s.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.data = a.payload;
      })
      .addCase(fetchProfile.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message;
      })
      .addCase(updateProfile.fulfilled, (s, a) => {
        s.data = a.payload;
      });
  },
});
export default slice.reducer;

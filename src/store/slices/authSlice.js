// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../services/authService";
import { UserService } from "../../services/userService";
import { auth } from "../../firebase";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await AuthService.signIn(email, password);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ name, studentId, email, password }, { rejectWithValue }) => {
    try {
      const user = await AuthService.signUp(name, email, password);
      await UserService.upsert(user.uid, { name, email, studentId });
      return user;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  await AuthService.signOut();
});

export const resetPassword = createAsyncThunk(
  "auth/resetPw",
  async (email, { rejectWithValue }) => {
    try {
      const normalized = email.trim().toLowerCase();

      // ดึงแบบ dynamic (กัน bundler ค้าง)
      const { fetchSignInMethodsForEmail } = await import("firebase/auth");

      let methods = [];
      try {
        methods = await fetchSignInMethodsForEmail(auth, normalized);
      } catch (e) {
        // บางกรณีกับ EEP/เครือข่าย อาจ error — ไม่ต้อง block การส่ง
      }

      // ถ้า "พบ" แต่ไม่ใช่ password → แจ้งให้ใช้อีกวิธี
      if (methods.length > 0 && !methods.includes("password")) {
        return rejectWithValue(
          `provider=${methods.join(",")}` // จะถูกแปลงเป็นข้อความในหน้าจอ
        );
      }

      // กรณี methods เป็น [] (EEP ปิดบัง) หรือเป็น ['password'] → ส่งอยู่ดี
      await AuthService.resetPassword(normalized);

      // คืนข้อมูลเล็กน้อยเพื่อ confirm
      return { email: normalized, methods };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: { user: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
      });
  },
});

export default slice.reducer;

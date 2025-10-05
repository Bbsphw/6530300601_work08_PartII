// src/store/slices/friendsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FriendService } from "../../services/friendService";
import { AuthService } from "../../services/authService";

export const listFriends = createAsyncThunk("friends/list", async () => {
  const user = AuthService.currentUser();
  if (!user) throw new Error("Not authenticated");
  return await FriendService.listFriends(user.uid);
});

export const searchByEmail = createAsyncThunk(
  "friends/search",
  async (email, { rejectWithValue }) => {
    const res = await FriendService.searchUserByEmail(email);
    if (!res) return rejectWithValue("User not found");
    return res;
  }
);

export const addFriend = createAsyncThunk(
  "friends/add",
  async (targetUid, { rejectWithValue }) => {
    try {
      const user = AuthService.currentUser();
      if (!user) throw new Error("Not authenticated");
      return await FriendService.addFriend(user.uid, targetUid);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const dedupeByUid = (arr) => {
  const map = new Map();
  for (const it of arr) map.set(it.uid, it);
  return Array.from(map.values());
};

const slice = createSlice({
  name: "friends",
  initialState: { items: [], found: null, status: "idle", error: null },
  reducers: {
    clearFound: (s) => {
      s.found = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listFriends.pending, (s) => {
        s.status = "loading";
      })
      .addCase(listFriends.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = dedupeByUid(a.payload || []);
      })
      .addCase(searchByEmail.fulfilled, (s, a) => {
        s.found = a.payload;
        s.error = null;
      })
      .addCase(searchByEmail.rejected, (s, a) => {
        s.found = null;
        s.error = a.payload;
      })
      .addCase(addFriend.fulfilled, (s, a) => {
        const u = a.payload?.uid;
        if (!u) return;
        const idx = s.items.findIndex((it) => it.uid === u);
        if (idx === -1) {
          // เพิ่มไว้บนสุด
          s.items.unshift(a.payload);
        } else {
          // อัปเดตค่าที่มีอยู่ (กันซ้ำ)
          s.items[idx] = { ...s.items[idx], ...a.payload };
        }
        s.found = null;
      });
  },
});

export const { clearFound } = slice.actions;
export default slice.reducer;

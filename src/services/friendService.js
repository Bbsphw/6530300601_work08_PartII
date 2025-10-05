// src/services/friendService.js
import app from "../firebase";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import { FriendModel } from "../firebase/models/Friend";

const db = getFirestore(app);
const usersCol = collection(db, "users");
const friendsCol = (uid) => collection(db, "users", uid, "friends");

export const FriendService = {
  async searchUserByEmail(email) {
    const normalized = email.trim().toLowerCase();
    const q = query(usersCol, where("email", "==", normalized));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const userDoc = snap.docs[0];
    return { uid: userDoc.id, ...userDoc.data() };
  },

  async addFriend(ownerUid, targetUid) {
    if (ownerUid === targetUid) {
      throw new Error("You cannot add yourself.");
    }

    // ถ้าเป็นเพื่อนอยู่แล้ว — ส่งข้อมูลเดิมกลับ (no-op)
    const fRef = doc(friendsCol(ownerUid), targetUid);
    const fSnap = await getDoc(fRef);
    if (fSnap.exists()) {
      return { uid: targetUid, ...fSnap.data() };
    }

    // ยังไม่เป็นเพื่อน -> ดึงข้อมูล user แล้วบันทึก
    const targetDoc = await getDoc(doc(db, "users", targetUid));
    if (!targetDoc.exists()) throw new Error("User not found");
    const model = FriendModel.fromUserDoc(targetUid, targetDoc.data());
    await setDoc(fRef, model.toFirestore());
    return model.toFirestore(); // { uid, displayName, email, ... }
  },

  async listFriends(ownerUid) {
    const snap = await getDocs(friendsCol(ownerUid));
    return snap.docs.map((d) => ({
      uid: d.id,
      ...d.data(),
    }));
  },
};

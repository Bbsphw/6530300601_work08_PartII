// src/services/authService.js
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut as fbSignOut,
} from "firebase/auth";

export const AuthService = {
  async signIn(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  },

  async signUp(name, email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    return cred.user;
  },

  async resetPassword(email) {
    const normalized = email.trim().toLowerCase();

    // ตั้งภาษาอีเมลถ้าต้องการ
    auth.languageCode = "en";

    // ถ้าไม่ได้ใช้ custom redirect URL ตัดทิ้งได้
    const actionCodeSettings = {
      url: "https://mobile2025-ef648.firebaseapp.com",
      handleCodeInApp: false,
    };

    await sendPasswordResetEmail(auth, normalized, actionCodeSettings);
    // ไม่คืนค่าอะไร — ปกติ
  },

  async reauthenticate(oldPassword) {
    const user = auth.currentUser;
    if (!user) throw new Error("Not authenticated");
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    await reauthenticateWithCredential(user, credential);
  },

  async changePassword(newPassword, oldPasswordIfAny) {
    if (oldPasswordIfAny) await this.reauthenticate(oldPasswordIfAny);
    const user = auth.currentUser;
    if (!user) throw new Error("Not authenticated");
    await updatePassword(user, newPassword);
  },

  async signOut() {
    await fbSignOut(auth);
  },

  currentUser() {
    return auth.currentUser;
  },
};

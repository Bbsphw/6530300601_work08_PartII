// src/services/friendService.js
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { UserModel } from "../firebase/models/User";

const userDocRef = (uid) => doc(db, "users", uid);

export const UserService = {
  async upsert(uid, modelOrPlain) {
    const data =
      modelOrPlain instanceof UserModel
        ? modelOrPlain.toFirestore()
        : { ...modelOrPlain };
    await setDoc(userDocRef(uid), data, { merge: true });
  },

  async get(uid, authUser) {
    const snap = await getDoc(userDocRef(uid));
    return UserModel.fromAuthAndDoc(authUser, snap.exists() ? snap.data() : {});
  },

  async update(uid, patch) {
    await updateDoc(userDocRef(uid), patch);
  },
};

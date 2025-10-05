// src/firebase/models/User.js
export class UserModel {
  constructor({ uid, name, email, studentId, photoURL = null }) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.studentId = studentId;
    this.photoURL = photoURL;
  }

  static fromAuthAndDoc(authUser, docData) {
    return new UserModel({
      uid: authUser.uid,
      name: authUser.displayName ?? docData?.name ?? "",
      email: authUser.email ?? docData?.email ?? "",
      studentId: docData?.studentId ?? "",
      photoURL: authUser.photoURL ?? docData?.photoURL ?? null,
    });
  }

  toFirestore() {
    return {
      name: this.name,
      email: this.email,
      studentId: this.studentId,
      photoURL: this.photoURL ?? null,
    };
  }
}

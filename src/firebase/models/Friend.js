// src/firebase/models/Friend.js
export class FriendModel {
  constructor({ uid, displayName, email, photoURL = null, studentId = "" }) {
    this.uid = uid;
    this.displayName = displayName;
    this.email = email;
    this.photoURL = photoURL;
    this.studentId = studentId;
  }

  static fromUserDoc(uid, userDoc) {
    return new FriendModel({
      uid,
      displayName: userDoc?.name ?? "",
      email: userDoc?.email ?? "",
      photoURL: userDoc?.photoURL ?? null,
      studentId: userDoc?.studentId ?? "",
    });
  }

  toFirestore() {
    return {
      uid: this.uid,
      displayName: this.displayName,
      email: this.email,
      photoURL: this.photoURL,
      studentId: this.studentId,
    };
  }
}

// src/store/selectors.js
// Auth
export const selectAuth = (s) => s.auth;
export const selectAuthUser = (s) => s.auth.user;
export const selectAuthStatus = (s) => s.auth.status;
export const selectAuthError = (s) => s.auth.error;

// Profile
export const selectProfile = (s) => s.profile;
export const selectProfileData = (s) => s.profile.data;
export const selectProfileStatus = (s) => s.profile.status;
export const selectProfileError = (s) => s.profile.error;

// Friends
export const selectFriends = (s) => s.friends;
export const selectFriendItems = (s) => s.friends.items;
export const selectFriendFound = (s) => s.friends.found;
export const selectFriendError = (s) => s.friends.error;
export const selectFriendsStatus = (s) => s.friends.status ?? "idle";

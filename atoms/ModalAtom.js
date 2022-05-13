import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const modalTypeState = atom({
  key: "modalTypeState",
  default: "dropIn",
});

export const useSSRPostsState = atom({
  key: "useSSRPostsState",
  default: true,
});

export const handlePostState = atom({
  key: "handlePostState",
  default: false,
});
export const getPostState = atom({
  key: "getPostState",
  default: {},
});

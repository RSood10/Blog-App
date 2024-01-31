import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const usernameAtom = atom({
  key: "usernameAtom",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
export const firstnameAtom = atom({
  key: "firstname",
  default: "",
});
export const lastnameAtom = atom({
  key: "lastname",
  default: "",
});
export const passwordAtom = atom({
  key: "password",
  default: "",
});

export const userBlogs = atom({ key: "userBlogs", default: false });

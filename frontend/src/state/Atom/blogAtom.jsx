//title and description from create blog app

import { atom } from "recoil";

export const titleAtom = atom({
  key: "titleatom",
  default: "",
});
export const descAtom = atom({
  key: "descatom",
  default: "",
});

import { atom, selector } from "recoil";
import { getUserInfo } from "zmp-sdk";

export const userState = selector({
  key: "user",
  get: () =>
    getUserInfo({
      avatarType: "normal",
    }),
});

export const displayNameState = atom({
  key: "displayName",
  default: "",
});

export const hostState = atom({
  key: "host",
  default: {
    connected: false,
    url:
      "https://upload.wikimedia.org/wikipedia/commons/5/5d/Clojure_logo.svg",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/5/5d/Clojure_logo.svg",
    chanel: "Shipping list 24/5/24",
  },
});

export const itemState = atom({
  key: "item",
  default: {},
});
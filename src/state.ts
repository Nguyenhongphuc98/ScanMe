import { atom, selector } from "recoil";
import { getUserInfo } from "zmp-sdk";
import { ConnectEndpointKey } from "./core/data";

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
    type: ConnectEndpointKey,
    url: "this is url",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Clojure_logo.svg",
    chanel: "Shipping list 24/5/24",
  },
});

export const itemState = atom({
  key: "item",
  default: null,
  // default: {
  //   id: "identity",
  //   name: "item name",
  //   date: "22/11/1998",
  // },
});

export const notiState = atom({
  key: "noti",
  // default: "This is notification This is notification This is notification This is notification",
  default: "",
});

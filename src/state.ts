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
  },
  // default: {
  //   connected: true,
  //   host: "this is url",
  //   channel: "Cty TNHH LongView VNdsa dasfsd fdsfasdfadsf",
  // },
});

export const itemState = atom({
  key: "item",
  default: "",
  // default: {
  //   QRNum: "14567",
  //   Invoice: "100.000.000 VNĐ",
  //   ItemNum: "xias124",
  //   BoxNum: "65",
  //   Amount: "34356",
  //   Remark: "asdf32f2133 asd asd adsa d dasd432",
  // },
});

export const notiState = atom({
  key: "noti",
  default: "Move your camera to QR to scan!",
  // default: "",
});

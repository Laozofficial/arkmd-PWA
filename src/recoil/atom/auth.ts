import { atom } from "recoil";
import { persistAtom } from "../persist";

export const getResetStepsAtom = atom<any>({
  key: "getResetStepsState",
  default: {
    email: "",
    otp: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const getLoggedUserAtom = atom<any>({
  key: "getLoggedUserState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const getUserAtom = atom<any>({
  key: "getUserState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const getNewUserRoleAtom = atom<any>({
  key: "getNewUserRoleState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

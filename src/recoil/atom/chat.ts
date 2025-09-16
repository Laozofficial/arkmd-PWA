import { atom } from "recoil";
import { persistAtom } from "../persist";

export const getCurrentPatientAtom = atom<any>({
  key: "getCurrentPatientState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const getChatSessionIdAtom = atom<any>({
  key: "getChatIdState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const getCurrentChatHistoryAtom = atom<any>({
  key: "getCurrentChatHistoryState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

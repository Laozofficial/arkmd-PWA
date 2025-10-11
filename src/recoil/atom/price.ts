import { atom } from "recoil";
import { persistAtom } from "../persist";

export const getCurrentPlanAtom = atom<any>({
  key: "getCurrentPlanState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

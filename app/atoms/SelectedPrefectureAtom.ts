import { atom } from "recoil";
import { Prefecture } from "../../types";

export const selectedPrefectureState = atom<Prefecture[]>({
  key: "selectedPrefectureState",
  default: [],
});

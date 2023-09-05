import { atom } from "recoil";
import { Prefecture, SelectedData } from "../../types";

export const selectedPrefectureState = atom<Prefecture[]>({
  key: "selectedPrefectureState",
  default: [],
});

export const selectedDataState = atom<SelectedData>({
  key: "selectedDataState",
  default: { data: [] },
});

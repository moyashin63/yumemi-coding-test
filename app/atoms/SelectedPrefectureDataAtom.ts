import { atom } from "recoil";
import { Prefecture, PopulationDataByPref } from "../../types";

type PopulationData = {
  prefecture: Prefecture;
  populationData: PopulationDataByPref;
};

export const selectedDataState = atom<PopulationData[]>({
  key: "selectedDataState",
  default: [],
});

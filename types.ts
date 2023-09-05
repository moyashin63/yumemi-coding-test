export type Prefecture = {
  prefCode: number;
  prefName: string;
};

// prettier-ignore
export type PopulationDataByPref = {
  boundaryYear: number,
  data: {
    data: {
      year: number, 
      value: number, 
      rate?: number | undefined
    }[];
    label: string, 
  }[];
};

// prettier-ignore
export type SelectedData = {
  prefecture: Prefecture;
  data: PopulationDataByPref;
};

export interface PrefectureListProps {
  prefectures: { prefecture: Prefecture; selected: boolean }[];
  handleCheckboxChange: (prefCode: number) => void;
}

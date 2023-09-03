export type Prefecture = {
  prefCode: number;
  prefName: string;
};

// prettier-ignore
export type PopulationDataByPref = {
  boundaryYear: number,
  data: [
    populationType: string, 
    yearlyPopulation: [
      year: number, 
      value: number, 
      rate?: number
    ]
  ]
};

// prettier-ignore
export type SelectedData = {
  data: [
    prefecture: Prefecture, 
    data: PopulationDataByPref
  ];
};

export interface PrefectureListProps {
  prefectures: { prefecture: Prefecture; selected: boolean }[];
  handleCheckboxChange: (prefCode: number) => void;
}

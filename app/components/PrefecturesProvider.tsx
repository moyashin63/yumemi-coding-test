import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Prefecture, SelectedData, PopulationDataByPref } from "../../types";
import { getAllPrefectures } from "@/api";

interface PrefecturesContextData {
  prefectures: { prefecture: Prefecture; selected: boolean }[];
  handleCheckboxChange: (prefCode: number) => void;
}

const defaultData: { prefecture: Prefecture; selected: boolean }[] = [];

export const PrefecturesContext = createContext<PrefecturesContextData>({
  prefectures: defaultData,
  handleCheckboxChange: (prefCode: number) => {},
});

export function PrefecturesProvider({ children }: { children: ReactNode }) {
  const [prefectures, setPrefectures] = useState(defaultData);
  const [loading, setLoading] = useState(true); // ローディング状態

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPrefectures();
        if (data) {
          const formattedData = data.map((prefecture: Prefecture) => ({
            prefecture,
            selected: false,
          }));
          setPrefectures(formattedData);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 他のコンポーネントから呼び出す関数
  const handleCheckboxChange = (prefCode: number) => {
    const updatedPrefectures = prefectures.map((prefecture) => {
      if (prefecture.prefecture.prefCode === prefCode) {
        if (prefecture.selected === false) {
          console.log(prefecture.prefecture.prefName + "のデータを追加");
        } else {
          console.log(prefecture.prefecture.prefName + "のデータを削除");
        }
        return { ...prefecture, selected: !prefecture.selected };
      } else {
        return prefecture;
      }
    });
    setPrefectures(updatedPrefectures);
  };

  if (loading) {
    return <div>Loading...</div>; // ローディング中はローディング表示
  }

  return (
    <PrefecturesContext.Provider
      value={{
        prefectures: prefectures,
        handleCheckboxChange: handleCheckboxChange,
      }}
    >
      {children}
    </PrefecturesContext.Provider>
  );
}

const defaultPopulationData: {
  prefecture: Prefecture;
  data: PopulationDataByPref;
}[] = [];
export const GraphContext = createContext({ data: defaultPopulationData });

export function GraphProvider({ children }: { children: ReactNode }) {
  // ここは、選択されている人口タイプのデータのみを購読者に渡すようにしたい。
  return (
    <GraphContext.Provider value={{ data: defaultPopulationData }}>
      {children}
    </GraphContext.Provider>
  );
}

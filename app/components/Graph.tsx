import React, { useEffect, useState, useRef } from "react";
import { getPopulationDataByPrefCode } from "@/api";
import { Prefecture, SelectedData } from "@/types";
import { useRecoilValue } from "recoil";
import { selectedPrefectureState } from "../atoms/Atom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemePaired } from "d3-scale-chromatic";

const compositionTypeButtons = [
  { id: "total", name: "総人口" },
  { id: "young", name: "年少人口" },
  { id: "productive", name: "生産年齢人口" },
  { id: "elderly", name: "老年人口" },
];

const Graph = () => {
  const selectedPrefectures = useRecoilValue(
    selectedPrefectureState
  ) as Prefecture[];

  const [selectedData, setSelectedData] = useState<SelectedData[]>([]);
  const [displayData, setDisplayData] = useState({
    prefectures: [] as {
      prefectureName: string;
      values: { year: number; value: number; rate?: number | undefined }[];
    }[],
  });

  const [existsSelectedData, setExistsSelectedData] = React.useState(false);

  const prevSelectedPrefecturesRef = useRef<Prefecture[]>([]);

  // selectedPrefectureの変更を検知してselectedDataを更新する
  useEffect(() => {
    const fetchData = async (newPrefecture: Prefecture) => {
      try {
        const newPrefData = await getPopulationDataByPrefCode(
          newPrefecture.prefCode
        );
        const updatedData: SelectedData[] = [
          ...selectedData,
          {
            prefecture: newPrefecture,
            data: newPrefData,
          },
        ];
        setSelectedData(updatedData);
      } catch (error) {
        console.log(error);
      }
    };

    if (
      prevSelectedPrefecturesRef.current.length < selectedPrefectures.length
    ) {
      const addedPrefecture = selectedPrefectures.find((prefecture) => {
        return !prevSelectedPrefecturesRef.current.some(
          (prevPrefecture) => prevPrefecture.prefCode === prefecture.prefCode
        );
      });

      if (addedPrefecture) {
        fetchData(addedPrefecture); // 中でsetSelectedDataを呼び出している
        console.log("selectedCompositionType:" + selectedCompositionType);
      }
    } else {
      const deletedPrefecture = prevSelectedPrefecturesRef.current.find(
        (prefecture) => {
          return !selectedPrefectures.some(
            (prevPrefecture) => prevPrefecture.prefCode === prefecture.prefCode
          );
        }
      );
      const updatedData = selectedData.filter((item) => {
        return item.prefecture.prefName !== deletedPrefecture?.prefName;
      });
      setSelectedData(updatedData);
    }
    prevSelectedPrefecturesRef.current = selectedPrefectures;

    if (selectedPrefectures.length > 0) {
      setExistsSelectedData(true);
    } else {
      setExistsSelectedData(false);
    }
  }, [selectedPrefectures]);

  const [selectedCompositionType, setSelectedCompositionType] = useState("");

  // 選択都道府県か表示人口構成タイプの変更を検知してdisplayDataを更新する
  useEffect(() => {
    updateDisplayData(selectedCompositionType);
  }, [selectedData, selectedCompositionType]);

  const updateDisplayData = (label: string) => {
    const newData = selectedData
      .filter((item) => {
        const dataForLabel = item.data.data.find(
          (data) => data.label === label
        );
        return dataForLabel !== undefined; // ラベルに対応したデータが存在するかを確認
      })
      .map((item) => ({
        prefectureName: item.prefecture.prefName,
        values: item.data.data.find((data) => data.label === label)?.data || [],
      }));

    setDisplayData({ prefectures: newData });
  };

  const handleOptionClick = (option: { id: string; name: string }) => {
    setSelectedCompositionType(option.name);
    updateDisplayData(option.name); //これなんかおおくない？
    console.log(option.name);
    console.log(selectedData);
  };

  const years = displayData?.prefectures[0]?.values.map((value) => value.year);
  const colorScale = scaleOrdinal(schemePaired);

  return (
    <>
      <div
        style={{ width: "100%", height: "600px" }}
        className="m-4 p-8 w-full h-full rounded-xl bg-gray-200"
      >
        <div className="flex flex-col sm:flex-row mb-8 justify-center items-center">
          {compositionTypeButtons.map((button) => (
            <button
              key={button.id}
              className={`p-2 w-36 shadow-md
              ${
                selectedCompositionType === button.name
                  ? "bg-gray-600 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
              onClick={() => handleOptionClick(button)}
            >
              {button.name}
            </button>
          ))}
        </div>
        {existsSelectedData ? (
          <ResponsiveContainer width={"100%"} height={"70%"}>
            <LineChart data={years}>
              <XAxis
                type="number"
                dataKey="year"
                domain={["dataMin", "dataMax"]}
                tickCount={years?.length}
                label={{ value: "[年]", position: "insideBottomRight", dy: 10 }}
              />
              <YAxis
                width={60}
                label={{ value: "[万人]", angle: -90, dx: -20 }}
              />
              <Legend verticalAlign="top" height={64} />
              {displayData?.prefectures.map((prefecture, index) => (
                <Line
                  key={prefecture.prefectureName}
                  type="linear"
                  dataKey="value"
                  data={prefecture.values.map((item) => ({
                    ...item,
                    value: item.value / 10000,
                  }))}
                  name={prefecture.prefectureName}
                  stroke={colorScale(index.toString())}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex justify-center">都道府県を選択してください</div>
        )}
      </div>
    </>
  );
};

export default Graph;

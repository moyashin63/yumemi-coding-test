import React, { useEffect, useState, useRef } from "react";
import { getPopulationDataByPrefCode } from "@/api";
import { PopulationDataByPref, Prefecture, SelectedData } from "@/types";
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

const selectedData: SelectedData = [];

const compositionTypeButtons = [
  { id: "total", name: "総人口" },
  { id: "young", name: "年少人口" },
  { id: "productive", name: "生産年齢人口" },
  { id: "elderly", name: "老年人口" },
];

const Graph = () => {
  const [displayData, setDisplayData] = useState({
    prefectures: [] as {
      prefectureName: string;
      values: { year: number; value: number; rate?: number | undefined }[];
    }[],
  });

  const selectedPrefectures = useRecoilValue(
    selectedPrefectureState
  ) as Prefecture[];

  const prevSelectedPrefecturesRef = useRef<Prefecture[]>([]);

  useEffect(() => {
    const fetchData = async (newPrefecture: Prefecture) => {
      try {
        const newPrefData = await getPopulationDataByPrefCode(
          newPrefecture.prefCode
        );
        if (newPrefData.data[0].label === "総人口") {
          const updatedData = {
            ...displayData,
            prefectures: [
              ...displayData.prefectures,
              {
                prefectureName: newPrefecture.prefName,
                values: newPrefData.data[0].data,
              },
            ],
          };
          setDisplayData(updatedData);
          console.log(updatedData);
        }
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
        fetchData(addedPrefecture);
      }
    } else {
      const deletedPrefecture = prevSelectedPrefecturesRef.current.find(
        (prefecture) => {
          return !selectedPrefectures.some(
            (prevPrefecture) => prevPrefecture.prefCode === prefecture.prefCode
          );
        }
      );

      const updatedData = {
        ...displayData,

        prefectures: displayData.prefectures.filter((prefecture) => {
          // ここで条件を指定して削除したい要素をフィルタリングします
          // この例では prefectureName が newPrefecture.prefName でない要素を残します
          return prefecture.prefectureName !== deletedPrefecture?.prefName;
        }),
      };
      setDisplayData(updatedData);
      // 要素が減った場合の処理
      // 例えば、prevSelectedPrefecturesRef.current から削除された要素の処理を行う
    }
    prevSelectedPrefecturesRef.current = selectedPrefectures;
  }, [selectedPrefectures]);

  const [selectedCompositionType, setSelectedCompositionType] = useState("");
  const handleOptionClick = (option: string) => {
    setSelectedCompositionType(option);
  };

  const years = displayData?.prefectures[0]?.values.map((value) => value.year);
  const colorScale = scaleOrdinal(schemePaired);

  return (
    <>
      <div
        style={{ width: "100%", height: "400px" }}
        className="m-4 p-8 w-full rounded-xl bg-gray-200"
      >
        <div className="flex justify-center">
          {compositionTypeButtons.map((button) => (
            <button
              key={button.id}
              className={`p-2 w-36 shadow-md mb-8
              ${
                selectedCompositionType === button.id
                  ? "bg-gray-600 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
              onClick={() => handleOptionClick(button.id)}
            >
              {button.name}
            </button>
          ))}
        </div>
        <ResponsiveContainer width={"100%"} height={"85%"}>
          <LineChart data={years}>
            <XAxis
              type="number"
              dataKey="year"
              domain={["dataMin", "dataMax"]}
              tickCount={years?.length}
            />
            <YAxis />
            <Legend />
            {displayData?.prefectures.map((prefecture, index) => (
              <Line
                key={prefecture.prefectureName}
                type="linear"
                dataKey="value"
                data={prefecture.values}
                name={prefecture.prefectureName}
                stroke={colorScale(index.toString())}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Graph;

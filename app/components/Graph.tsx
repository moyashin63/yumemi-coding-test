import React, { useContext, useState } from "react";
//import { PrefecturesContext } from "./PrefecturesProvider";
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

const data = {
  prefectures: [
    {
      prefectureName: "北海道",
      values: [
        { year: 1980, value: 12817 },
        { year: 1985, value: 10817 },
        { year: 1990, value: 15817 },
      ],
    },
    {
      prefectureName: "青森県",
      values: [
        { year: 1980, value: 2817 },
        { year: 1985, value: 7817 },
        { year: 1990, value: 5817 },
      ],
    },
    {
      prefectureName: "山形県",
      values: [
        { year: 1980, value: 8817 },
        { year: 1985, value: 3817 },
        { year: 1990, value: 9817 },
      ],
    },
  ],
};

const compositionTypeButtons = [
  { id: "total", name: "総人口" },
  { id: "young", name: "年少人口" },
  { id: "productive", name: "生産年齢人口" },
  { id: "elderly", name: "老年人口" },
];

// responsiveContainerを使うとグラフが表示されないところから再開
const Graph = () => {
  //const { prefectures } = useContext(PrefecturesContext);
  const [selectedCompositionType, setSelectedCompositionType] = useState("");
  const handleOptionClick = (option: string) => {
    setSelectedCompositionType(option);
  };

  const years = data.prefectures[0].values.map((value) => value.year);
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
              tickCount={years.length}
            />
            <YAxis />
            <Legend />
            {data.prefectures.map((prefecture, index) => (
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

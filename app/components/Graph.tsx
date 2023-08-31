"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

//  「総人口」の他に「年少人口」「生産年齢人口」「老年人口」も切り替えるUIを何らかの形で用意し表示できるようにする（同時に表示する必要はない）
// なので、使用する人口データの種別を切り替えるUIを用意する。
// また、どの人口データを使用していても同じ関数で処理できるようにする。

const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 403, pv: 2402, amt: 2400 },
];

// responsiveContainerを使うとグラフが表示されないところから再開
const Graph = () => {
  return (
    <>
      <div
        style={{ width: "100%", height: "400px" }}
        className="m-4 p-8 w-full rounded-xl bg-gray-200"
      >
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart width={1300} height={300} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <XAxis
              label={{
                value: "年",
                position: "insideBottom",
              }}
            />
            <YAxis
              label={{
                value: "人口",
                angle: -90,
                position: "insideLeft",
                //offset: -0,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Graph;

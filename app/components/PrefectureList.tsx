import React from "react";

async function fetchAllPrefectures() {
  const API_KEY: string = process.env.API_KEY as string;
  const res = await fetch(
    "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    {
      headers: {
        "X-API-KEY": API_KEY,
      },
    }
  );
  const data = await res.json();
  return data.result;
}

export default async function PrefectureList() {
  const prefectures = await fetchAllPrefectures();
  return (
    <>
      <h3 className="font-semibold my-2 text-xl"> 都道府県一覧 </h3>
      <ul className="flex flex-wrap items-center w-full font-medium text-gray-900 rounded-xl bg-gray-200 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-8">
        {prefectures.map((prefecture: Prefecture) => (
          <li className="flex items-center" key={prefecture.prefCode}>
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded focus:ring-blue-500 focus:ring-2 ring-offset-4"
            />
            <label className="pl-2 w-36 text-xl">{prefecture.prefName}</label>
          </li>
        ))}
      </ul>
    </>
  );
}

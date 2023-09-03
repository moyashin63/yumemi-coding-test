import React, { useContext } from "react";
import { PrefecturesContext } from "./PrefecturesProvider";

export default function PrefectureList() {
  const { prefectures, handleCheckboxChange } = useContext(PrefecturesContext);
  return (
    <>
      <h3 className="font-semibold my-2 text-xl"> 都道府県一覧 </h3>
      <ul className="flex flex-wrap items-center w-full font-medium text-gray-900 rounded-xl bg-gray-200 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-8">
        {prefectures.map(({ prefecture, selected }) => (
          <li className="flex items-center" key={prefecture.prefCode}>
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded focus:ring-blue-500 focus:ring-2 ring-offset-4"
              checked={selected}
              onChange={() => {
                handleCheckboxChange(prefecture.prefCode);
              }}
            />
            <label className="pl-1 w-20">{prefecture.prefName}</label>
          </li>
        ))}
      </ul>
    </>
  );
}

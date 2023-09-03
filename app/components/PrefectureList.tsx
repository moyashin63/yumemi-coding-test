import React, { useEffect, useState } from "react";
import { getAllPrefectures } from "@/api";
import { useRecoilState } from "recoil";
import { selectedPrefectureState } from "../atoms/SelectedPrefectureAtom";
import { Prefecture } from "@/types";

interface FormattedData {
  prefecture: Prefecture;
  selected: boolean;
}

export default function PrefectureList() {
  const [allPrefectures, setAllPrefectures] = useState<FormattedData[]>([]);
  const [loading, setLoading] = useState(true); // ローディング状態
  const [selectedPrefectures, setSelectedPrefectures] = useRecoilState(
    selectedPrefectureState
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPrefectures();
        if (data) {
          const formattedData = data.map((prefecture: Prefecture) => ({
            prefecture,
            selected: false,
          }));
          setAllPrefectures(formattedData);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (prefCode: number) => {
    const updatedPrefectures = allPrefectures.map((prefecture) => {
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
    setAllPrefectures(updatedPrefectures);
  };

  if (loading) {
    return <div>Loading...</div>; // ローディング中はローディング表示
  }

  return (
    <>
      <h3 className="font-semibold my-2 text-xl"> 都道府県一覧 </h3>
      <ul className="flex flex-wrap items-center w-full font-medium text-gray-900 rounded-xl bg-gray-200 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-8">
        {allPrefectures.map(({ prefecture, selected }) => (
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

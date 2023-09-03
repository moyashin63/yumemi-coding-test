"use client";
//import { useContext } from "react";
//import { getAllPrefectures } from "../api";
import PrefectureList from "./components/PrefectureList";
import Graph from "./components/Graph";
//import { Prefecture } from "../types";
import { PrefecturesProvider } from "./components/PrefecturesProvider";

export default function Home() {
  const content = (
    <main className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1>yumemi coding test</h1>
      <PrefecturesProvider>
        <PrefectureList />
        <Graph />
      </PrefecturesProvider>
    </main>
  );
  return content;
}

//const [prefectures, setPrefectures] = useState<
//  { prefecture: Prefecture; selected: boolean }[]
//>([]);
//useEffect(() => {
//  const fetchDataCallback = (
//    error: Error | null,
//    data: Prefecture[] | null
//  ) => {
//    if (error) {
//      console.log("failed to fetch data");
//      return;
//    }
//    const formattedData =
//      data?.map((prefecture) => ({
//        prefecture,
//        selected: false,
//      })) || [];
//    setPrefectures(formattedData);
//  };
//  getAllPrefectures(fetchDataCallback);
//}, []);

//const handleCheckboxChange = (prefCode: number) => {
//  const updatedPrefectures = prefectures.map((prefecture) =>
//    prefecture.prefecture.prefCode === prefCode
//      ? { ...prefecture, selected: !prefecture.selected }
//      : prefecture
//  );
//  setPrefectures(updatedPrefectures);
//};

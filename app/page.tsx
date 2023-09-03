"use client";
import { RecoilRoot } from "recoil";
import PrefectureList from "./components/PrefectureList";
import Graph from "./components/Graph";

export default function Home() {
  const content = (
    <main className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1>yumemi coding test</h1>
      <RecoilRoot>
        <PrefectureList />
        <Graph />
      </RecoilRoot>
    </main>
  );
  return content;
}

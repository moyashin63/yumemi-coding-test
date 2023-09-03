"use server";
import { Prefecture, PopulationDataByPref } from "./types";
const API_KEY: string = process.env.NEXT_PUBLIC_API_KEY as string;

export const getAllPrefectures = async (): Promise<Prefecture[]> => {
  try {
    const res = await fetch(
      "https://opendata.resas-portal.go.jp/api/v1/prefectures",
      {
        headers: {
          "X-API-KEY": API_KEY,
        },
      }
    );
    if (!res.ok) throw new Error(res.statusText);

    const responseData = await res.json();
    return responseData.result;
  } catch (error) {
    throw error;
  }
};

export const getPopulationDataByPrefCode = async (
  prefCode: number
): Promise<PopulationDataByPref> => {
  const res = await fetch(
    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
    {
      headers: {
        "X-API-KEY": API_KEY,
      },
    }
  );
  const data = await res.json();
  return data.result;
};

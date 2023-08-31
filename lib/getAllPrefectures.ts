interface Prefecture {
  prefCode: number;
  prefName: string;
}

interface ApiResponse {
  message: string;
  result: Prefecture[];
}

export const getAllPrefectures = async (): Promise<Prefecture[]> => {
  const API_KEY: string = process.env.API_KEY as string;
  const res = await fetch(
    "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    {
      headers: {
        "X-API-KEY": API_KEY,
      },
    }
  );
  const apiResponse: ApiResponse = await res.json();
  const prefectures: Prefecture[] = apiResponse.result;
  return prefectures;
};

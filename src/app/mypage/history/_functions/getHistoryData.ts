import axios, { axiosPrivate } from "@/api/axios";

export default async function getHistoryData(url: string) {
  try {
    const response = await axiosPrivate.get(url);
    return response.data.item;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

export async function getHistoryData2(url: string, userId: number) {
  try {
    const customParam = JSON.stringify({ "extra.depth": 2 });
    const fullUrl = `${url}?custom=${encodeURIComponent(customParam)}`;
    const response = await axios.get(fullUrl);

    const mySellData = response.data.item.filter(
      (item: any) => item.seller_id === userId
    );

    return mySellData;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

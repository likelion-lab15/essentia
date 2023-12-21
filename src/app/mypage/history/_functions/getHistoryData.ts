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

export async function getHistoryData2(url: string) {
  try {
    const customParam = JSON.stringify({ "extra.depth": 2 });
    const fullUrl = `${url}?custom=${encodeURIComponent(customParam)}`;
    const response = await axios.get(fullUrl);
    return response.data.item;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

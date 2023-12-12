import { axiosPrivate } from "@/api/axios";

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

import axios from "axios";
import { getAccessToken } from "@/utils/_index";

export default async function getHistoryData(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data.item;
  } catch (err) {
    console.log(err);
  }
}

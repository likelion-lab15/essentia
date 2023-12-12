import axios from "axios";
import { getTokens } from "@/utils/_index";

const { accessToken } = getTokens();

export default async function getHistoryData(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.item;
  } catch (err) {
    console.log(err);
  }
}

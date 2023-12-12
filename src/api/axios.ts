import axios from "axios";
import { getTokens } from "@/utils/_index";

const BASE_URL = "https://localhost/api/";
const { accessToken } = getTokens();

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

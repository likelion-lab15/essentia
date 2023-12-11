import axios from "axios";
import { getAccessToken } from "@/utils/_index";

const BASE_URL = "https://localhost/api/";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

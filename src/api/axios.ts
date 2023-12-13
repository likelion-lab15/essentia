"use client";

import axios from "axios";

const BASE_URL = "https://localhost/api/";

const user =
  typeof window !== "undefined"
    ? JSON.parse(sessionStorage.getItem("user")).state.user
    : null;

let accessToken;

if (user) {
  accessToken = user.token.accessToken;
} else {
  accessToken = "";
}

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

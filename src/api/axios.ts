"use client";

import axios from "axios";

const BASE_URL = "https://localhost/api/";

const token =
  typeof window !== "undefined"
    ? JSON.parse(sessionStorage.getItem("token")).state.token
    : null;

let accessToken;

if (token) {
  accessToken = token.accessToken;
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

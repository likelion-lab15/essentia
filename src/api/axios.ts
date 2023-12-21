"use client";

import axios from "axios";

const BASE_URL = "https://onyx-onyx.koyeb.app/api/";

// 세션스토리지에서 토큰 불러오기
const getToken = () => {
  if (typeof window !== "undefined") {
    const tokenData = JSON.parse(sessionStorage.getItem("token")) || {
      state: { token: null },
    };
    return tokenData.state.token ? tokenData.state.token.accessToken : "";
  }
  return "";
};

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});

// axios 인터셉터로 axiosPrivate으로 통신이 수행될 경우 token 사용
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

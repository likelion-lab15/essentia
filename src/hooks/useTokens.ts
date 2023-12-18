"use client";

import { axiosPrivate } from "@/api/axios";
import { useTokenStore } from "@/stores/_index";

export default function useTokens() {
  const token = useTokenStore((state) => state.token);
  const setToken = useTokenStore((state) => state.setToken);

  // accessToken 가져오기
  const getAccessToken = () => {
    const accessToken = token.accessToken;
    return accessToken;
  };

  // refreshToken 가져오기
  const getRefreshToken = () => {
    const refreshToken = token.refreshToken;
    return refreshToken;
  };

  // newAccessToken 가져오기
  const getNewAccessToken = async () => {
    const refreshToken = getRefreshToken();

    try {
      const res = await axiosPrivate.get("users/refresh", {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      const newAccessToken = res.data.accessToken;
      const newToken = token;
      newToken.accessToken = newAccessToken;
      setToken(newToken);
      console.log("토큰 업데이트 성공!");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };

  return { getAccessToken, getRefreshToken, getNewAccessToken };
}

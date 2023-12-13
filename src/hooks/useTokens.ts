"use client";

import { axiosPrivate } from "@/api/axios";
import { useUserStore } from "@/stores/useUserStore";

export default function useTokens() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  // accessToken 가져오기
  const getAccessToken = () => {
    const accessToken = user.token.accessToken;
    return accessToken;
  };

  // refreshToken 가져오기
  const getRefreshToken = () => {
    const refreshToken = user.token.refreshToken;
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
      const newUser = user;
      newUser.token.accessToken = newAccessToken;
      setUser(newUser);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };

  return { getAccessToken, getRefreshToken, getNewAccessToken };
}

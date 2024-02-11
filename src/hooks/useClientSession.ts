/* 개발자 - 김진우 */

import { useSession } from "next-auth/react";

export default function useClientSession() {
  const { data: session } = useSession();

  /* 유저 세션을 반환하는 함수 */
  const userSession = () => {
    if (session) {
      return session.user.item;
    } else {
      return { message: "유저 세션이 없습니다" };
    }
  };

  /* JWT AccessToken을 반환하는 함수 */
  const accessToken = () => {
    if (session) {
      return session.user.item.token.accessToken;
    } else {
      return { message: "유저 세션이 없습니다" };
    }
  };

  /* JWT RefreshToken을 반환하는 함수 */
  const refreshToken = () => {
    if (session) {
      return session.user.item.token.refreshToken;
    } else {
      return { message: "유저 세션이 없습니다" };
    }
  };

  return { userSession, accessToken, refreshToken };
}

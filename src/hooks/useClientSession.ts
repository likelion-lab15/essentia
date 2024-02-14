/* 개발자 - 김진우 */

import { useSession } from "next-auth/react";

export default function useClientSession() {
  const { data: session } = useSession();

  /* 유저 세션을 반환하는 함수 */
  const getUserSession = () => {
    if (session) {
      return session.user.item;
    } else {
      return;
    }
  };

  /* JWT AccessToken을 반환하는 함수 */
  const getAccessToken = () => {
    if (session) {
      return session.user.item.token.accessToken;
    } else {
      return;
    }
  };

  /* JWT RefreshToken을 반환하는 함수 */
  const getRefreshToken = () => {
    if (session) {
      return session.user.item.token.refreshToken;
    } else {
      return;
    }
  };

  return { getUserSession, getAccessToken, getRefreshToken };
}

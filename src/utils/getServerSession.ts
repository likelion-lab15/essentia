/* 개발자 - 김진우 */

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

/* 유저 세션을 반환하는 함수 */
export const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    return session.user.item;
  } else {
    return;
  }
};

/* JWT AccessToken을 반환하는 함수 */
export const getAccessToken = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    return session.user.item.token.accessToken;
  } else {
    return;
  }
};

/* JWT RefreshToken을 반환하는 함수 */
export const getRefreshToken = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    return session.user.item.token.refreshToken;
  } else {
    return;
  }
};

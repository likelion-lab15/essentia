/* 개발자 - 김진우 */

import { useSession } from "next-auth/react";

type TUserItem = {
  _id: number;
  email: string;
  name: string;
  phone: string;
  extra: {
    birthday?: string;
    addressBook?: {
      value?: string;
      detail?: string;
    };
  };
  token: {
    accessToken: string;
    refreshToken: string;
  };
};

export default function useClientSession() {
  const { data: session } = useSession();

  /* 유저 세션을 반환하는 함수 */
  const getUserSession = () => {
    if (session && session.user && "item" in session.user) {
      const userItem = session.user.item as TUserItem;
      return userItem;
    } else {
      return;
    }
  };

  /* JWT AccessToken을 반환하는 함수 */
  const getAccessToken = () => {
    if (session && session.user && "item" in session.user) {
      const userItem = session.user.item as TUserItem;
      return userItem.token.accessToken;
    } else {
      return;
    }
  };

  /* JWT RefreshToken을 반환하는 함수 */
  const getRefreshToken = () => {
    if (session && session.user && "item" in session.user) {
      const userItem = session.user.item as TUserItem;
      return userItem.token.refreshToken;
    } else {
      return;
    }
  };

  return { getUserSession, getAccessToken, getRefreshToken };
}

import { fetchPrivateData } from "@/fetch/fetch";

/* 찜 제거하기 */
export default async function deleteWish(id: number, accessToken: string) {
  /* 클라이언트에서 받은 토큰으로 실행하지만 실행이 된다...? */
  await fetchPrivateData(`bookmarks/${id}`, accessToken, { method: "DELETE" });
}

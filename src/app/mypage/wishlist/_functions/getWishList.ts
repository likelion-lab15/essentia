import { getAccessToken } from "@/utils/getServerSession";

/* 찜목록 불러오기 */
export default async function getWishList() {
  const accessToken = await getAccessToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/bookmarks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();
    return data.item;
  } catch (error) {
    console.error("message:", error);
  }
}

import { fetchPrivateData } from "@/fetch/fetch";

export default async function getWishList(accessToken: string) {
  const wishListData = await fetchPrivateData("/bookmarks", accessToken);

  return wishListData;
}

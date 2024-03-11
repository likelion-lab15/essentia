import { fetchData, fetchPrivateData } from "@/fetch/fetch";
import { getUserSession, getAccessToken } from "@/utils/getServerSession";

/* 구매내역 불러오기 */
export const getBuyHistory = async () => {
  const accessToken = await getAccessToken();
  return await fetchPrivateData("orders", accessToken);
};

/* 판매내역 불러오기 */
export const getSellHistory = async () => {
  const user = await getUserSession();
  const customParam = JSON.stringify({ "extra.depth": 2 });
  const fullUrl = `products?custom=${encodeURIComponent(customParam)}`;

  const data = await fetchData(`${fullUrl}`);

  const filteredItem = data.filter((item: any) => item.seller_id === user._id);
  return filteredItem;
};

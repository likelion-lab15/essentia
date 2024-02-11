import { getUserSession, getAccessToken } from "@/utils/getServerSession";

/* 구매내역 불러오기 */
export const getBuyHistory = async () => {
  const accessToken = await getAccessToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/orders`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();
    return data.item;
  } catch (error) {
    console.error("message:", error);
  }
};

/* 판매내역 불러오기 */
export const getSellHistory = async () => {
  const user = await getUserSession();
  const customParam = JSON.stringify({ "extra.depth": 2 });
  const fullUrl = `products?custom=${encodeURIComponent(customParam)}`;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/${fullUrl}`);
    const data = await res.json();

    const filteredItem = data.item.filter(
      (item: any) => item.seller_id === user._id
    );
    return filteredItem;
  } catch (error) {
    console.error("message:", error);
  }
};

import { getAccessToken } from "@/utils/getServerSession";

/* 리뷰 데이터 불러오기 */
export const getRepliesData = async () => {
  const accessToken = await getAccessToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/replies`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();

    const reviewdProducts = data.item.map((reply: TReview) => {
      return reply.product._id;
    });

    return reviewdProducts;
  } catch (error) {
    console.error("message:", error);
  }
};

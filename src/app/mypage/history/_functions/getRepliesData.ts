import { getAccessToken } from "@/utils/getServerSession";
import { fetchPrivateData } from "@/fetch/fetch";

type TReview = {
  product: {
    _id: number;
  };
};

/* 리뷰 데이터 불러오기 */
export const getRepliesData = async () => {
  const accessToken = await getAccessToken();
  const data = await fetchPrivateData("replies", accessToken);

  const reviewdProducts = data.map((reply: TReview) => {
    return reply.product._id;
  });

  return reviewdProducts;
};

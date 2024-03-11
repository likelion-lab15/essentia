"use client";

import { fetchPrivateData } from "@/fetch/fetch";
import { useRouter } from "next/navigation";
import { useClientSession } from "@/hooks/_index";

type TSellHistoryData = {
  _id: number;
  seller_id: number;
  price: number;
  show: boolean;
  active: boolean;
  name: string;
  quantity: number;
  buyQuantity: number;
  mainImages: [
    {
      path: string;
      name: string;
      originalname: string;
    },
  ];
  createdAt: string;
  updatedAt: string;
  extra: {
    brand: string;
    category: [];
    parent: number;
    depth: number;
    amount: number;
    restamount: number;
    date: string;
  };
  replies: number;
  bookmarks: number;
};

const SellHistoryTable = ({
  sellHistoryData,
}: {
  sellHistoryData: TSellHistoryData[];
}) => {
  const router = useRouter();
  const { getAccessToken } = useClientSession();
  const accessToken = getAccessToken() as string;

  // 상품 수정 페이지로 이동
  const editProduct = (id: number) => {
    router.push(`/products/${id}/editsell/`);
  };

  // 상품 삭제
  const deleteProduct = async (id: number) => {
    await fetchPrivateData(`/seller/products/${id}`, accessToken, {
      method: "DELETE",
    });
    alert(`${id}를 상품에서 삭제했습니다!`);
  };

  return (
    <table className="mb-[66px] w-[100%]">
      <caption className="h-[64px] border-b-[3px] border-black text-left text-[28px] font-bold">
        판매 내역
      </caption>
      <tbody>
        <tr className="h-[50px] border-b-[1px] border-black text-[18px] font-bold">
          <th className="w-[10%]">등록일</th>
          <th className="w-[30%]">상품정보</th>
          <th className="w-[10%]">판매금액</th>
          <th className="w-[10%]">상품관리</th>
        </tr>
        {sellHistoryData?.map((item) => {
          const { _id, createdAt, name, price } = item;

          // 상품 이름이 너무 길 때
          const truncateName =
            name.length > 35 ? name.slice(0, 35) + "..." : name;

          return (
            <tr
              key={_id}
              className="h-[50px] border-b-[1px] border-black text-center text-[18px] font-medium"
            >
              <td className="w-[10%]">{createdAt.split(" ")[0]}</td>
              <td className="w-[30%] text-left">{truncateName}</td>
              <td className="w-[10%] pr-[30px] text-right">
                {price.toLocaleString("ko-KR")} 원
              </td>
              <td className="w-[10%]">
                <button
                  type="button"
                  className="h-[50px] w-[70px] hover:bg-[#A0D1EF]"
                  onClick={() => editProduct(_id)}
                >
                  수정
                </button>
                <button
                  type="button"
                  className="h-[50px] w-[70px] hover:bg-[#A0D1EF]"
                  onClick={() => deleteProduct(_id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SellHistoryTable;

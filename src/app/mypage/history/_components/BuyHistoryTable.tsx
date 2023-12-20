"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useReviewStore } from "@/stores/_index";
import { axiosPrivate } from "@/api/axios";

type TReview = {
  _id: number;
  rating: number;
  content: string;
  extra: {
    title: string;
  };
  createdAt: string;
  product: {
    _id: number;
    image: {
      path: string;
      name: string;
      originalname: string;
    };
    name: string;
  };
  user: {
    _id: number;
    name: string;
  };
};

type TProduct = {
  _id: number;
  quantity: number;
  seller_id: number;
  name: string;
  image: {
    path: string;
    name: string;
    originalname: string;
  };
  price: number;
  extra: {
    brand: string;
    category: [];
    parent: number;
    depth: number;
    amount: number;
    restamount: number;
    date: string;
  };
};

type TBuyHistory = {
  _id: number;
  products: TProduct[];
  address: {
    name: string;
    value: string;
  };
  state: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  cost: {
    products: number;
    shippingFees: number;
    discount: {
      products: number;
      shippingFees: number;
    };
    total: number;
  };
};

type TBuyHistoryData = TBuyHistory[];

const BuyHistoryTable = ({
  buyHistoryData,
}: {
  buyHistoryData: TBuyHistoryData;
}) => {
  const setReview = useReviewStore((state) => state.setReview);

  const [reviewdProducts, setReviewedProducts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    // 리뷰된 상품의 목록들
    (async () => {
      try {
        const res = await axiosPrivate.get("replies");
        const repliesData = res.data.item;

        const reviewdProductsData = repliesData.map((reply: TReview) => {
          return reply.product._id;
        });

        console.log(reviewdProductsData);

        setReviewedProducts(reviewdProductsData);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    })();
  }, []);

  const handleClick = (buyHistory: TBuyHistory, product: TProduct) => () => {
    const { _id: orderId } = buyHistory;
    const { name, image, extra } = product;

    setReview({
      order_id: orderId,
      product_id: extra.parent,
      brand: extra.brand,
      name: name,
      image: image,
    });
    router.push("/review");
  };

  return (
    <table className="mb-[66px] w-[100%]">
      <caption className="h-[64px] border-b-[3px] border-black text-left text-[28px] font-bold">
        구매 내역
      </caption>
      <tbody>
        <tr className="h-[50px] border-b-[1px] border-black text-[18px] font-bold">
          <th className="w-[10%]">구매일</th>
          <th className="w-[30%]">상품정보</th>
          <th className="w-[10%]">결제금액</th>
          <th className="w-[10%]">리뷰</th>
        </tr>
        {buyHistoryData?.map((buyHistory) => {
          const { createdAt, products } = buyHistory;

          return products.map((product, index) => {
            const { _id, name, price } = product;
            console.log(product);

            return (
              <tr
                key={index}
                className="h-[50px] border-b-[1px] border-black text-center text-[18px] font-medium"
              >
                <td className="w-[10%]">{createdAt.split(" ")[0]}</td>
                <td className="w-[30%] text-left">{name}</td>
                <td className="w-[10%]">{price.toLocaleString("ko-KR")} 원</td>
                <td className="w-[10%]">
                  {reviewdProducts.includes(_id) ? (
                    <button
                      type="button"
                      className="h-[50px] w-[70px] hover:bg-[#A0D1EF]"
                      disabled
                    >
                      완료
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="h-[50px] w-[70px] hover:bg-[#A0D1EF]"
                      onClick={handleClick(buyHistory, product)}
                    >
                      작성
                    </button>
                  )}
                </td>
              </tr>
            );
          });
        })}
      </tbody>
    </table>
  );
};

export default BuyHistoryTable;

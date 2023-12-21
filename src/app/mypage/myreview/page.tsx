/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { axiosPrivate } from "@/api/axios";

type TReview = {
  _id: number;
  rating: number;
  content: string;
  createdAt: string;
  extra: {
    title: string;
  };
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

export default function MyReview() {
  const [reviewData, setReviewData] = useState<TReview[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosPrivate.get("replies");
        setReviewData(res.data.item);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    })();
  }, []);

  return (
    <section className="w-[1000px]">
      {/* 1. 제목 */}
      <div className="mb-[40px] flex h-[70px] items-center border-b-[3px] border-[#222]">
        <p className="text-[28px] font-bold">내가 쓴 리뷰</p>
      </div>
      {reviewData?.map((review) => {
        const { _id, createdAt, product, extra, content } = review;

        return (
          <div key={_id} className="mb-[25px] flex bg-gray-100 p-[30px]">
            <div className="mr-[42px] flex flex-col">
              <div className="mb-[10px] h-[200px] w-[200px]">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMG}${product.image.path}`}
                  alt={product.image.originalname}
                  width="100%"
                  height="100%"
                />
              </div>
              <span className="text-[16px] font-medium">{product.name}</span>
            </div>
            <div>
              <p className="font-bold">{extra.title}</p>
              <p className="mb-[10px]">{createdAt.split(" ")[0]}</p>
              <p>{content}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

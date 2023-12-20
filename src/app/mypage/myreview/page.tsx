"use client";

import { useState, useEffect } from "react";
import { axiosPrivate } from "@/api/axios";
import Image from "next/image";

export default function MyReview() {
  const [reviewData, setReviewData] = useState([]);

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
        const { _id, createdAt, product, extra, content, user } = review;

        return (
          <div key={_id} className="mb-[25px] flex bg-gray-100 p-[30px]">
            <div className="mr-[42px] flex flex-col">
              <div className="mb-[10px] h-[100px] w-[100px]">
                <Image
                  src={product.image.url}
                  alt={product.image.orgName}
                  width={100}
                  height={100}
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

"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { axiosPrivate } from "@/api/axios";
import { useReviewStore } from "@/stores/_index";
import { Button } from "@/components/_index";

export default function Review() {
  const reviewData = useReviewStore((state) => state.review);

  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");

  const router = useRouter();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      order_id: reviewData?.order_id,
      product_id: reviewData?.product_id,
      rating: 1,
      content: contentInput,
      extra: {
        title: titleInput,
      },
    };

    try {
      const res = await axiosPrivate.post("replies", data);
      console.log(res);
      alert("리뷰 등록 완료!");
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        alert("리뷰 등록 실패!");
      }
    }
  };

  const handleInput = (setter) => (e) => {
    setter(e.target.value);
  };

  // review에 name이 있으면 렌더링 시작
  return (
    <section className="mx-auto w-[680px]">
      {/* 1. 제목 */}
      <div className="flex h-[64px] items-center border-b-[3px] border-black">
        <span className="text-[20px] font-bold">리뷰 작성</span>
      </div>
      {/* 2. 상품 정보 */}
      <div className="flex border-b-[1px] border-[#808080] p-[25px]">
        <div className="mr-[42px] h-[100px] w-[100px]">
          <img
            src={`https://localhost/api${reviewData.image.path}`}
            alt={reviewData.image.originalname}
            width={100}
            height={100}
          />
        </div>
        <div>
          <p className="text-[18px] font-regular">{reviewData?.brand}</p>
          <p className="text-[24px] font-bold">{reviewData?.name}</p>
          <p className="text-[16px] font-regular">
            {/* Le Labo Santal 33 Eau De Parfum 50ml (Korean Ver.) */}
          </p>
        </div>
      </div>
      <form onSubmit={handleFormSubmit}>
        {/* 3. 리뷰 작성 */}
        <div className="border-b-[1px] border-[#808080] py-[25px]">
          <div className="mb-[15px] border-[1px] border-[#808080]">
            <label htmlFor="title" className="sr-only">
              리뷰 제목
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="제목"
              required
              className="w-full p-[16px]"
              value={titleInput}
              onChange={handleInput(setTitleInput)}
            />
          </div>
          <div className="border-[1px] border-[#808080]">
            <label htmlFor="content" className="sr-only">
              리뷰 본문
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="최소 15자 이상 작성해주십세요."
              className="min-h-[130px] w-full resize-none p-[16px] focus:outline-none"
              value={contentInput}
              onChange={handleInput(setContentInput)}
              minLength={15}
            />
          </div>
        </div>
        {/* 4. 주의사항 */}
        <div className="mb-[50px] py-[25px]">
          <p className="mb-[12px] text-[12px] font-medium text-[#808080]">
            &#x2022; 이미지 리뷰는 상품이 노출된 사진이 1장 이상 포함되어야
            합니다.
          </p>
          <p className="mb-[12px] text-[12px] font-medium text-[#808080]">
            &#x2022; 최초 등록된 리뷰 기준으로 마일리지가 지급됩니다.
          </p>
          <p className="mb-[12px] text-[12px] font-medium text-[#808080]">
            &#x2022; 상품과 무관하거나 비속어가 포함된 리뷰, 그 외 리뷰
            운영정책에 위배되는 리뷰는 고지 없이 블라인드 후 경고 조치됩니다.
          </p>
          <p className="mb-[12px] text-[12px] font-medium text-[#808080]">
            &#x2022; 경고 누적 시 리뷰 작성이 제한될 수 있습니다.
          </p>
        </div>

        {/* 5. 버튼 */}
        <div className="mb-[50px] flex justify-center">
          <Button label="등록하기" type="submit" />
        </div>
      </form>
    </section>
  );
}

"use client";
import { useState, useEffect } from "react";
import { Header, Button } from "@/components/_index";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetail() {
  // 리뷰 데이터와 아코디언의 상태를 관리할 state를 선언합니다.
  const [reviews, setReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [countReviews, setCountReviews] = useState(0);

  async function getProductInfo() {
    try {
      const _id = 3;
      const response = await axios.get(`https://localhost/api/products/${_id}`);
      const result = response.data;
      console.log("리뷰는 ", result.item.replies);
      return result.item.replies;
    } catch (error) {
      console.error("Error 🥲", error);
      return [];
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const replies = await getProductInfo();
        setReviews(replies);
        setCountReviews(replies.length); // Update the countReviews state
      } catch (error) {
        console.error("Error 🥲", error);
      }
    };
    fetchData();
  }, []);

  // 아코디언을 토글하는 함수입니다.
  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center">
        {/* 메인 섹션 */}
        <section className="flex h-[660px] w-[1280px] items-center justify-center ">
          {/* 상품 구매 + 판매 SECTION */}
          <div className="flex h-[560px] w-full flex-row items-center justify-between pl-[60px] pr-[60px]">
            {/* 향수 이미지 */}
            <div className="flex h-[560px] w-[560px] flex-col items-center justify-center">
              <Image
                alt="santal33"
                src="/santal33.png"
                width={450}
                height={450}
              ></Image>
            </div>
            {/* 사용자 상호작용 */}
            <div className="h-[444] w-[560px]">
              <p className="mb-[15px] h-[32px] w-[560px] border-b border-primary text-22 font-bold">
                LE LABO
              </p>
              <p className="text-30 font-medium"> SANTAL 33</p>
              <p className="mb-[34px] text-16 font-medium text-tertiary">
                50ml 100ml
              </p>
              <p className="mb-[18px] w-[560px] text-14 font-medium text-tertiary">
                미 서부의 와일드한 평원에 고독하게 앉아있다고 상상해 보세요.
                모닥불의 불빛이 드리우고 머리 위로는 인디고블루의 밤하늘이
                펼쳐집니다. 주변에는 사막의 부드러운 바람을 제외하고 아무것도
                없습니다. 당신은 자유로워요.
              </p>
              <div className="mb-[15px] flex w-[560px] flex-row items-baseline justify-end">
                <p className="mr-[14px] text-14 font-medium">50ml</p>
                <p className="text-28 font-bold">169,000원</p>
              </div>

              <div className="mb-[16px] h-[46px] w-[560px] border">
                drop down box
              </div>
              {/* 버튼 박스 */}
              <div className="mb-[16px] flex w-[560px] justify-between">
                <Button
                  className="h-[46px] w-[275px] border border-primary bg-white text-primary"
                  label="바로 구매하기"
                  type="button"
                ></Button>
                <Button
                  className="h-[46px] w-[275px]"
                  label="판매하기"
                  type="button"
                ></Button>
              </div>
              <Button
                className="h-[46px] w-[560px] border border-primary bg-white text-primary"
                label="위시 리스트에 추가하기"
                type="button"
              ></Button>
            </div>
          </div>
        </section>

        {/* 상세페이지 네비게이션  */}
        <nav
          aria-label="상품 상세 네비게이션"
          className="flex h-[64px] w-full flex-row justify-center border-b-2 border-t-2 border-primary"
        >
          <ul className="flex h-[62px] w-[800px] flex-row justify-between text-16 font-semibold text-tertiary ">
            <li className="w-[200px]">
              <Link
                className="flex h-[64px] w-[200px] items-center justify-center hover:text-primary"
                href="/"
                accessKey="1"
              >
                상품 상세정보
              </Link>
            </li>
            <li>
              <Link
                className="flex h-[64px] w-[200px] items-center justify-center hover:text-primary"
                href="/"
                accessKey="2"
              >
                교환 및 반품안내
              </Link>
            </li>
            <li>
              <Link
                className="flex h-[64px] w-[200px] items-center justify-center hover:text-primary"
                href="/"
                accessKey="3"
              >
                리뷰
              </Link>
            </li>
            <li>
              <Link
                className="flex h-[64px] w-[200px] items-center justify-center hover:text-primary"
                href="/"
                accessKey="4"
              >
                추천 상품
              </Link>
            </li>
          </ul>
        </nav>
        {/* 상세 이미지 SECTION */}
        <section className="flex h-[600px] w-[1280px] items-center justify-center border ">
          <h3>제품 설명 이미지</h3>
        </section>

        {/* 구분선 */}
        <div className="h-0 w-full border-b-2 border-primary"></div>
        <div className="flex h-[1450px] w-[1280px] flex-col items-center justify-center">
          {/* 리뷰 섹션 */}
          <section className="mb-[100px] h-[555px] w-full border border-pink-700">
            <h3 className="mb-[40px] text-48 font-bold">
              REVIEW ({countReviews})
            </h3>
            {/* 리뷰 아코디언 */}
            <div className="border-primary text-20 font-medium">
              {reviews.map((review, index) => (
                <div
                  key={review._id}
                  className="flex flex-col border-b-2 border-primary"
                >
                  <button
                    className="w-full pb-[20px] pt-[20px] text-left font-semibold"
                    onClick={() => toggleAccordion(index)}
                  >
                    {review.extra.title}
                  </button>
                  {activeIndex === index && (
                    <div className="p-[20px]">
                      {/* <p>평점: {review.rating}점</p> */}
                      <p>{review.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
          {/* 추천 상품 */}
          <section className="h-[600px] w-full border border-pink-700">
            <h3 className="text-48 font-bold">추천 상품</h3>
          </section>
        </div>
      </main>
    </>
  );
}

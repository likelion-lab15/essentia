"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ProductPlus() {
  /* 상태 변수 선언 */
  // 현재 활성화된 섹션을 추적하기 위한 상태
  const [activeSection, setActiveSection] = useState("");

  // 리뷰 데이터 관리를 위한 상태
  const [reviews, setReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [countReviews, setCountReviews] = useState(0);

  // 페이지네이션을 위한 상태
  const [currentPage, setCurrentPage] = useState(1);

  // 각 섹션에 대한 참조
  const detailInfoRef = useRef(null);
  const returnInfoRef = useRef(null);
  const reviewRef = useRef(null);
  const recommendedProductsRef = useRef(null);

  /* 상수 선언 */
  const REVIEWS_PER_PAGE = 5;
  const pageCount = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  // 현재 페이지의 리뷰 데이터
  const currentReviews = reviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  /* 함수 선언 */
  // 페이지 전환 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setActiveIndex(null);
  };

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    const headerHeight = 240;
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - headerHeight,
        behavior: "smooth",
      });
    }
  };

  // 스크롤에 따라 현재 섹션을 감지
  const checkActiveSection = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    const refs: { [key: string]: React.MutableRefObject<null> } = {
      detailInfo: detailInfoRef,
      returnInfo: returnInfoRef,
      review: reviewRef,
      recommendedProducts: recommendedProductsRef,
    };

    for (const section in refs) {
      const ref = refs[section];
      if (ref.current) {
        const offsetTop = ref.current.offsetTop;
        const offsetBottom = offsetTop + ref.current.offsetHeight;
        if (scrollPosition > offsetTop && scrollPosition < offsetBottom) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  // API 호출 및 데이터 가져오기
  async function getProductInfo() {
    try {
      const _id = 3;
      const response = await axios.get(`https://localhost/api/products/${_id}`);
      const result = response.data;
      return result.item.replies;
    } catch (error) {
      console.error("Error 🥲", error);
      return [];
    }
  }

  // 컴포넌트 마운트 시 API 호출
  useEffect(() => {
    const fetchData = async () => {
      const replies = await getProductInfo();
      setReviews(replies);
      setCountReviews(replies.length);
    };
    fetchData();
  }, []);

  // 스크롤 이벤트 리스너 추가
  useEffect(() => {
    window.addEventListener("scroll", checkActiveSection);

    return () => {
      window.removeEventListener("scroll", checkActiveSection);
    };
  }, []);

  // 리뷰 아코디언 토글 함수
  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      {/* 상세페이지 네비게이션  */}
      <nav
        aria-label="상품 상세 네비게이션"
        className="sticky top-[79px] z-10 flex h-[64px] w-full flex-row justify-center border-b border-t border-primary bg-white"
      >
        <ul className="flex h-[62px] w-[800px] flex-row justify-between text-16 font-semibold text-tertiary">
          <li>
            <button
              onClick={() => scrollToSection(detailInfoRef)}
              className={`flex h-[64px] w-[200px] items-center justify-center hover:text-primary ${
                activeSection === "detailInfo" ? "font-bold text-primary" : ""
              }`}
            >
              상세정보
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(returnInfoRef)}
              className={`flex h-[64px] w-[200px] items-center justify-center hover:text-primary ${
                activeSection === "returnInfo" ? "font-bold text-primary" : ""
              }`}
            >
              교환 및 반품안내
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(reviewRef)}
              className={`flex h-[64px] w-[200px] items-center justify-center hover:text-primary ${
                activeSection === "review" ? "font-bold text-primary" : ""
              }`}
            >
              REVIEW ({countReviews})
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(recommendedProductsRef)}
              className={`flex h-[64px] w-[200px] items-center justify-center hover:text-primary ${
                activeSection === "recommendedProducts"
                  ? "font-bold text-primary"
                  : ""
              }`}
            >
              추천 상품
            </button>
          </li>
        </ul>
      </nav>
      {/* 상세 이미지 SECTION */}
      <section
        ref={detailInfoRef}
        className="mb-[100px] mt-[100px] flex h-[600px] w-[1280px] items-center justify-center border"
      >
        <h3>제품 설명 이미지</h3>
      </section>
      <section
        ref={returnInfoRef}
        className="mb-[100px] mt-[100px] flex h-[600px] w-[1280px] items-center justify-center border"
      >
        <h3>배송 및 환불 정보</h3>
      </section>
      {/* 구분선 */}
      <div className="mb-[100px] h-0 w-full border-b-2 border-primary"></div>
      <div className="flex h-[1450px] w-[1280px] flex-col items-center ">
        {/* 리뷰 섹션 */}
        <section ref={reviewRef} className="mb-[100px] w-full overflow-y-auto ">
          <h3 className="border-b-2 border-primary pb-[40px] text-48 font-bold">
            REVIEW ({countReviews})
          </h3>
          {/* 리뷰 아코디언 */}
          <div className="text-20 font-medium">
            {currentReviews.map((review, index) => (
              <div
                key={review._id}
                className={`flex flex-col border-b-2 border-primary ${
                  activeIndex === index ? "bg-blue-100" : ""
                }`}
              >
                <button
                  className="flex w-full items-center justify-between p-[20px] text-left"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="flex-grow">{review.extra.title}</span>
                  <span className="w-[100px] text-center">
                    {review.extra.author}
                  </span>
                  <span className="w-[200px] text-right">
                    {new Date(review.createdAt).toLocaleDateString("ko-KR")}
                  </span>
                </button>
                <div
                  className={
                    activeIndex === index ? "max-h-[200px]" : "max-h-0"
                  }
                >
                  <div
                    className={`p-[20px] ${
                      activeIndex === index ? "block" : "hidden"
                    }`}
                  >
                    <p>{review.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* 페이지네이션 컴포넌트 */}
          <div className="mt-[40px] flex items-center justify-center text-24 font-bold">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                className="m-[5px] p-[10px]"
                key={i}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </section>
        {/* 추천 상품 */}
        <section
          ref={recommendedProductsRef}
          className="h-[600px] w-full border border-pink-700"
        >
          <h3 className="text-48 font-bold">추천 상품</h3>
        </section>
      </div>
    </>
  );
}

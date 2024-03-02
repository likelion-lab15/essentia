"use client";

import { useState } from "react";

export default function ReviewList({ numberOfReviews, reviews, test }) {
  // 리뷰 목록의 현재 페이지 상태
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // 페이지네이션을 위한 상태
  const [currentPage, setCurrentPage] = useState(1);
  // 페이지당 리뷰 수
  const REVIEWS_PER_PAGE = 5;
  // 리뷰 목록의 총 페이지 수
  const pageCount = Math.ceil(numberOfReviews / REVIEWS_PER_PAGE);

  // 현재 페이지의 리뷰 데이터
  const currentReviews = reviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  // 리뷰 아코디언 토글 함수
  const toggleAccordion = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // 페이지 전환 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setActiveIndex(null);
  };

  return (
    <section className="mb-[100px] h-[600px] w-[1280px] overflow-y-auto">
      <h3 className="border-b-2 border-primary pb-[40px] text-48 font-bold">
        REVIEW ({numberOfReviews})
      </h3>
      <div className="text-20 font-medium">
        {currentReviews.map((review, index) => (
          <div
            key={index}
            className={`flex flex-col border-b-2 border-primary ${
              activeIndex === index ? "bg-blue-100" : ""
            }`}
          >
            <button
              className="flex w-full items-center justify-between p-[20px] text-left"
              onClick={() => toggleAccordion(index)}
            >
              <span className="flex-grow">{review.title}</span>
              <span className="w-[100px] text-center">{review.author}</span>
              <span className="w-[200px] text-right">
                {new Date(review.createdAt).toLocaleDateString("ko-KR")}
              </span>
            </button>
            <div
              className={activeIndex === index ? "max-h-[200px]" : "max-h-0"}
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
  );
}

"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Review({ ref }) {
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

  // 리뷰 데이터 관리를 위한 상태
  const [reviews, setReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [countReviews, setCountReviews] = useState(0);

  // 페이지네이션을 위한 상태
  const [currentPage, setCurrentPage] = useState(1);

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

  // 리뷰 아코디언 토글 함수
  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  useEffect(() => {
    const fetchData = async () => {
      const replies = await getProductInfo();
      setReviews(replies);
      setCountReviews(replies.length);
    };
    fetchData();
  }, []);

  return (
    <section ref={ref} className="mb-[100px] w-full overflow-y-auto ">
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
  );
}

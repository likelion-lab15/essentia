"use client";

import React from "react";

export default function DetailNavigation({
  activeSection,
  scrollToSection,
  detailInfoRef,
  reviewRef,
  recommendRef,
}) {
  return (
    <nav
      aria-label="상품 상세 네비게이션"
      className="sticky top-0 z-10 mb-[100px] flex h-[64px] w-full flex-row justify-center border-b-2 border-t-2 border-primary bg-white"
    >
      <ul className="flex h-[62px] w-[800px] flex-row justify-between text-16 font-semibold text-tertiary">
        <li>
          <button
            onClick={() => console.log(scrollToSection(detailInfoRef))}
            className={`flex h-[64px] w-[200px] items-center justify-center hover:text-primary ${
              activeSection === "detailInfo" ? "font-bold text-primary" : ""
            }`}
          >
            상세 정보
          </button>
        </li>
        <li>
          <button
            onClick={() => console.log("clicked")}
            className={`flex h-[64px] w-[200px] items-center justify-center hover:text-primary ${
              activeSection === "exchangeReturnInfo"
                ? "font-bold text-primary"
                : ""
            }`}
          >
            교환 및 반품 안내
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection(reviewRef)}
            className={`flex h-[64px] w-[200px] items-center justify-center hover:text-primary ${
              activeSection === "review" ? "font-bold text-primary" : ""
            }`}
          >
            REVIEW
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection(recommendRef)}
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
  );
}

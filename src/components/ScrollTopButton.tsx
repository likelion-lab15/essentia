"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 이벤트 핸들러
  const toggleVisibility = () => {
    // 100px 이상 스크롤 시 버튼 표시
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 상단으로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드러운 스크롤
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed right-[50px]
            top-[700px] h-[48px] w-[48px] rounded-full bg-primary"
        >
          <Image
            src="/scroll-top.svg"
            alt="스크롤탑 버튼 이미지"
            width={16}
            height={20}
            className="ml-[16px]"
          />
        </button>
      )}
    </>
  );
}

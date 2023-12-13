"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  ProductInfo,
  DetailNavigation,
  Review,
  RecommendedProductsSection,
  DetailImage,
} from "@/app/productdetail/_sections/_index";

export default function ProductDetail() {
  const [activeSection, setActiveSection] = useState("");
  const detailInfoRef = useRef(null);
  const reviewRef = useRef(null);
  const recommendRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const checkActiveSection = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    const refs = {
      detailInfo: detailInfoRef,
      review: reviewRef,
    };

    for (const section in refs) {
      const ref = refs[section];
      if (ref.current) {
        const offsetTop = ref.current.offsetTop;
        const offsetBottom = offsetTop + ref.current.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition <= offsetBottom) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkActiveSection);
    return () => {
      window.removeEventListener("scroll", checkActiveSection);
    };
  }, []);

  return (
    <>
      <main className="flex flex-col items-center">
        <ProductInfo />
        <DetailNavigation
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          detailInfoRef={detailInfoRef}
          reviewRef={reviewRef}
          recommendRef={recommendRef}
        />
        <DetailImage ref={detailInfoRef} />
        <div className="mb-[100px] h-0 w-full border-b-2 border-primary"></div>
        <div className="flex h-[1450px] w-[1280px] flex-col items-center">
          <Review ref={reviewRef} />
          <RecommendedProductsSection ref={recommendRef} />
        </div>
      </main>
    </>
  );
}

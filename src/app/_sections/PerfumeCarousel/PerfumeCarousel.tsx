"use client";

import { useRouter } from "next/navigation";
import PerfumeCarouselSwiper from "./_components/PerfumeCarouselSwiper";

export default function PerfumeCarousel() {
  const router = useRouter();

  return (
    <section className="mb-[80px] mt-[80px] flex h-[800px] w-full flex-col">
      {/* 1. 섹션 제목 */}
      <div className="ml-[200px]">
        <p className="font-gmarket mb-[24px] cursor-default text-[60px]">
          가을에 어울리는 향수 기획전
        </p>
        <p className="mb-[40px] cursor-default text-[18px] font-medium">
          찬바람 불기 시작할 때! 가을향수 구매타이밍은 지금!
        </p>
        <button
          type="button"
          className="mb-[80px] w-[150px] border-2 border-primary px-[24px] py-[12px] hover:bg-secondary"
          onClick={() => router.push("/products")}
        >
          View All
        </button>
      </div>
      {/* 2. 스와이퍼 */}
      <PerfumeCarouselSwiper />
    </section>
  );
}

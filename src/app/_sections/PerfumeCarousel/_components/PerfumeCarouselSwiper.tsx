/* eslint-disable @next/next/no-img-element */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useState, useEffect } from "react";
import axios from "@/api/axios";

import "swiper/css";
import "swiper/css/pagination";

type TSlide = {
  price: number;
  extra: {
    brand: string;
    amount: number[];
  };
  mainImages: {
    path: string;
    originalname: string;
  }[];
};

export default function PerfumeCarouselSwiper() {
  const [perfumeList, setPerfumeList] = useState<TSlide[]>([]);

  useEffect(() => {
    const getPerfumeList = async () => {
      try {
        const res = await axios.get("products");
        const slicedData = res.data.item.slice(0, 10);
        setPerfumeList(slicedData);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    };
    getPerfumeList();
  }, []);

  return (
    <>
      {/* 스와이퍼 */}
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper h-full w-full"
      >
        {/* 스와이퍼 슬라이드 */}
        {perfumeList.map((slide, index) => {
          const { price, extra, mainImages } = slide;
          return (
            <SwiperSlide key={index}>
              <div className="box-border w-[230px] border-2 border-r-0 border-[#222] last:border-r-2">
                <div className="w-full] mb-[40px] h-[230px]">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_SERVER}${mainImages[0].path}`}
                    alt={mainImages[0].originalname}
                  />
                </div>
                <div className="mb-[12px] flex flex-col items-start px-[17px]">
                  <p className="mb-[5px] text-[14px] font-bold">
                    {extra.brand}
                  </p>
                  <p className="mb-[5px] text-[16px] font-medium">
                    용량: {`${extra.amount[0]}ml / ${extra.amount[1]}ml`}
                  </p>
                  <p className="mb-[12px] text-[14px] font-medium">
                    {price.toLocaleString("ko-kr")} 원
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

"use client";

import Image from "next/image";
import { Button } from "@/components/_index";
import { useOutsideClick } from "@/hooks/_index";
import { useEffect, useState, useRef } from "react";
import axios from "@/api/axios";

export default function ProductInfo() {
  // 향수 정보 상태 관리
  const [product, setProduct] = useState({
    name: "",
    price: "",
    brand: "",
    amount: [],
    content: "",
    image: "",
  });
  // 사이즈 드롭다운박스 제목 상태 관리
  const [selectedSize, setSelectedSize] = useState("사이즈를 선택해주세요");
  // 사이즈 드롭다운박스 리스트 상태 관리
  const [amountView, setAmountView] = useState(false);
  // useRef를 이용하여 외부 클릭 감지
  const wrapperRef = useRef<HTMLDivElement>(null);
  // 외부 클릭 시 드롭다운박스 닫기
  useOutsideClick(wrapperRef, () => setAmountView(false));
  // 사이즈 선택 시 드롭다운박스 제목 변경 함수
  const handleSizeSelection = (size: number) => {
    setSelectedSize(size + "ml");
    setAmountView(false);
  };

  // 향수 정보 가져오기
  useEffect(() => {
    async function getProductInfo() {
      try {
        // 상품 id 1로 임시 고정
        const _id = 1;
        const response = await axios.get(`/products/${_id}`);
        const result = response.data.item;
        return result;
      } catch (error) {
        console.error("Axios Error 🥲", error);
        return [];
      }
    }

    getProductInfo().then((result) => {
      setProduct({
        name: result.name,
        price: result.price,
        brand: result.extra.brand,
        amount: result.extra.amount,
        content: result.content,
        image: result.mainImages[0].url,
      });
    });
  }, []);

  console.log(product.image);

  return (
    <section className="flex h-[660px] w-[1280px] items-center justify-center ">
      {/* 상품 구매 + 판매 SECTION */}
      <div className="flex h-[560px] w-full flex-row items-center justify-between pl-[60px] pr-[60px]">
        {/* 향수 이미지 */}
        <div className="flex h-[560px] w-[560px] flex-col items-center justify-center">
          <Image
            alt="blanche"
            // src="/blanche.webp"
            src={`https://localhost:443${product.image}`}
            width={450}
            height={450}
            className="bg-[#F4F4F4]"
          ></Image>
        </div>
        {/* 사용자 상호작용 */}
        <div className="h-[444] w-[560px]">
          <p className="mb-[15px] h-[32px] w-[560px] border-b border-primary text-22 font-bold">
            {product.brand}
          </p>
          <p className="text-30 font-medium">{product.name}</p>
          <div className="flex-rowtext-16 mb-[34px] flex font-medium text-tertiary">
            {product.amount.map((amount, index) => (
              <p className=" pr-[10px]" key={index}>
                {amount}ml
              </p>
            ))}
          </div>
          <p className="mb-[18px] w-[560px] text-14 font-medium text-tertiary">
            {product.content}
          </p>
          <div className="mb-[15px] flex w-[560px] flex-row items-baseline justify-end">
            <p className="mr-[14px] text-16 font-medium">발매가</p>
            <p className="text-28 font-bold">
              {product.price.toLocaleString()} 원
            </p>
          </div>

          {/* 드롭다운 박스 */}
          <div ref={wrapperRef} className="mb-[16px] h-[46px] w-[560px]">
            <div>
              <button
                onClick={() => {
                  setAmountView(!amountView);
                }}
                className="h-[46px] w-[560px] border border-primary bg-white pl-[20px] text-left font-medium text-primary hover:bg-secondary"
              >
                {selectedSize}
              </button>
            </div>
            {amountView && (
              <ul className="relative w-[560px] border-primary">
                {product.amount.map((amount) => (
                  <li
                    className="relative mt-[-1px] h-[46px] w-[560px] cursor-pointer border border-primary bg-white  text-primary hover:bg-secondary"
                    key={amount}
                    onClick={() => handleSizeSelection(amount)}
                  >
                    <p className="pl-[20px] text-left leading-[46px]">
                      {amount}ml
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* 버튼 박스 */}
          <div className="mb-[16px] flex w-[560px]">
            <Button
              className="mr-[10px] h-[46px] w-[275px] border border-primary bg-white text-primary"
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
  );
}

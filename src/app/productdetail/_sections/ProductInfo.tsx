"use client";

import Image from "next/image";
import { Button } from "@/components/_index";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductInfo() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    brand: "",
    amount: [],
    content: "",
    image: "",
  });

  const [selectedSize, setSelectedSize] = useState("사이즈를 선택해주세요");
  const [amountView, setAmountView] = useState(false);

  const handleSizeSelection = (size) => {
    setSelectedSize(size + "ml");
    setAmountView(false);
  };

  const setView = (event) => {
    setSelectedSize(event.target.value);
  };

  async function getProductInfo() {
    try {
      const _id = 1;
      const response = await axios.get(`https://localhost/api/products/${_id}`);
      const result = response.data;
      console.log("response.data", result.item);
      setProduct({
        name: result.item.name,
        price: result.item.price,
        brand: result.item.extra.brand,
        amount: result.item.extra.amount,
        content: result.item.content,
        image: result.item.mainImages[0].url,
      });
      console.log(result.item.mainImages[0].url);
      return result.item;
    } catch (error) {
      console.error("Error 🥲", error);
      return [];
    }
  }

  useEffect(() => {
    getProductInfo();
  }, []);

  return (
    <section className="flex h-[660px] w-[1280px] items-center justify-center ">
      {/* 상품 구매 + 판매 SECTION */}
      <div className="flex h-[560px] w-full flex-row items-center justify-between pl-[60px] pr-[60px]">
        {/* 향수 이미지 */}
        <div className="flex h-[560px] w-[560px] flex-col items-center justify-center">
          <Image
            alt="blanche"
            src="/blanche.webp"
            // src={product.image}
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
            <p className="mr-[14px] text-14 font-medium">50ml</p>
            <p className="text-28 font-bold">{product.price}원</p>
          </div>

          {/* 드롭다운 박스 */}
          <div className="mb-[16px] h-[46px] w-[560px]">
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

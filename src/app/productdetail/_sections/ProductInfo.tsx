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
    amount: "",
    detail: "",
  });

  async function getProductInfo() {
    try {
      const _id = 3;
      const response = await axios.get(`https://localhost/api/products/${_id}`);
      const result = response.data;
      console.log("response.data", result.item);
      setProduct({
        name: result.item.name,
        price: result.item.price,
        brand: result.item.extra.brand,
        amount: result.item.extra.amount,
        detail: result.item.extra.detail,
      });
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
            alt="santal33"
            src="/santal33.png"
            width={450}
            height={450}
          ></Image>
        </div>
        {/* 사용자 상호작용 */}
        <div className="h-[444] w-[560px]">
          <p className="mb-[15px] h-[32px] w-[560px] border-b border-primary text-22 font-bold">
            {product.brand}
          </p>
          <p className="text-30 font-medium">{product.name}</p>
          <p className="mb-[34px] text-16 font-medium text-tertiary">
            50ml 100ml
          </p>
          <p className="mb-[18px] w-[560px] text-14 font-medium text-tertiary">
            {product.detail}
          </p>
          <div className="mb-[15px] flex w-[560px] flex-row items-baseline justify-end">
            <p className="mr-[14px] text-14 font-medium">50ml</p>
            <p className="text-28 font-bold">{product.price}원</p>
          </div>

          <div className="mb-[16px] h-[46px] w-[560px] border">
            drop down box
          </div>
          {/* 버튼 박스 */}
          <div className="mb-[16px] flex w-[560px] justify-between">
            <Button
              className="h-[46px] w-[275px] border border-primary bg-white text-primary"
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

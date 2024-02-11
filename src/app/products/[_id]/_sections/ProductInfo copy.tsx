/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/_index";
import { useOutsideClick } from "@/hooks/_index";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios, { axiosPrivate } from "@/api/axios";
import { useProductStore } from "@/stores/useProductStore";
import { useUserStore } from "@/stores/useUserStore";

export default function ProductInfo({ id }: { id: string }) {
  // 향수 정보 전역으로 상태 관리
  const { product, setProduct } = useProductStore();
  const { user } = useUserStore();
  const productId = Number(id);
  const userId = user?._id;

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

  useEffect(() => {
    async function getProductInfo() {
      try {
        const response = await axios.get(`/products/${id}`);
        const result = response.data.item;
        console.log(result);

        const product = {
          name: result.name,
          price: result.price,
          brand: result.extra.brand,
          amount: result.extra.amount,
          content: result.content,
          image: result.mainImages[0].path,
        };

        setProduct(product); // Zustand 스토어에 상품 정보 저장

        return result;
      } catch (error) {
        console.error("향수 정보 Axios Error 🥲", error);
        return [];
      }
    }

    getProductInfo();
  }, [id, setProduct]);

  /* 라우터 설정을 위한 useRouter 사용 */
  const router = useRouter();

  /* 구매 선택 페이지로 이동시키는 함수 */
  const navigateToBuyPage = () => {
    if (selectedSize === "사이즈를 선택해주세요") {
      alert("사이즈를 선택해주세요.");
    } else {
      router.push(`/products/${id}/buy/?&amount=${selectedSize}`);
    }
  };

  /* 판매 페이지로 이동시키는 함수 */
  // brand, name, amount, id를 쿼리스트링으로 넘겨줌
  const navigateToSellPage = () => {
    if (selectedSize === "사이즈를 선택해주세요") {
      alert("사이즈를 선택해주세요.");
    } else {
      router.push(`/products/${id}/sell/?&amount=${selectedSize}`);
    }
  };

  const addWishList = async () => {
    try {
      const response = await axiosPrivate.post("/bookmarks", {
        product_id: productId,
        user_id: userId,
        memo: "test",
      });
      console.log("위시리스트 POST 통신 성공", response.data);
      alert("상품이 위시리스트에 추가되었습니다.");
    } catch (error) {
      console.error("위시리스트 POST 통신 에러 발생", error);
    }
  };

  return (
    <section className="flex h-[660px] w-[1280px] items-center justify-center ">
      {/* 상품 구매 + 판매 SECTION */}
      <div className="flex h-[560px] w-full flex-row items-center justify-between pl-[60px] pr-[60px]">
        {/* 향수 이미지 */}
        <div className="flex h-[560px] w-[560px] flex-col items-center justify-center">
          <img
            alt="향수 이미지"
            src={`${process.env.NEXT_PUBLIC_API_SERVER}${product.image}`}
            width={450}
            height={450}
            className="bg-product"
          ></img>
        </div>
        {/* 사용자 상호작용 */}
        <div className="h-[444] w-[560px]">
          <p className="mb-[15px] h-[32px] w-[560px] border-b border-primary text-22 font-bold">
            {product.brand}
          </p>
          <p className="text-30 font-medium">{product.name}</p>
          <div className="flex-rowtext-16 mb-[34px] flex font-medium text-tertiary">
            {product.amount &&
              product.amount.map((amount, index) => (
                <p className=" pr-[10px]" key={index}>
                  {amount}ml
                </p>
              ))}
          </div>
          <p className="mb-[18px] w-[560px] text-14 font-medium text-tertiary">
            {product.content}
          </p>
          <div className="mb-[15px] flex w-[560px] flex-row items-baseline justify-end">
            <p className="mr-[8px] text-18 font-semibold text-accent">발매가</p>
            <p className="text-28 font-bold">
              {product.price.toLocaleString()}원
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
              onClick={navigateToBuyPage}
            ></Button>
            <Button
              className="h-[46px] w-[275px]"
              label="판매하기"
              type="button"
              onClick={navigateToSellPage}
            ></Button>
          </div>
          <Button
            className="h-[46px] w-[560px] border border-primary bg-white text-primary"
            label="위시 리스트에 추가하기"
            type="button"
            onClick={() => addWishList()}
          ></Button>
        </div>
      </div>
    </section>
  );
}

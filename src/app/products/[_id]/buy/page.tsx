"use client";
import Image from "next/image";
import { Button } from "@/components/_index";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "@/api/axios";

export default function Buy(props: any) {
  const getId = props.params._id;
  const searchParams = useSearchParams();
  const getBrand = searchParams.get("brand");
  const getAmount = searchParams.get("amount");
  const getName = searchParams.get("name");
  const getPriceOrigin = parseFloat(searchParams.get("price"));
  const getPrice = getPriceOrigin.toLocaleString();

  console.log(getId, getBrand, getName, getAmount, getPriceOrigin, getPrice);

  // 상태 추가
  const [items, setItems] = useState([]);

  const renderItems = items.filter((item) => item.extra.amount === getAmount);

  // API 호출 및 데이터 가져오기
  async function buyInfo() {
    try {
      console.log("buyInfo Id: ", getId);
      const response = await axios.get(`/products/${getId}`);
      const result = response.data.item.options.item;
      console.log(`result`, result);
      setItems(result); // 상태 업데이트
      return result;
    } catch (error) {
      console.error("axios Error 🥲", error);
      return [];
    }
  }

  // 컴포넌트 마운트 시 API 호출
  useEffect(() => {
    buyInfo();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      {/* 페이지 제목 */}
      <h2 className="flex h-[100px] w-[1280px] items-center justify-center pt-[50px] text-36 font-bold text-primary">
        구매하기
      </h2>
      <div>
        {/* 구매할 상품 정보 */}
        <div className="mb-[25px] flex h-[300px] w-[800px] items-center justify-center border-b-2 border-tertiary">
          {/* 이미지 */}
          <Image
            src="/blanche.webp"
            width={200}
            height={200}
            alt="상품 이미지"
            className="border-2 border-primary bg-[#F4F4F4]"
          ></Image>
          {/* 상품 정보 */}
          <div className="ml-[40px] flex h-[200px] w-[500px] flex-col justify-between">
            <div>
              <p className="border-b-2 border-primary text-22 font-bold">
                {getBrand}
              </p>
              <p className=" text-30 font-medium">{getName}</p>
            </div>
            <p className="flex flex-row text-22 font-medium">{getAmount}</p>
            <div className="flex flex-row justify-between">
              <div className="flex w-[200px] flex-row items-baseline justify-start text-tertiary">
                <p className="mr-[10px] text-16 font-medium">발매가</p>
                <p className="text-28 font-bold">
                  {getPrice.toLocaleString()}원
                </p>
              </div>
              <div className="flex w-[200px] flex-row items-baseline justify-end">
                <p className="mr-[10px] text-16 font-medium">최저가</p>
                <p className="text-28 font-bold">120,000원</p>
              </div>
            </div>
          </div>
        </div>
        {/* 판매등록된 상품 리스트 */}
        <div className="mb-[25px] flex w-[800px] flex-row flex-wrap pl-[25px] pr-[25px] text-18">
          {renderItems.map((item, index) => (
            <div
              key={index}
              className="flex w-[800px] flex-row justify-between"
            >
              <div className="flex h-[60px] w-[600px] border-2 bg-white text-primary hover:bg-secondary">
                <p className="flex h-[60px] flex-1 items-center justify-center">
                  남은용량 : {item.extra.restamount}
                </p>
                <p className="flex h-[60px] flex-1 items-center justify-center">
                  판매금액 : {item.price}
                </p>
                <p className="flex h-[60px] flex-1 items-center justify-center">
                  구매일자 : {item.extra.date}
                </p>
              </div>
              <Button
                className="h-[60px] w-[120px] border-2 border-primary bg-secondary text-primary hover:bg-primary hover:text-secondary"
                label="구매하기"
                type="button"
              />
            </div>
          ))}
        </div>
        {/* 뒤로가기 버튼 */}
        <div className="flex h-[100px] w-[800px] items-center justify-center">
          <Button label="뒤로가기" type="button" />
        </div>
      </div>
    </div>
  );
}

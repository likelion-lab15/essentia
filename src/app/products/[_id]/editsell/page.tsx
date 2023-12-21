/* eslint-disable @next/next/no-img-element */
"use client";

import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { axiosPrivate } from "@/api/axios";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/_index";
import { useRouter } from "next/navigation";

type TParams = {
  _id: number;
};

export default function EditSell({ params }: { params: TParams }) {
  const [name, setName] = useState("");
  const [mainImage, setMainImage] = useState({
    path: "",
    orginalname: "",
    file: "",
  });
  const [restAmount, setRestAmount] = useState("");
  const [price, setPrice] = useState("");
  const [extra, setExtra] = useState({});

  const router = useRouter();

  useEffect(() => {
    getProductData(params._id);
  }, []);

  // 상품 데이터 불러오기
  const getProductData = async (id: number) => {
    try {
      const res = await axiosPrivate(`/seller/products/${id}`);
      const { name, price, mainImages, extra } = res.data.item;
      setMainImage(mainImages?.[0]);
      setName(name);
      setExtra(extra);
      setRestAmount(extra.restamount);
      setPrice(price);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const handleInputChange =
    (setter: Dispatch<SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleClick = (id: number) => {
    const newData = {
      price: Number(price),
      extra: {
        ...extra,
        restamount: Number(restAmount),
      },
    };

    try {
      axiosPrivate.patch(`/seller/products/${id}`, newData);
      alert("수정을 성공했습니다!");
      router.push("/mypage/history/sellhistory");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        alert("수정을 실패했습니다!");
      }
    }
  };

  return (
    <section className="mx-auto w-[680px]">
      {/* 1. 제목 */}
      <div className="flex h-[64px] items-center border-b-[3px] border-black">
        <span className="text-[20px] font-bold">상품 수정</span>
      </div>
      <div className="flex p-[25px]">
        <div className="mr-[20px] h-[100px] w-[100px]">
          <img
            src={`${process.env.NEXT_PUBLIC_IMG}${mainImage.path}`}
            alt={mainImage.orginalname}
            width="100%"
            height="100%"
          />
        </div>

        <div>
          <p className="text-[20px] font-bold">{name}</p>

          <div>
            <label htmlFor="price" className="sr-only"></label>
            <input
              type="text"
              id="price"
              name="price"
              className="w-[]"
              value={price}
              onChange={handleInputChange(setPrice)}
            />
            <span>원</span>
          </div>
          <div>
            <label htmlFor="restamount" className="sr-only"></label>
            <input
              type="text"
              id="restamount"
              name="restamount"
              value={restAmount}
              onChange={handleInputChange(setRestAmount)}
            />
            <span>ml</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          label="수정하기"
          type="button"
          onClick={() => handleClick(params._id)}
        />
      </div>
    </section>
  );
}

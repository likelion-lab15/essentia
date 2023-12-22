/* eslint-disable @next/next/no-img-element */
"use client";

import { axiosPrivate, axiosForm } from "@/api/axios";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useProductStore } from "@/stores/useProductStore";

type TItem = {
  name: string;
  price: string;
  content: string;
  mainImages: { path: string; name: string; originalname: string }[];
  shippingFees: number;
  show: boolean;
  active: boolean;
  quantity: number;
  buyQuantity: number;
  extra: {
    depth: number;
    restamount: string;
    date: string;
    brand: string;
    parent: number;
    amount: number;
  };
};

export default function Sell(props: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { product } = useProductStore();
  const [item, setItem] = useState<TItem>({
    name: product.name,
    price: "",
    content: "",
    mainImages: [],
    shippingFees: 0,
    show: true,
    active: true,
    quantity: 200,
    buyQuantity: 198,
    extra: {
      depth: 2,
      restamount: "",
      date: "",
      brand: product.brand,
      parent: parseInt(props.params._id),
      amount: parseInt(searchParams.get("amount") || "0"),
    },
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // 입력 값이 변경될 때 호출되는 함수
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // 'extra' 필드 내부의 값을 업데이트할 필요가 있는 경우
    if (["restamount", "date", "amount"].includes(name)) {
      setItem((prevItem) => ({
        ...prevItem,
        extra: {
          ...prevItem.extra,
          [name]: value,
        },
      }));
    } else {
      // 그 외의 경우, 직접 item 상태에 값을 업데이트
      setItem((prevItem) => ({
        ...prevItem,
        [name]: value,
      }));
    }
  };

  // 파일 업로드 처리 함수
  const uploadFiles = async (files: any) => {
    const formData = new FormData();
    // 파일들을 FormData에 추가
    files.forEach((file: any) => formData.append("attach", file));

    try {
      // 파일을 서버로 전송하고, 업로드된 파일의 경로를 반환 받음
      const response = await axiosForm.post("/files/", formData);
      // 서버 응답에서 파일 경로를 추출하고, 배열로 반환 -> 이미지 파일 최대 10개 등록가능
      return response.data.files.map((file: any) => `${file.path}`);
    } catch (error) {
      console.error("파일 업로드 오류", error);
      return [];
    }
  };

  // 파일 선택 시, 업로드 함수 호출 및 mainImages 상태 업데이트
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // 최대 10개 파일 업로드로 제한
      const files = Array.from(e.target.files).slice(0, 10);
      // 파일 업로드 함수 호출
      const uploadedPaths = await uploadFiles(files);
      // mainImages 상태 업데이트
      setItem({
        ...item,
        mainImages: uploadedPaths.map((path: string, index: number) => ({
          path: path,
          name: files[index].name,
          originalname: files[index].name,
        })),
      });
      // 각 파일에 대한 미리보기 URL 생성
      const previewUrls = files.map((file) => URL.createObjectURL(file));
      // 미리보기 URL들을 상태에 저장
      setPreviewImages(previewUrls);
    }
  };

  // 상품 등록 제출 요청
  const sendPostRequest = async () => {
    try {
      // 유효성 검사
      if (item.content.length < 10) {
        alert("상품 설명은 10글자 이상 입력해야 합니다.");
        return;
      }

      console.log("서버에서의 대답", item);
      // 서버로 보내기 전에 콘솔 확인 (디버깅)

      // 서버에 상품 정보를 POST 요청
      const response = await axiosPrivate.post("/seller/products/", item);
      console.log(response); // 서버 응답 로그 출력 (디버깅)
      alert("판매 등록이 성공적으로 완료되었습니다.");
      router.push("/products");
    } catch (error) {
      console.error("Error 🥲", error);
    }
  };

  // 폼 제출 이벤트를 처리하는 함수
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendPostRequest();
  };

  return (
    <>
      <section className="mb-[100px] flex flex-col items-center">
        <div className="flex h-[180px] items-center justify-center">
          <h2 className="w-[900px] text-center text-36 font-bold">
            판매 상품 등록
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="w-[1200px]">
          <div className="mt-[50px] h-[138px] border-b-[1px] border-tertiary">
            <label htmlFor="name" className="mr-[100px] text-18 font-bold">
              브랜드
            </label>
            <span className="inline-block w-[745px] border-b-[5px] border-primary text-32 font-semibold">
              {item.extra.brand}
            </span>
          </div>
          <div className="mt-[50px] h-[138px] border-b-[1px] border-tertiary pb-[50px]">
            <label htmlFor="name" className="mr-[100px] text-18 font-bold">
              상품명
            </label>
            <span className="inline-block w-[745px] border-b-[5px] border-primary text-32 font-semibold">
              {item.name}
            </span>
          </div>
          <div className="h-[280px] border-b-[1px] border-tertiary pt-[50px]">
            <label htmlFor="file" className="mr-[100px] text-18 font-bold">
              상품이미지
            </label>
            <input
              type="file"
              name="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            <div className="ml-[160px] mt-[40px] flex flex-row">
              {previewImages.map((image, index) => (
                <img
                  key={index}
                  src={`${process.env.NEXT_PUBLIC_API_SERVER}${image}`}
                  alt={`Preview ${index + 1}`}
                  style={{
                    width: "120px",
                    height: "120px",
                    marginRight: "10px",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex h-[195px] gap-[50px] border-b-[1px] border-tertiary pt-[50px]">
            <p>
              <label htmlFor="restamount" className="text-18 font-bold">
                용량
              </label>
              <span className="mt-[20px] inline-block w-[250px] border-b-[2px] border-primary font-bold">
                {item.extra.amount} ml
              </span>
            </p>
            <p>
              <label htmlFor="restamount" className="text-18 font-bold">
                남은 용량
              </label>
              <input
                type="number"
                name="restamount"
                placeholder="ml"
                value={item.extra.restamount}
                onChange={handleChange}
                className="mt-[20px] w-[250px] border-b-[2px] border-primary"
              />
            </p>
            <p>
              <label htmlFor="price" className="text-18 font-bold">
                가격
              </label>
              <input
                type="number"
                name="price"
                placeholder="원"
                value={item.price}
                onChange={handleChange}
                className="mt-[20px] w-[250px] border-b-[2px] border-primary"
              />
            </p>
            <p>
              <label htmlFor="date" className="mr-[100px] text-18 font-bold">
                구매 일시
              </label>
              <input
                type="text"
                name="date"
                placeholder="예) 20220707"
                value={item.extra.date}
                onChange={handleChange}
                className="mt-[20px] w-[250px] border-b-[2px] border-primary"
              />
            </p>
          </div>
          <div className="relative h-[320px] border-b-[1px] border-tertiary pt-[50px]">
            <label
              htmlFor="content"
              className="absolute top-[50px] text-18 font-bold"
            >
              설명
            </label>
            <textarea
              name="content"
              id="text"
              cols={100}
              rows={8}
              placeholder="제품의 상태 (사용감, 하자 유무) 등을 입력해 주세요."
              value={item.content}
              onChange={handleChange}
              className="absolute left-[100px] border-[1px] border-tertiary pl-[16px] pt-[16px]"
            ></textarea>
          </div>
          <div className="mt-[90px] flex h-[195px] flex-row justify-center gap-[16px]">
            <button className="h-[48px] w-[322px] bg-primary text-white">
              등록하기
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

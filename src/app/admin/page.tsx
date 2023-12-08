"use client";
import Header from "@/components/Header";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Admin() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    content: "",
    mainImages: [],
    shippingFees: 0,
    show: true,
    active: true,
    quantity: 200,
    buyQuantity: 198,
    extra: { depth: 1, amount: "" },
  });

  // 입력 값이 변경될 때 호출되는 함수
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // 가격 및 배송비는 숫자로 변환하여 상태 업데이트
    if (name === "price" || name === "shippingFees") {
      const intValue = value ? parseInt(value, 10) : 0;
      setProduct({ ...product, [name]: intValue });
    } else if (name === "amount") {
      setProduct({ ...product, extra: { ...product.extra, amount: value } });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  // 파일 업로드 처리 함수
  const uploadFiles = async (files: any) => {
    const formData = new FormData();
    // 파일들을 FormData에 추가
    files.forEach((file: any) => formData.append("attach", file));

    try {
      // 파일을 서버로 전송하고, 업로드된 파일의 경로를 반환 받음
      const response = await axios.post(
        "https://localhost/api/files/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // 서버 응답에서 파일 경로를 추출하고, 배열로 반환 -> 이미지 파일 1개만 등록가능
      if (response.data.ok && response.data.file) {
        return [response.data.file.path];
      } else {
        console.error("문제가있다아아아", response);
        return [];
      }
    } catch (error) {
      console.error("파일 업로드 오류", error);
      return [];
    }
  };

  // 파일 선택 시, 업로드 함수 호출 및 mainImages 상태 업데이트
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // 단일 파일 업로드로 제한하기 위해 첫 번째 파일만 사용
      const uploadedPaths = await uploadFiles([e.target.files[0]]);
      // mainImages 상태 업데이트
      setProduct({ ...product, mainImages: uploadedPaths });
    }
  };

  // mainImages 상태 업데잍 를 콘솔에 출력 (디버깅)
  useEffect(() => {
    console.log(product.mainImages);
  }, [product.mainImages]);

  // 상품 등록 제출 요청
  const sendPostRequest = async () => {
    try {
      // 유효성 검사
      if (product.name.length < 2) {
        alert("상품명은 2글자 이상 입력해야 합니다.");
        return;
      }
      if (product.content.length < 10) {
        alert("상품 설명은 10글자 이상 입력해야 합니다.");
        return;
      }

      console.log("서버에서의 대답", product); // 서버로 보내기 전에 콘솔 확인 (디버깅)

      // localStorage에서 인증 토큰(accessToken)을 가져와서 요청 헤더에 포함
      const userDataString = localStorage.getItem("user");
      const accessToken = userDataString
        ? JSON.parse(userDataString).token.accessToken
        : null;
      // 서버에 상품 정보를 POST 요청
      const response = await axios.post(
        "https://localhost/api/seller/products/",
        product,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response); // 서버 응답 로그 출력 (디버깅)
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
      <Header />
      <section className="flex flex-col items-center">
        <div className="flex h-[180px] items-center justify-center">
          <h2 className="w-[900px] text-center text-36 font-bold">
            판매 상품 등록
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="w-[1200px]">
          <div className="h-[138px] border-b-[1px] border-tertiary">
            <label htmlFor="name" className="mr-[100px] text-18 font-bold">
              상품명
            </label>
            <input
              type="text"
              name="name"
              placeholder="제품명"
              value={product.name}
              onChange={handleChange}
              className="w-[745px] border-b-[5px] border-primary"
            />
          </div>
          <div className="h-[138px] border-b-[1px] border-tertiary pt-[50px]">
            <label htmlFor="amount" className="mr-[100px] text-18 font-bold">
              향수 용량
            </label>
            <select
              name="amount"
              id="amount"
              className="w-[300px]"
              onChange={handleChange}
            >
              <option value="50ml">50ml</option>
              <option value="100ml">100ml</option>
            </select>
          </div>
          <div className="h-[280px] border-b-[1px] border-tertiary pt-[50px]">
            <label htmlFor="file" className="mr-[100px] text-18 font-bold">
              상품이미지
            </label>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {/* {Array.from(files).map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`file-${index}`}
                style={{ width: "100px", height: "100px", marginRight: "10px" }}
              />
            ))} */}
          </div>
          <div className="h-[195px] border-b-[1px] border-tertiary pt-[50px]">
            <label htmlFor="price" className="mr-[100px] text-18 font-bold">
              가격
            </label>
            <input
              type="number"
              name="price"
              placeholder="원"
              value={product.price}
              onChange={handleChange}
              className="mr-[270px] w-[250px] border-b-[2px] border-primary"
            />
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
              placeholder="상품 상세 설명을 입력해주세요."
              value={product.content}
              onChange={handleChange}
              className="absolute left-[100px] border-[1px] border-tertiary pl-[16px] pt-[16px]"
            ></textarea>
          </div>
          <div className="mt-[90px] flex h-[195px] flex-row justify-center gap-[16px]">
            <button className="h-[48px] w-[322px] border-[1px] border-primary">
              임시저장
            </button>
            <button className="h-[48px] w-[322px] bg-primary text-white">
              등록하기
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

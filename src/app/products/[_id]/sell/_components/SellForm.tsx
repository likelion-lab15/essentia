/* eslint-disable @next/next/no-img-element */
"use client";
import { INITIAL_STATE, useSellFormReducer } from "@/hooks/useSellFormReducer";
import React, { useReducer } from "react";
import { uploadFiles } from "../_lib/fileUploader";
import useClientSession from "@/hooks/useClientSession";
import { useRouter } from "next/navigation";

export default function SellForm({ amount, fixedPrice, id, name }: any) {
  const initialState = {
    ...INITIAL_STATE,
    name,
    amount,
    extra: {
      ...INITIAL_STATE.extra,
      amount: parseInt(amount),
      parent: parseInt(id),
    },
    fixedPrice,
  };

  const { getAccessToken } = useClientSession();
  const token = getAccessToken();
  const router = useRouter();
  const [state, dispatch] = useReducer(useSellFormReducer, initialState);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 10);
      const uploadedPaths = await uploadFiles(files);
      // 각 파일에 대한 미리보기 URL 생성
      const previewUrls = files.map((file) => URL.createObjectURL(file));
      dispatch({
        type: "UPLOAD_IMAGE",
        payload: {
          uploadedPaths: uploadedPaths.map((path: string, index: number) => ({
            path,
            name: files[index].name,
            originalname: files[index].name,
          })),
          previewUrls,
        },
      });
    }
  };

  const handleRestamountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isNumberInput = e.target.type === "number";
    const restamountValue = isNumberInput ? parseInt(value, 10) : value;
    dispatch({
      type: "VALIDATE_RESTAMOUNT",
      payload: { value: restamountValue },
    });
    dispatch({
      type: "CHANGE_INPUT",
      payload: {
        name,
        value: restamountValue,
      },
    });
  };

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const isNumberInput = e.target.type === "number";
    const priceValue = isNumberInput ? parseInt(value, 10) : value;
    dispatch({
      type: "VALIDATE_PRICE",
      payload: { value: priceValue },
    });
    dispatch({
      type: "CHANGE_INPUT",
      payload: {
        name,
        value: priceValue,
      },
    });
  };

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch({ type: "VALIDATE_DATE", payload: value });
    dispatch({
      type: "CHANGE_INPUT",
      payload: {
        name,
        value,
      },
    });
  };

  const handleContentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch({
      type: "VALIDATE_CONTENT",
      payload: { value },
    });
    dispatch({
      type: "CHANGE_INPUT",
      payload: {
        name,
        value,
      },
    });
  };

  /* form 제출 함수 */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}/seller/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(state),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("상품이 등록되었습니다.", responseData);
        alert("상품이 등록되었습니다.");
        router.push("/mypage/history/sellhistory");
      } else {
        alert("상품 등록에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error 🥲", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 상품 이미지 */}
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
          {state.previewImages.map((image: string, index: number) => (
            <img
              key={index}
              src={image}
              alt={`미리보기 ${index + 1}`}
              style={{
                width: "120px",
                height: "120px",
                marginRight: "10px",
              }}
            />
          ))}
        </div>
      </div>
      {/* 남은 용량 */}
      <div className="pt-[50px]">
        <label htmlFor="restamount" className="text-18 font-bold">
          남은 용량
        </label>
        <input
          type="number"
          name="restamount"
          placeholder="ml"
          value={state.extra.restamount}
          onChange={handleRestamountChange}
          className="ml-[35px] mt-[20px] w-[250px] border-b-[2px] border-primary"
        />
        {state.errorMessages.restamount !== null && (
          <div
            aria-live="polite"
            className="ml-[100px] flex h-[30px] w-full items-center text-warning"
          >
            {state.errorMessages.restamount}
          </div>
        )}
      </div>
      {/* 가격 */}
      <div className="pt-[30px]">
        <label htmlFor="price" className="text-18 font-bold">
          가격
        </label>
        <input
          type="number"
          name="price"
          placeholder="원"
          value={state.price}
          onChange={handlePriceChange}
          aria-errormessage="price-error-message"
          aria-invalid={!state.valids.price ? "true" : "false"}
          className="ml-[70px] mt-[20px] w-[250px] border-b-[2px] border-primary"
        />
        {state.errorMessages.price && (
          <div
            id="price-error-message"
            aria-live="polite"
            className="ml-[100px] flex h-[30px] w-full items-center text-warning"
          >
            {state.errorMessages.price}
          </div>
        )}
      </div>
      {/* 구매 일시 */}
      <div className="border-b-[1px] border-tertiary pb-[50px] pt-[30px]">
        <label htmlFor="date" className="text-18 font-bold">
          구매 일시
        </label>
        <input
          type="text"
          name="date"
          placeholder="예) 20220707"
          value={state.extra.date}
          onChange={handleDateChange}
          aria-errormessage="date-error-message"
          aria-invalid={!state.valids.date ? "true" : "false"}
          className="ml-[35px] mt-[20px] w-[250px] border-b-[2px] border-primary"
        />
        {state.errorMessages.date !== null && (
          <div
            id="date-error-message"
            aria-live="polite"
            className="ml-[100px] flex h-[30px] w-full items-center text-warning"
          >
            {state.errorMessages.date}
          </div>
        )}
      </div>
      {/* 설명 */}
      <div className="relative h-[320px] border-b-[1px] border-tertiary pt-[50px]">
        <label
          htmlFor="content"
          className="absolute top-[50px] text-18 font-bold"
        >
          설명
        </label>
        <textarea
          name="content"
          id="content"
          cols={100}
          rows={8}
          placeholder="제품의 상태 (사용감, 하자 유무) 등을 입력해 주세요."
          value={state.content}
          onChange={handleContentChange}
          aria-errormessage="content-error-message"
          aria-invalid={!state.valids.content ? "true" : "false"}
          className="absolute left-[100px] border-[1px] border-tertiary pl-[16px] pt-[16px]"
        ></textarea>
        {state.errorMessages.content && (
          <div
            id="content-error-message"
            aria-live="polite"
            className="ml-[100px] mt-[215px] flex h-[30px] w-full items-center text-warning"
          >
            {state.errorMessages.content}
          </div>
        )}
      </div>
      {/* 등록 버튼 */}
      <div className="mt-[90px] flex h-[195px] flex-row justify-center gap-[16px]">
        <button className="h-[48px] w-[322px] bg-primary text-white">
          등록하기
        </button>
      </div>
    </form>
  );
}

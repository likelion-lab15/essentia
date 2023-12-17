import Image from "next/image";
import { Button } from "@/components/_index";
import { useState } from "react";
export default function Review() {
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const handleInput = (setter) => (e) => {
    setter(e.target.value);
  };
  return (
    <section className="mx-auto w-[680px]">
      {/* 1. 제목 */}
      <div className="flex h-[64px] items-center border-b-[3px] border-black">
        <span className="text-[20px] font-bold">리뷰 작성</span>
      </div>
      {/* 2. 상품 정보 */}
      <div className="flex border-b-[1px] border-[#808080] p-[25px]">
        <div className="mr-[42px] h-[100px] w-[100px]">
          <Image
            src={reviewData.image.url}
            alt={reviewData.image.orgName}
            width={100}
            height={100}
          />
        </div>
        <div>
          {/* <p className="text-[18px] font-regular">{reviewData.brand}</p> */}
          <p className="text-[24px] font-bold">{reviewData.name}</p>
          <p className="text-[16px] font-regular">
            {/* Le Labo Santal 33 Eau De Parfum 50ml (Korean Ver.) */}
          </p>
        </div>
      </div>
      <form onSubmit={handleFormSubmit}>
        {/* 3. 이미지 첨부 */}
        <div className="border-b-[1px] border-[#808080] py-[25px]">
          <button type="button" className="mb-[13px] h-[76px] w-[76px]">
            <Image
              src="/add_img.svg"
              alt="리뷰 이미지 등록하기"
              width={76}
              height={76}
            />
          </button>
          <p className="text-[12px] font-medium text-[#D7260D]">
            캡쳐한 이미지, 포장을 제거하지 않은 상품, 식별 불가능한 이미지를
            등록하는 경우 이미지 비노출 및 마일리지가 지급되지 않습니다.
          </p>
        </div>
        {/* 4. 리뷰 작성 */}
        <div className="border-b-[1px] border-[#808080] py-[25px]">
          <div className="mb-[15px] border-[1px] border-[#808080]">
            <label htmlFor="title" className="sr-only">
              리뷰 제목
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="제목"
              required
              className="w-full p-[16px]"
              value={titleInput}
              onChange={handleInput(setTitleInput)}
            />
          </div>
          <div className="border-[1px] border-[#808080]">
            <label htmlFor="content" className="sr-only">
              리뷰 본문
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="최소 15자 이상 작성해주십세요."
              className="min-h-[130px] w-full resize-none p-[16px] focus:outline-none"
              value={contentInput}
              onChange={handleInput(setContentInput)}
              minLength={15}
            />
          </div>
        </div>
        {/* 5. 주의사항 */}
        <div className="mb-[50px] py-[25px]">
          <p className="mb-[12px] text-[12px] font-medium text-[#808080]">
            &#x2022; 이미지 리뷰는 상품이 노출된 사진이 1장 이상 포함되어야
            합니다.
          </p>
          <p className="mb-[12px] text-[12px] font-medium text-[#808080]">
            &#x2022; 최초 등록된 리뷰 기준으로 마일리지가 지급됩니다.
          </p>
          <p className="mb-[12px] text-[12px] font-medium text-[#808080]">
            &#x2022; 상품과 무관하거나 비속어가 포함된 리뷰, 그 외 리뷰
            운영정책에 위배되는 리뷰는 고지 없이 블라인드 후 경고 조치됩니다.
          </p>
          <p className="mb-[12px] text-[12px] font-medium text-[#808080]">
            &#x2022; 경고 누적 시 리뷰 작성이 제한될 수 있습니다.
          </p>
        </div>

        {/* 6. 버튼 */}
        <div className="mb-[50px] flex justify-center">
          <Button label="등록하기" type="submit" />
        </div>
      </form>
    </section>
  );
}

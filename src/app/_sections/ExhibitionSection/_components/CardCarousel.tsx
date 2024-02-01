"use client";

import { useState } from "react";
import Card from "./Card";
import RightArrowIcon from "@/../public/right-arrow-icon.svg";
import LeftArrowIcon from "@/../public/left-arrow-icon.svg";

export default function CardCarousel({ cardlist }) {
  // 인덱스로 이미지에 접근하기 위해서 imageIndex state 생성
  const [imageIndex, setImageIndex] = useState(0);

  /* M - 이전 카드 다섯 장 보여주기 */
  const showPrevCard = () => {
    setImageIndex((index) => {
      // index가 0이면, -1이 되지 않도록 배열의 마지막 요소를 반환하게 함
      // console.log(cardlist.length - 5, "카드 길이"); // 9
      // if (index < 0) return cardlist.length - 5;
      // return index - 5;
      if (index <= 0) return 0;
      return index - 1;
    });
  };

  /* M - 다음 카드 다섯 장 보여주기 */
  const showNextCard = () => {
    setImageIndex((index) => {
      // index가 배열보다 길어지면, 초과되지 않도록 배열의 첫요소를 반환하게 함
      // if (index >= cardlist.length - 5) return 0;
      // console.log(index + 5);
      // return index + 5;
      return index + 1;
    });
  };

  return (
    <div className="relative flex">
      {/* 1. 좌우버튼 */}
      <div className="absolute bottom-[-100px] right-0 flex">
        <button
          onClick={showPrevCard}
          className="flex h-[48px] w-[48px] items-center justify-center border-2 border-r border-black"
        >
          <LeftArrowIcon></LeftArrowIcon>
        </button>
        <button
          onClick={showNextCard}
          className="flex h-[48px] w-[48px] items-center justify-center border-2 border-l border-black"
        >
          <RightArrowIcon></RightArrowIcon>
        </button>
      </div>
      {/* 2. 카드 캐러셀 */}
      <div className="relative flex">
        {cardlist.map((card) => (
          <Card key={card._id} card={card} imageIndex={imageIndex} />
        ))}
      </div>
      {/* 3. 불릿 */}
      <div className="absolute bottom-[-100px] left-0 flex h-[48px] items-center justify-center gap-[8px] border-2 border-black px-[8px]">
        {cardlist.map(
          (_, index) =>
            index % 5 === 0 && (
              <button
                onClick={() => {
                  setImageIndex(index);
                  console.log(index);
                }}
                key={index}
              >
                {index === imageIndex ? (
                  <div className="h-[8px] w-[8px] bg-black"></div>
                ) : (
                  <div className="h-[8px] w-[8px] bg-blue-500"></div>
                )}
              </button>
            )
        )}
      </div>
    </div>
  );
}

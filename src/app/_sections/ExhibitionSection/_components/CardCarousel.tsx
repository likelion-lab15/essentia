"use client";

import { useState } from "react";
import Card from "./Card";
import RightArrowIcon from "@/../public/right-arrow-icon.svg";
import LeftArrowIcon from "@/../public/left-arrow-icon.svg";

export default function CardCarousel({ cardlist }) {
  const [imageIndex, setImageIndex] = useState(0);

  /* M - 이전 카드 여섯 장 보여주기 */
  const showPrevCard = () => {
    setImageIndex((index) => {
      if (index <= 0) return Math.floor((cardlist.length - 1) / 6) * 6;
      return index - 6;
    });
  };

  /* M - 다음 카드 여섯 장 보여주기 */
  const showNextCard = () => {
    setImageIndex((index) => {
      if (index >= Math.floor((cardlist.length - 1) / 6) * 6) return 0;
      return index + 6;
    });
  };

  return (
    <div className="relative flex">
      {/* 1. 좌우버튼 */}
      <div className="absolute bottom-[-100px] right-0 flex">
        <button
          onClick={showPrevCard}
          className="flex h-[48px] w-[48px] items-center justify-center border-2 border-r border-black hover:bg-secondary"
        >
          <LeftArrowIcon />
        </button>
        <button
          onClick={showNextCard}
          className="flex h-[48px] w-[48px] items-center justify-center border-2 border-l border-black hover:bg-secondary"
        >
          <RightArrowIcon />
        </button>
      </div>
      {/* 2. 카드 캐러셀 */}
      <div className="relative flex overflow-hidden">
        {cardlist.map((card) => (
          <Card key={card._id} card={card} imageIndex={imageIndex} />
        ))}
      </div>
      {/* 3. 불릿 */}
      <div className="absolute bottom-[-100px] left-0 flex h-[48px] items-center justify-center gap-[8px] border-2 border-black px-[8px]">
        {cardlist.map(
          (_, index) =>
            index % 6 === 0 && (
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

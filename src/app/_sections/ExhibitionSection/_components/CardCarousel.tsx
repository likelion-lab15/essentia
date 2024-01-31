"use client";

import Image from "next/image";
import { useState } from "react";
import Card from "./Card";

export default function CardCarousel({ cardlist }) {
  // 인덱스로 이미지에 접근하기 위해서 imageIndex state 생성
  const [imageIndex, setImageIndex] = useState(0);

  // 좌로 이동
  const showPrevCard = () => {
    setImageIndex((index) => {
      if (index <= 0) return cardlist.length - 5; // index가 0이면, -1이 되지 않도록 배열의 마지막 요소를 반환하게 함
      return index - 5;
    });
  };

  // 우로 이동
  const showNextCard = () => {
    setImageIndex((index) => {
      if (index >= cardlist.length - 5) return 0; // index가 배열보다 길어지면, 초과되지 않도록 배열의 첫요소를 반환하게 함
      return index + 5;
    });
  };

  return (
    <div className="relative flex">
      {/* 좌우버튼 */}
      <div className="absolute bottom-[-100px] right-0 flex">
        <button
          onClick={showPrevCard}
          className="flex h-[48px] w-[48px] items-center justify-center border-2 border-r border-black"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 10.9996H7.83L13.42 5.40963L12 3.99963L4 11.9996L12 19.9996L13.41 18.5896L7.83 12.9996H20V10.9996Z"
              fill="#222222"
            />
          </svg>
        </button>
        <button
          onClick={showNextCard}
          className="flex h-[48px] w-[48px] items-center justify-center border-2 border-l border-black"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3.99963L10.59 5.40963L16.17 10.9996H4V12.9996H16.17L10.59 18.5896L12 19.9996L20 11.9996L12 3.99963Z"
              fill="#222222"
            />
          </svg>
        </button>
      </div>
      {/* 캐러셀 */}
      <div className="relative flex">
        {cardlist.map((card) => (
          <Card key={card._id} card={card} imageIndex={imageIndex} />
        ))}
      </div>
      {/* 불릿 */}
      <div className="absolute bottom-[-100px] left-0 flex h-[48px] items-center justify-center gap-[8px] border-2 border-black px-[8px]">
        {cardlist.map(
          (_, index) =>
            index % 5 === 0 && (
              <button
                onClick={() => {
                  setImageIndex(index);
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

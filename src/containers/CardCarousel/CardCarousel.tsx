"use client";

import { useState } from "react";
import { Bullets, Buttons, Slider } from "./components/_index";

type TCardListData = {
  _id: number;
  price: number;
  extra: {
    amount: number[];
    brand: string;
  };
  mainImages: {
    name: string;
    path: string;
    originalname: string;
  }[];
  name: string;
}[];

export default function CardCarousel({
  cardListData,
}: {
  cardListData: TCardListData;
}) {
  const [cardIndex, setCardIndex] = useState(0);

  return (
    <div className="mx-auto w-[1382px]">
      <div className="relative flex">
        {/* 1. 슬라이더 */}
        <Slider cardListData={cardListData} cardIndex={cardIndex} />
        {/* 2. 버튼 */}
        <Buttons cardListData={cardListData} setCardIndex={setCardIndex} />
        {/* 3. 불릿 */}
        <Bullets
          cardListData={cardListData}
          cardIndex={cardIndex}
          setCardIndex={setCardIndex}
        />
      </div>
    </div>
  );
}

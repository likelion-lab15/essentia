import { Dispatch, SetStateAction } from "react";
import RightArrowIcon from "@/../public/right-arrow-icon.svg";
import LeftArrowIcon from "@/../public/left-arrow-icon.svg";

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

export default function Buttons({
  cardListData,
  setCardIndex,
}: {
  cardListData: TCardListData;
  setCardIndex: Dispatch<SetStateAction<number>>;
}) {
  /* M - 이전 카드 여섯 장 보여주기 */
  const showPrevCard = () => {
    setCardIndex((index) => {
      if (index <= 0) return Math.floor((cardListData.length - 1) / 6) * 6;
      return index - 6;
    });
  };

  /* M - 다음 카드 여섯 장 보여주기 */
  const showNextCard = () => {
    setCardIndex((index) => {
      if (index >= Math.floor((cardListData.length - 1) / 6) * 6) return 0;
      return index + 6;
    });
  };

  return (
    <div className="absolute bottom-[-100px] right-0 flex">
      <button
        onClick={showPrevCard}
        className="flex h-[48px] w-[48px] items-center justify-center border-2 border-r border-black transition ease-in-out hover:bg-secondary"
      >
        <LeftArrowIcon />
      </button>
      <button
        onClick={showNextCard}
        className="flex h-[48px] w-[48px] items-center justify-center border-2 border-l border-black transition ease-in-out hover:bg-secondary"
      >
        <RightArrowIcon />
      </button>
    </div>
  );
}

import { Dispatch, SetStateAction } from "react";

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

export default function Bullets({
  cardListData,
  cardIndex,
  setCardIndex,
}: {
  cardListData: TCardListData;
  cardIndex: number;
  setCardIndex: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="absolute bottom-[-100px] left-0 flex h-[48px] items-center justify-center gap-[8px] border-2 border-black px-[8px]">
      {cardListData.map(
        (_, index) =>
          index % 6 === 0 && (
            <button
              onClick={() => {
                setCardIndex(index);
              }}
              key={index}
            >
              {index === cardIndex ? (
                <div className="h-[8px] w-[8px] bg-black"></div>
              ) : (
                <div className="h-[8px] w-[8px] bg-blue-500"></div>
              )}
            </button>
          )
      )}
    </div>
  );
}

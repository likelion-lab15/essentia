import { Card } from "./_index";

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

export default function Slider({
  cardListData,
  cardIndex,
}: {
  cardListData: TCardListData;
  cardIndex: number;
}) {
  return (
    <div className="relative flex overflow-hidden">
      {cardListData.map((card) => (
        <Card key={card._id} card={card} cardIndex={cardIndex} />
      ))}
    </div>
  );
}

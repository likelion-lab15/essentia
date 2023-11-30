interface ProductCardProps {
  product: {
    _id: string;
    mainImages: string[];
    name: string;
    price: number;
    extra: {
      amount: number;
      brand: string;
    };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const {
    _id,
    mainImages,
    name,
    price,
    extra: { amount, brand },
  } = product;

  return (
    <li key={_id} className="mr-[16px] h-[354px] w-[234px]">
      <img
        src={mainImages[0]}
        alt={name}
        className="mb-[42px] h-[230px] w-[234px]"
      />
      <div>
        <h3 className="ml-[17px] text-14 font-bold">{brand}</h3>
        <p className="ml-[17px] text-16 font-medium">
          {name} / {amount}ml
        </p>
        <p className="ml-[17px] text-14 font-semibold">
          {price.toLocaleString()}원
        </p>
      </div>
    </li>
  );
}

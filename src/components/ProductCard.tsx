interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { _id, mainImages, name, price } = product;
  return (
    <li key={_id} className="mr-[16px] h-[354px] w-[234px]">
      <img
        src={mainImages[0]}
        alt={name}
        className="mb-[42px] h-[230px] w-[234px]"
      />
      <div>
        <h3 className="text-14 font-bold">LE LABO</h3>
        <p className="text-16 font-medium">{name} / 용량</p>
        <p className="text-14 font-semibold">{price}</p>
      </div>
    </li>
  );
}

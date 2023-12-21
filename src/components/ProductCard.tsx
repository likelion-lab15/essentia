/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: {
    _id: string;
    mainImages: string[];
    name: string;
    price: number;
    extra: {
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
    extra: { brand },
  } = product;

  /* 라우터 설정을 위한 useRouter 사용 */
  const router = useRouter();

  /* prudcts/[id]로 이동시키는 함수 */
  const handleClick = () => {
    router.push(`/products/${_id}`);
  };

  return (
    <li
      key={_id}
      className="mb-[100px] mr-[16px] h-[354px] w-[234px] cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={`${process.env.NEXT_PUBLIC_IMG}${mainImages[0].path}`}
        alt={name}
        className="mb-[42px] h-[230px] w-[234px]"
      />
      <div>
        <h3 className="ml-[17px] text-14 font-bold">{brand}</h3>
        <p className="ml-[17px] text-16 font-medium">{name}</p>
        <p className="ml-[17px] text-14 font-semibold">
          {price.toLocaleString()}원
        </p>
      </div>
    </li>
  );
}

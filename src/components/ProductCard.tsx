/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";

// 상품 타입 정의
type TProductCardProps = {
  product: {
    _id: string;
    mainImages: { path: string }[];
    name: string;
    price: number;
    extra: {
      brand: string;
    };
  };
};

export default function ProductCard({ product }: TProductCardProps) {
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
        src={`${process.env.NEXT_PUBLIC_API_SERVER}${mainImages[0].path}`}
        alt={name}
        className="mb-[12px] h-[230px] w-[234px] bg-product"
      />
      <div>
        <h3 className="text-14 font-bold">{brand}</h3>
        <p className="text-16 font-medium">{name}</p>
        <p className="text-14 font-semibold">{price.toLocaleString()}원</p>
      </div>
    </li>
  );
}

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Card({
  card,
  cardIndex,
}: {
}) {
  const { _id, price, name, mainImages, extra } = card;
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`products/${_id}`)}
      className="w-[230px] flex-shrink-0 flex-grow-0 cursor-pointer border-2 border-r-0 border-[#222] bg-white last:border-r-2"
      style={{
        transition: "translate 300ms ease-in-out",
        translate: `${-100 * cardIndex}%`, //최초는0%, 그 다음은 100%, 200%씩 이동하는 것 뿐이다.
      }}
    >
      <div className="mb-[40px] h-[230px] w-full">
        <div className="relative h-[inherit] w-[inherit]">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_SERVER}${mainImages[0].path}`}
            alt={mainImages[0].originalname}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="mb-[12px] flex flex-col items-start px-[17px]">
        <p className="mb-[5px] text-[14px] font-bold">{name}</p>
        <p className="mb-[5px] text-[16px] font-medium">
          용량: {extra.amount[0]} / {extra.amount[1]}ml
        </p>
        <p className="mb-[12px] text-[14px] font-medium">
          {price.toLocaleString()} 원
        </p>
      </div>
    </div>
  );
}

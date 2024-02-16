"use client";

import Image from "next/image";
import { MouseEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { deleteWish } from "../_functions/_index";
import { useClientSession } from "@/hooks/_index";

type TWishCard = {
  id: number;
  product: {
    name: string;
    price: number;
    image: {
      path: string;
      name: string;
      originalname: string;
    };
  };
  setUpdateFlag?: any;
};

export default function WishCard({ id, product }: TWishCard) {
  const { image, name, price } = product;
  const router = useRouter();
  const { getAccessToken } = useClientSession();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteWish(id, getAccessToken()),
    onMutate: () => {
      // mutationFn 보다 먼저 실행됨
      console.log("mutate");
    },
    onError: () => {
      console.log("에러가 발생해 제거 실패!");
    },
    onSuccess: () => {
      console.log("제거 성공");
    },
    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["wishList"] });
      }
    },
  });

  /* 페이지 이동하기 */
  const handleClickToPush = () => {
    router.push(`/products/${id}`);
  };

  /* 찜목록에서 삭제하기 */
  const handleDeleteWish = (e: MouseEvent) => {
    e.stopPropagation();
    mutate();
  };

  return (
    <div
      key={id}
      className="relative mr-[16px] h-[354px] w-[234px] cursor-pointer"
      onClick={handleClickToPush}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_API_SERVER}${image.path}`}
        alt={image.originalname}
        width={243}
        height={230}
        className="mb-[42px]"
      />
      <div>
        <h3 className="ml-[17px] text-14 font-bold">Brand</h3>
        <p className="ml-[17px] text-16 font-medium">{name}</p>
        <p className="ml-[17px] text-14 font-semibold">
          {price.toLocaleString()}원
        </p>
      </div>
      <button
        className="absolute right-[10px] top-[10px]"
        onClick={handleDeleteWish}
      >
        <Image src="/heart_fill.svg" alt="찜" width={20} height={20} />
      </button>
    </div>
  );
}

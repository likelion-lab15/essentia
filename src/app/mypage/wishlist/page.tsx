"use client";

import { axiosPrivate } from "@/api/axios";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function WishList() {
  const [wishList, setWishList] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false);

  // 찜 목록 불러오기
  useEffect(() => {
    (async () => {
      const wishList = await getWishList();
      setWishList(wishList);
    })();
  }, [updateFlag]);

  // 찜 목록 불러오기
  const getWishList = async () => {
    try {
      const res = await axiosPrivate.get("bookmarks");
      return res.data.item;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <section className="flex w-[1000px] flex-wrap">
      {wishList.map((item, index) => {
        const { image, name, price } = item.product;

        return (
          <div
            key={item._id}
            className="relative mr-[16px] h-[354px] w-[234px]"
          >
            <Image
              src={image.url}
              alt={name}
              width={243}
              height={230}
              className="mb-[42px] bg-gray-500"
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
              onClick={() => deleteWish(item._id)}
            >
              <Image src="/heart_fill.svg" alt="찜" width={20} height={20} />
            </button>
          </div>
        );
      })}
    </section>
  );
}

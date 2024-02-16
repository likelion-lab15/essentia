"use client";

import { useState, useEffect } from "react";
import { EmptyMessage, WishCard } from "../_components/_index";
import { useClientSession } from "@/hooks/_index";
type TWish = {
  _id: number;
  product: {
    name: string;
    price: number;
    image: {
      path: string;
      name: string;
      originalname: string;
    };
  };
};

export default function WishCardList() {
  const [wishList, setWishList] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false);
  const { getAccessToken } = useClientSession();

  const accessToken = getAccessToken();

  /* 찜목록 데이터 불러오기 */
  useEffect(() => {
    const getWishList = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_SERVER}/bookmarks`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();

        setWishList(data.item);
      } catch (error) {
        console.error("message:", error);
      }
    };

    getWishList();
  }, [updateFlag]);

  if (wishList.length > 0) {
    return (
      <div className="flex flex-wrap">
        {wishList.map((wish: TWish) => {
          const { _id, product } = wish;

          return (
            <WishCard
              key={_id}
              id={_id}
              product={product}
              setUpdateFlag={setUpdateFlag}
            />
          );
        })}
      </div>
    );
  } else {
    return <EmptyMessage />;
  }
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { EmptyMessage, Loader, WishCard } from "../_components/_index";
import { useClientSession } from "@/hooks/_index";
import { getWishList } from "../_functions/_index";

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
  const { getAccessToken } = useClientSession();

  const {
    data: wishList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["wishList"],
    queryFn: () => getWishList(getAccessToken()),
    enabled: !!getAccessToken(),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <span>데이터를 불러오지 못했습니다!</span>;
  }

  if (wishList && wishList.length > 0) {
    return (
      <div className="flex flex-wrap">
        {wishList.map((wish: TWish) => {
          const { _id, product } = wish;

          return <WishCard key={_id} id={_id} product={product} />;
        })}
      </div>
    );
  } else {
    return <EmptyMessage />;
  }
}

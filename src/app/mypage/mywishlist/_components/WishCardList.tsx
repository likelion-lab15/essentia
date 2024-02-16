"use client";

import { useQuery } from "@tanstack/react-query";
import { EmptyMessage, Error, Loader, WishCard } from "../_components/_index";
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

  // 데이터 호출
  const {
    data: wishList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["wishList"],
    queryFn: () => getWishList(getAccessToken()),
    enabled: !!getAccessToken(),
  });

  // 로딩 핸들링
  if (isLoading) {
    return <Loader />;
  }

  // 에러 핸들링
  if (isError) {
    return <Error />;
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

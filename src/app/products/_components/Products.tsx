"use client";

import ProductCard from "@/components/ProductCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Fragment, useRef } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Loader from "@/app/mypage/mywishlist/_components/Loader";
import { fetchData } from "@/fetch/fetch";

type TProductsProps = {
  selectedBrand: string;
};

export default function Products({ selectedBrand }: TProductsProps) {
  const observerElem = useRef(null);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products", selectedBrand],
      queryFn: async ({ pageParam = 1 }) => {
        const products = await fetchData(`products?page=${pageParam}&limit=12`);
        return { products, nextPage: pageParam + 1, totalPages: 100 };
      },
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage <= lastPage.totalPages
          ? lastPage.nextPage
          : undefined;
      },
      initialPageParam: 1,
    });

  useIntersectionObserver({
    target: observerElem,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  // 로딩 상태 처리
  if (isLoading)
    return (
      <div className="h-[300px] w-[984px]">
        <Loader />
      </div>
    );

  return (
    <div className="w-[984px]">
      <div className="max-h-full">
        <div className="flex justify-between">
          {/* 브랜드명 */}
          {selectedBrand && (
            <div className="mb-[20px] flex flex-row items-center gap-[5px]">
              <span className="text-16 font-medium text-tertiary">SHOP</span>
              <Image
                src="/products-right-icon.svg"
                alt="오른쪽 아이콘"
                width={24}
                height={24}
              />
              <span className="font-bold">{selectedBrand}</span>
            </div>
          )}
        </div>
        <ul className="flex w-[1000px] flex-row flex-wrap">
          {data?.pages.map((page: any, i) => (
            <Fragment key={i}>
              {page.products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </Fragment>
          ))}
        </ul>
        <div className="loader" ref={observerElem}>
          {isFetchingNextPage && hasNextPage ? "Loading..." : "No search left"}
        </div>
      </div>
    </div>
  );
}

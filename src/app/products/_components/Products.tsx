"use client";

import ProductCard from "@/components/ProductCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getPageData } from "../_lib/getSelectedBrand";

type TProductsProps = {
  selectedBrand: string;
};

export default function Products({ selectedBrand }: TProductsProps) {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["products", selectedBrand],
    queryFn: async ({ pageParam = 1 }) => {
      const products = await getPageData(pageParam);
      return { products, nextPage: pageParam + 1, totalPages: 100 };
    },
    getNextPageParam: (lastPage) => {
      // 실제 로직에 맞게 다음 페이지 존재 여부를 결정
      return lastPage.nextPage <= lastPage.totalPages
        ? lastPage.nextPage
        : undefined;
    },
  });

  // 로딩 상태 처리
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-[984px]">
      <div className="h-[1300px]">
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
          {data?.pages.map((page) =>
            // 직접 상품 배열을 순회
            page.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </ul>
        {hasNextPage && (
          <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

"use client";
import ProductCard from "@/components/ProductCard";
import axios from "@/api/axios";
import { useState, useEffect } from "react";
import Image from "next/image";

type TSortOption = {
  key: string;
  name: string;
};

type TProductsProps = {
  selectedBrand: string;
};

// API 호출 함수 (페이지네이션, 정렬, 브랜드 필터)
const getProducts = async (
  sortOrder: Record<string, number> | null,
  page: number,
  limit: number,
  selectedBrand: string | null
) => {
  try {
    const params = new URLSearchParams({
      ...(sortOrder && { sort: JSON.stringify(sortOrder) }), // 정렬 순서
      page: page.toString(), // 페이지 번호
      limit: limit.toString(), // 페이지 항목 수
    });

    // 선택된 브랜드 필터 추가
    if (selectedBrand) {
      params.append("custom", JSON.stringify({ "extra.brand": selectedBrand }));
    }

    const response = await axios.get(`/products?${params}`);
    return response.data.item || [];
  } catch (error) {
    console.error("Error 🥲", error);
    return [];
  }
};

export default function Products({ selectedBrand }: TProductsProps) {
  const PAGES_PER_GROUP = 5; // 페이지 그룹당 페이지 수
  const ITEMS_PER_PAGE = 12; // 페이지 상품 수 (임시로 상품 12개)
  const TOTAL_PAGES = 10; // 총 페이지 수

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [pageGroupStart, setPageGroupStart] = useState(1); // 페이지 그룹의 시작 페이지 번호
  const [products, setProducts] = useState([]); // 상품 목록
  const [dropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 메뉴 표시
  const [selectedName, setSelectedName] = useState("정렬"); // 드롭다운 메뉴 제목
  const [sortOrder, setSortOrder] = useState<Record<string, number> | null>(
    null
  ); // 정렬 순서

  // 정렬 옵션 배열
  const sortOptions: TSortOption[] = [
    { key: "price-asc", name: "낮은 가격순" },
    { key: "price-desc", name: "높은 가격순" },
  ];

  // '다음' 그룹으로 이동
  const handleNextGroup = () => {
    setPageGroupStart((start) =>
      Math.min(start + PAGES_PER_GROUP, TOTAL_PAGES)
    );
  };

  // '이전' 그룹으로 이동
  const handlePrevGroup = () => {
    setPageGroupStart((start) => Math.max(start - PAGES_PER_GROUP, 1));
  };

  // 페이지 변경 함수
  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // 드롭다운 메뉴에서 정렬 선택 시 호출되는 함수
  const handleSortSelection = async (key: string) => {
    let newSortOrder;
    if (key === "price-desc") {
      newSortOrder = { price: -1 };
    } else {
      newSortOrder = { price: 1 };
    }
    setSortOrder(newSortOrder);
    setSelectedName(
      sortOptions.find((option) => option.key === key)?.name || ""
    );
    setDropdownOpen(false);
  };

  // 상품 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchData = async () => {
      const allProducts = await getProducts(
        sortOrder,
        currentPage,
        ITEMS_PER_PAGE,
        selectedBrand
      );
      setProducts(allProducts);
    };

    fetchData();
  }, [selectedBrand, currentPage, sortOrder, ITEMS_PER_PAGE]);

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
          {/* 드롭다운 메뉴 */}
          <div className="mb-[30px]">
            <button
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
              }}
              className="flex h-[40px] w-[140px] items-center justify-start border-[1px] border-primary pl-[12px] hover:bg-secondary"
            >
              {selectedName}
            </button>
            {dropdownOpen && (
              <ul className="absolute flex h-[80px] w-[140px] flex-col gap-[10px] border-[1px] border-primary">
                {sortOptions.map((option) => (
                  <li
                    key={option.key}
                    onClick={() => handleSortSelection(option.key)}
                    className="flex cursor-pointer items-center justify-start py-[5px] pl-[12px] hover:bg-secondary"
                  >
                    {option.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* 상품 목록 */}
        <ul className="flex w-[1000px] flex-row flex-wrap">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ul>
      </div>

      {/* 페이지네이션 UI */}
      <div className="mt-[100px] flex w-[984px] items-center justify-center">
        {/* 이전 버튼 */}
        <button
          onClick={handlePrevGroup}
          disabled={pageGroupStart === 1}
          className="mr-[20px]"
        >
          <Image src="/left-icon.png" alt="이전 버튼" width={24} height={24} />
        </button>
        {/* 페이지 번호 버튼들 */}
        {[...Array(PAGES_PER_GROUP)].map((_, index) => {
          // PAGES_PER_GROUP 크기만큼의 배열을 생성하고 각 요소에 대해 반복
          const page = pageGroupStart + index;
          return (
            <button
              key={page}
              onClick={() => changePage(page)}
              className={`page-button ${
                currentPage === page ? "text-primary" : "text-pagenation"
              } mx-[10px] px-[5px] text-45`}
              disabled={page > TOTAL_PAGES}
            >
              {page}
            </button>
          );
        })}
        {/* 다음 버튼 */}
        <button
          onClick={handleNextGroup}
          disabled={pageGroupStart + PAGES_PER_GROUP > TOTAL_PAGES}
          className="ml-[20px]"
        >
          <Image src="/right-icon.png" alt="다음 버튼" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}

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

// API 호출 함수 (페이지네이션, 정렬)
const getProducts = async (
  sortOrder: Record<string, number> | null,
  page: number,
  limit: number
) => {
  try {
    const params = new URLSearchParams({
      ...(sortOrder && { sort: JSON.stringify(sortOrder) }), // 정렬 순서가 있으면 파라미터에 추가
      page: page.toString(), // 페이지 번호
      limit: limit.toString(), // 페이지 항목 수
    });
    const response = await axios.get(`/products?${params}`);
    return response.data.item || [];
  } catch (error) {
    console.error("Error 🥲", error);
    return [];
  }
};

export default function Products({ selectedBrand }: TProductsProps) {
  const PAGES_PER_GROUP = 5; // 한 페이지 그룹에 표시할 페이지 수
  const ITEMS_PER_PAGE = 10; // 페이지 상품 수 (임시로 상품 3개)
  const TOTAL_PAGES = 10; // 총 페이지 수 (고정 값)

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [pageGroupStart, setPageGroupStart] = useState(1); // 페이지 그룹의 시작 페이지 번호 상태

  const [products, setProducts] = useState([]); // 상품 목록 상태
  const [dropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 메뉴 표시 상태
  const [selectedName, setSelectedName] = useState("정렬"); // 드롭다운 메뉴 제목 상태
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

  // 페이지 변경 핸들러
  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // 드롭다운 메뉴에서 정렬 선택 시 호출되는 함수
  const handleSortSelection = async (key: string) => {
    let sortOrder;
    if (key === "price-desc") {
      sortOrder = { price: -1 };
    } else {
      sortOrder = { price: 1 };
    }

    // 정렬된 상품 목록 가져옴
    const sortedProducts = await getProducts(
      sortOrder,
      currentPage,
      ITEMS_PER_PAGE
    );
    // 선택된 브랜드에 따라 상품 목록 필터링
    const filteredProducts = selectedBrand
      ? sortedProducts.filter(
          (product: any) => product.extra.brand === selectedBrand
        )
      : sortedProducts;

    setProducts(filteredProducts); // 상품 목록 상태 업데이트
    setSelectedName(
      sortOptions.find((option) => option.key === key)?.name || ""
    ); // 드롭다운 메뉴 이름 업데이트
    setDropdownOpen(false); // 드롭다운 닫기
  };

  // 컴포넌트가 마운트될 때 상품 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchData = async () => {
      const allProducts = await getProducts(null, currentPage, ITEMS_PER_PAGE); // 기본 정렬 사용 (ID 기준)

      const filteredProducts = selectedBrand
        ? allProducts.filter(
            (product: any) => product.extra.brand === selectedBrand
          )
        : allProducts;
      setProducts(filteredProducts);
    };

    fetchData();
  }, [selectedBrand, currentPage, ITEMS_PER_PAGE]);

  return (
    <div className="w-[984px]">
      <div className="flex justify-between">
        {/* 상품 개수 */}
        <p className="mb-[110px]">{products.length}개의 상품이 있습니다.</p>
        {/* 드롭다운 메뉴 */}
        <div className="mb-[110px]">
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

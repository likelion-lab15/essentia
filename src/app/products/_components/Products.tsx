"use client";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { useState, useEffect } from "react";

const getProducts = async () => {
  try {
    const response = await axios.get("https://localhost/api/products/");
    return response.data.item || [];
  } catch (error) {
    console.error("Error 🥲", error);
    return [];
  }
};

export default function Products({ selectedBrand }) {
  // 향수 목록 상태 관리
  const [products, setProducts] = useState([]);
  // 드롭 다운 클릭 시
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("price-desc");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleSortSelection = (order) => {
    setSortOrder(order);
    setDropdownOpen(false); // 드롭다운 메뉴 닫기

    const sortedProducts = [...products].sort((a, b) => {
      return order === "price-desc" ? b.price - a.price : a.price - b.price;
    });

    setProducts(sortedProducts);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await getProducts();
        const filteredProducts = selectedBrand
          ? allProducts.filter(
              (product) => product.extra.brand === selectedBrand
            )
          : allProducts;
        setProducts(filteredProducts);
        console.log(filteredProducts);
      } catch (error) {
        console.error("Error 🥲", error);
      }
    };

    fetchData();
  }, [selectedBrand]);

  // 상품 정렬 함수
  const handleSortChange = (event) => {
    const sortValue = event.target.value;
    const sortedProducts = [...products].sort((a, b) => {
      if (sortValue === "price-desc") {
        return b.price - a.price;
      } else {
        return a.price - b.price;
      }
    });
    setProducts(sortedProducts);
  };

  return (
    <div className="w-[984px]">
      <div className="flex justify-between">
        {/* 상품 개수 */}
        <p className="mb-[110px]">{products.length}개의 상품이 있습니다.</p>
        {/* 드롭다운 박스 */}
        <div className="mb-[110px]">
          <button
            onClick={toggleDropdown}
            className="h-[40px] w-[100px] border-[1px] border-primary pr-[42px] hover:bg-secondary"
          >
            정렬
          </button>
          {dropdownOpen && (
            <ul className="absolute flex h-[80px] w-[100px] flex-col gap-[10px] border-[1px] border-primary">
              <li
                onClick={() => handleSortSelection("price-desc")}
                className="flex cursor-pointer items-center justify-center py-[5px] hover:bg-secondary"
              >
                높은 가격순
              </li>
              <li
                onClick={() => handleSortSelection("price-asc")}
                className="flex cursor-pointer items-center justify-center py-[5px] hover:bg-secondary"
              >
                낮은 가격순
              </li>
            </ul>
          )}
        </div>
      </div>
      {/* 상품 목록 */}
      <ul className="flex w-[1000px] flex-row flex-wrap">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </ul>
    </div>
  );
}

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
        <select
          onChange={handleSortChange}
          className="mb-[110px] border-[1px] border-primary px-[15px] py-[10px]"
        >
          <option
            value="price-desc"
            className="flex items-center justify-center"
          >
            높은 가격순
          </option>
          <option value="price-asc">낮은 가격순</option>
        </select>
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

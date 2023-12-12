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

  return (
    <div className="w-[984px]">
      <p className="mb-[110px]">{products.length}개의 상품이 있습니다.</p>
      <ul className="flex w-[1000px] flex-row flex-wrap">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </ul>
    </div>
  );
}

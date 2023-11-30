"use client";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { useState, useEffect } from "react";

export async function getProducts() {
  try {
    const response = await axios.get("https://localhost/api/products/");
    let result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error 🥲", error);
    return [];
  }
}

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data.item);
        console.log(data.item);
      } catch (error) {
        console.error("Error 🥲", error);
      }
    };

    fetchData();
  }, []);
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

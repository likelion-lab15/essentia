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
    <>
      <ul className="flex w-[984px] flex-row flex-wrap">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </ul>
    </>
  );
}

"use client";
import React from "react";
import {
  ProductInfo,
  ProductDetail,
} from "@/app/products/[_id]/_sections/_index";

export default function Product(props: any) {
  const id = props.params._id;
  return (
    <>
      <main className="flex flex-col items-center">
        <ProductInfo id={id} />
        <ProductDetail id={id} />
      </main>
    </>
  );
}

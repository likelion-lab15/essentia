"use client";
import React from "react";
import {
  ProductInfo,
  ProductDetail,
} from "@/app/products/[_id]/_sections/_index";

type TProductProps = {
  params: {
    _id: string;
  };
};

export default function Product(props: TProductProps) {
  const id = props.params._id;
  return (
    <main className="flex flex-col items-center">
      <ProductInfo id={id} />
      <ProductDetail id={id} />
    </main>
  );
}

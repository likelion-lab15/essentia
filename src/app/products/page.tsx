"use client";
import FilterList from "@/components/FilterList";
import Products from "./_components/Products";
import Filter from "@/containers/Filter";
import brandList from "@/constants/brandList";
import { useState } from "react";
import ScrollTopButton from "@/components/ScrollTopButton";

type Tbrand = string;

export default function AllProducts() {
  const [selectedBrand, setSelectedBrand] = useState<Tbrand>("");
  const handleBrandSelect = (brand: Tbrand) => {
    setSelectedBrand(brand);
  };

  return (
    <>
      <ScrollTopButton />
      <main className="mb-[150px] flex flex-col items-center">
        <div className="flex h-[400px] items-center justify-center">
          <h1 className=" w-[900px] border-b-[5px] border-black text-center text-50 font-bold">
            {selectedBrand || "ALL"}
          </h1>
        </div>
        <section className="flex gap-[30px]">
          <Filter title="Brand">
            <FilterList list={brandList} onClick={handleBrandSelect} />
          </Filter>
          <Products selectedBrand={selectedBrand} />
        </section>
      </main>
    </>
  );
}

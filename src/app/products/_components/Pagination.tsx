"use client";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Pagination({ page }) {
  const router = useRouter();
  // const currentPage = 1;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 10;

  const changePage = (page) => {
    router.push(`/products?page=${page}&limit=12`);
    setCurrentPage(page);
  };

  return (
    <div className="mt-[100px] flex w-[984px] items-center justify-center">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => changePage(page)}
          className={`page-button ${
            currentPage === page ? "text-primary" : "text-pagenation"
          } mx-[10px] px-[5px] text-45`}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

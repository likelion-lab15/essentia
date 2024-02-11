"use client";

import { useRouter } from "next/navigation";

export default function Button() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="mb-[80px] w-[150px] border-2 border-primary px-[24px] py-[12px] hover:bg-secondary"
      onClick={() => router.push("/products")}
    >
      View All
    </button>
  );
}

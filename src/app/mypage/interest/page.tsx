"use client";

import { axiosPrivate } from "@/api/axios";
import { useEffect } from "react";
import { ProductCard } from "@/components/_index";

export default function Interest() {
  useEffect(() => {
    (async () => {
      const res = await axiosPrivate.get("carts");
      console.log(res);
    })();
  }, []);
  return <section className="w-[1000px]">Interest</section>;
}

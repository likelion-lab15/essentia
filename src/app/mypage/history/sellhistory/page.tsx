"use client";

import { useEffect, useState } from "react";
import { SellHistoryTable } from "../_components/_index";
import { getHistoryData2 } from "../_functions/getHistoryData";
import { useUserStore } from "@/stores/_index";

export default function SellHistory({ params }) {
  const [sellHistoryData, setSellHistoryData] = useState([]);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    (async () => {
      const data = await getHistoryData2("/products", user!._id);
      setSellHistoryData(data);
    })();
  }, []);

  return (
    <section className="w-[1000px]">
      <div className="pt-[6px]">
        <SellHistoryTable sellHistoryData={sellHistoryData} />
      </div>
    </section>
  );
}

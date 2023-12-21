"use client";

import { useEffect, useState } from "react";
import { SellHistoryTable } from "../_components/_index";
import getHistoryData from "../_functions/getHistoryData";

export default function SellHistory() {
  const [sellHistoryData, setSellHistoryData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getHistoryData("seller/products");
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

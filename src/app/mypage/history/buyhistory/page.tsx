"use client";

import { useEffect, useState } from "react";
import { BuyHistoryTable } from "../_components/_index";
import getHistoryData from "../_functions/getHistoryData";

export default function BuyHistory() {
  const [buyHistoryData, setBuyHistoryData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getHistoryData("orders");
      setBuyHistoryData(data);
    })();
  }, []);

  return (
    <section className="w-[1000px]">
      <div className="pt-[6px]">
        <BuyHistoryTable buyHistoryData={buyHistoryData} />
      </div>
    </section>
  );
}

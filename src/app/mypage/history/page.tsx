"use client";

import { useState, useEffect } from "react";
import getHistoryData, { getHistoryData2 } from "./_functions/getHistoryData";
import {
  BuyHistoryTable,
  Membership,
  MoreButton,
  SellHistoryTable,
} from "./_components/_index";
import { useUserStore } from "@/stores/_index";

export default function History() {
  const [buySlicedHistoryData, setBuySlicedHistoryData] = useState([]);
  const [sellSlicedHistoryData, setSellSlicedHistoryData] = useState([]);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    (async () => {
      const [buyData, sellData] = await Promise.all([
        getHistoryData("orders"),
        getHistoryData2("products", user!._id),
      ]);

      const buySlicedData = buyData.slice(0, 5);
      setBuySlicedHistoryData(buySlicedData);

      const sellSlicedData = sellData.slice(0, 5);
      setSellSlicedHistoryData(sellSlicedData);
    })();
  }, []);

  return (
    <section className="w-[1000px]">
      {/* 1. 여백 공간 */}
      <div className="h-[67px]"></div>

      {/* 2. 멤버쉽 박스 */}
      <Membership />

      {/* 3. 구매 내역 */}
      <div className="relative">
        <BuyHistoryTable buyHistoryData={buySlicedHistoryData} />
        <MoreButton href={"/mypage/history/buyhistory"} />
      </div>

      {/* 4. 판매 내역 */}
      <div className="relative">
        <SellHistoryTable sellHistoryData={sellSlicedHistoryData} />
        <MoreButton href={"/mypage/history/sellhistory"} />
      </div>
    </section>
  );
}

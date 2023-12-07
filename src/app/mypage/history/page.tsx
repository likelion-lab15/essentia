"use client";

import { useState, useEffect } from "react";
import getHistoryData from "./_functions/getHistoryData";
import {
  BuyHistoryTable,
  Membership,
  MoreButton,
  SellHistoryTable,
} from "./_components/_index";

export default function History() {
  const [buySlicedHistoryData, setBuySlicedHistoryData] = useState([]);
  const [sellSlicedHistoryData, setSellSlicedHistoryData] = useState([]);

  useEffect(() => {
    (async () => {
      const buyData = await getHistoryData("https://localhost/api/orders");
      const buySlicedData = buyData.slice(0, 5);
      setBuySlicedHistoryData(buySlicedData);

      const sellData = await getHistoryData(
        "https://localhost/api/seller/products"
      );
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

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/_index";
import { MoreButton } from "./_index";

const BuyHistoryTable = () => {
  const [buyHistory, setBuyHistory] = useState([]);

  useEffect(() => {
    // 구매정보 불러오기
    (async () => {
      try {
        const response = await axios.get("https://localhost/api/orders", {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });
        const data = response.data.item.slice(0, 5);
        setBuyHistory(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="relative mb-[66px]">
      <table className="w-[100%]">
        <caption className="h-[64px] border-b-[3px] border-black text-left text-[28px] font-bold">
          구매 내역
        </caption>
        <tbody>
          <tr className="h-[50px] border-b-[1px] border-black text-[18px] font-bold">
            <th className="w-[10%]">구매일</th>
            <th className="w-[30%]">상품정보</th>
            <th className="w-[10%]">결제금액</th>
            <th className="w-[10%]">리뷰</th>
          </tr>
          {buyHistory?.map((item, index) => {
            const { cost, createdAt, products } = item;

            // 구매 상품이 1개 이상일 때
            const etc = products.length > 1 ? `외 ${products.length}개` : "";

            return (
              <tr
                key={index}
                className="h-[50px] border-b-[1px] border-black text-center text-[18px] font-medium"
              >
                <td className="w-[10%]">{createdAt.split(" ")[0]}</td>
                <td className="w-[30%] text-left">{`${products[0].name} ${etc}`}</td>
                <td className="w-[10%]">
                  {cost.total.toLocaleString("ko-KR")} 원
                </td>
                <td className="w-[10%]">
                  <button
                    type="button"
                    className="h-[50px] w-[70px] hover:bg-[#A0D1EF]"
                  >
                    작성
                  </button>
                  <button
                    type="button"
                    className="h-[50px] w-[70px] hover:bg-[#A0D1EF]"
                  >
                    수정
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <MoreButton path="/buyhistory" />
    </div>
  );
};

export default BuyHistoryTable;

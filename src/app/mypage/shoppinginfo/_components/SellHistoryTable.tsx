"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/_index";

const SellHistoryTable = () => {
  const [sellHistory, setSellHistory] = useState([]);

  useEffect(() => {
    // 구매정보 불러오기
    (async () => {
      try {
        const response = await axios.get(
          "https://localhost/api/seller/products",
          {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          }
        );
        const data = response.data.item;
        setSellHistory(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <table className="mb-[66px] w-[100%]">
      <caption className="h-[64px] border-b-[3px] border-black text-left text-[28px] font-bold">
        판매 내역
      </caption>
      <tbody>
        <tr className="h-[50px] border-b-[1px] border-black text-[18px] font-bold">
          <th className="w-[10%]">등록일</th>
          <th className="w-[30%]">상품정보</th>
          <th className="w-[10%]">판매금액</th>
          <th className="w-[10%]">상품관리</th>
        </tr>
        {sellHistory.map((item, index) => {
          const { createdAt, name, price } = item;

          // 상품 이름이 너무 길 때
          const truncateName =
            name.length > 35 ? name.slice(0, 35) + "..." : name;

          return (
            <tr
              key={index}
              className="h-[50px] border-b-[1px] border-black text-center text-[18px] font-medium"
            >
              <td className="w-[10%]">{createdAt.split(" ")[0]}</td>
              <td className="w-[30%] text-left">{truncateName}</td>
              <td className="w-[10%]">{price.toLocaleString("ko-KR")} 원</td>
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
  );
};

export default SellHistoryTable;

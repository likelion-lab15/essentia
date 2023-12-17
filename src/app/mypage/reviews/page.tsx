"use client";

import { axiosPrivate } from "@/api/axios";
import { useState, useEffect } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  // 리뷰 데이터 불러오기
  useEffect(() => {
    (async () => {
      try {
        const res = await axiosPrivate.get("replies");
        setReviews(res.data.item);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    })();
  }, []);

  return (
    <section className="w-[1000px]">
      <div className="pt-[6px]">
        <table className="mb-[66px] w-[100%]">
          <caption className="h-[64px] border-b-[3px] border-black text-left text-[28px] font-bold">
            내가 쓴 리뷰
          </caption>
          <tbody>
            <tr className="h-[50px] border-b-[1px] border-black text-[18px] font-bold">
              <th className="w-[10%]">등록일</th>
              <th className="w-[30%]">리뷰 제목</th>
              <th className="w-[10%]">리뷰 관리</th>
            </tr>
            {reviews.map((item, index) => {
              const { createdAt, name, extra } = item;

              // 제목 이름이 너무 길 때
              const truncateName =
                extra.title.length > 35
                  ? name.slice(0, 35) + "..."
                  : extra.title;

              return (
                <tr
                  key={index}
                  className="h-[50px] cursor-pointer border-b-[1px] border-black text-center text-[18px] font-medium"
                  onClick={() => console.log("클릭함!")}
                >
                  <td className="w-[10%]">{createdAt.split(" ")[0]}</td>
                  <td className="w-[30%] text-left">{truncateName}</td>
                  <td className="w-[10%]">
                    <button
                      type="button"
                      className="h-[50px] w-[70px] hover:bg-[#A0D1EF]"
                    >
                      삭제
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
      </div>
    </section>
  );
}

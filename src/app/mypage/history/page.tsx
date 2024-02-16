/* 김진우 */

import { getBuyHistory, getSellHistory } from "./_functions/_index";
import {
  BuyHistoryTable,
  Membership,
  MoreButton,
  SellHistoryTable,
} from "./_components/_index";

export default async function History() {
  /* 구매 내역, 판매 내역 불러오기 */
  const [buyData, sellData] = await Promise.all([
    getBuyHistory(),
    getSellHistory(),
  ]);

  return (
    <section className="w-[1000px]">
      {/* 1. 여백 공간 */}
      <div className="h-[67px]"></div>

      {/* 2. 멤버쉽 박스 */}
      <Membership />

      {/* 3. 구매 내역 */}
      <div className="relative">
        <BuyHistoryTable buyHistoryData={buyData.slice(0, 5)} />
        <MoreButton href={"/mypage/history/buyhistory"} />
      </div>

      {/* 4. 판매 내역 */}
      <div className="relative">
        <SellHistoryTable sellHistoryData={sellData.slice(0, 5)} />
        <MoreButton href={"/mypage/history/sellhistory"} />
      </div>
    </section>
  );
}

// import HistoryTable from "../_components/HistoryTable";
import {
  BuyHistoryTable,
  MemberShip,
  SellHistoryTable,
  SoldHistoryTable,
} from "./_components/_index";

export default function ShoppingInfo() {
  return (
    <section className="w-[1000px]">
      {/* 1. 여백 공간 */}
      <div className="h-[67px]"></div>

      {/* 2. 멤버쉽 박스 */}
      <MemberShip />

      {/* 3. 구매 내역 */}
      <BuyHistoryTable />

      {/* 4. 등록 내역 */}
      <SellHistoryTable />

      {/* 5. 판매 내역 */}
      <SoldHistoryTable />
    </section>
  );
}

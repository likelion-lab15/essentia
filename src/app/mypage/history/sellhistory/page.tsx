import { getSellHistory } from "../_functions/_index";
import { SellHistoryTable } from "../_components/_index";

export default async function SellHistory() {
  const sellHistoryData = await getSellHistory();

  return (
    <section className="w-[1000px]">
      <div className="pt-[6px]">
        <SellHistoryTable sellHistoryData={sellHistoryData} />
      </div>
    </section>
  );
}

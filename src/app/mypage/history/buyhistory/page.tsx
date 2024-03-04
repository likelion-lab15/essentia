import { getBuyHistory } from "../_functions/_index";
import { BuyHistoryTable } from "../_components/_index";

export default async function BuyHistory() {
  const buyHistoryData = await getBuyHistory();
  return (
    <section className="w-[1000px]">
      <div className="pt-[6px]">
        <BuyHistoryTable buyHistoryData={buyHistoryData} />
      </div>
    </section>
  );
}

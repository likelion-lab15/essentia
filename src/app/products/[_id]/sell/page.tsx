import SellForm from "./_components/SellForm";

export default function Sell() {
  return (
    <main className="mb-[100px] flex flex-col items-center">
      <div className="flex h-[180px] items-center justify-center">
        <h2 className="w-[900px] text-center text-36 font-bold">
          판매 상품 등록
        </h2>
      </div>
      <SellForm />
    </main>
  );
}

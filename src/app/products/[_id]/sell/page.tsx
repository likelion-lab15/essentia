import SellForm from "./_components/SellForm";

/* 데이터 fetching */
async function getData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}products/${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to 상품 데이터 fetch");
  }

  return res.json();
}

export default async function Sell({
  searchParams,
  params,
}: {
  searchParams: { amount: string };
  params: { _id: string };
}) {
  const targetId = params._id;
  const targetAmount = Number(searchParams.amount);
  const product = await getData(targetId);
  const productData = {
    name: product.item.name,
    brand: product.item.extra.brand,
    amount: product.item.extra.amount,
    price: product.item.price,
  };

  return (
    <main className="mb-[100px] flex flex-col items-center">
      <div className="flex h-[180px] items-center justify-center">
        <h2 className="w-[900px] text-center text-36 font-bold">
          판매 상품 등록
        </h2>
      </div>
      {/* 상품 정보 가져오기 - 브랜드, 상품명, 용량 */}
      <section className="w-[1200px]">
        <div className="mt-[50px] h-[138px] border-b-[1px] border-tertiary">
          <label htmlFor="name" className="text-18 font-bold">
            브랜드
          </label>
          <span className="ml-[85px] inline-block w-[745px] border-b-[5px] border-primary text-32 font-semibold">
            {productData.brand}
          </span>
        </div>
        <div className="mt-[50px] h-[138px] border-b-[1px] border-tertiary pb-[50px]">
          <label htmlFor="name" className="text-18 font-bold">
            상품명
          </label>
          <span className="ml-[85px] inline-block w-[745px] border-b-[5px] border-primary text-32 font-semibold">
            {productData.name}
          </span>
        </div>
        <div className="mt-[50px] h-[138px] border-b-[1px] border-tertiary pb-[50px]">
          <label htmlFor="name" className="text-18 font-bold">
            용량
          </label>
          <span className="ml-[102px] inline-block w-[745px] border-b-[5px] border-primary text-32 font-semibold">
            {targetAmount}ml
          </span>
        </div>
        <SellForm amount={targetAmount} fixed={productData.price} />
      </section>
    </main>
  );
}

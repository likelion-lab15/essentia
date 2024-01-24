/* eslint-disable @next/next/no-img-element */
// import { useProductStore } from "@/stores/useProductStore";
// import { useUserStore } from "@/stores/useUserStore";
// import ButtonBox from "./_components/ButtonBox";

/* 데이터 fetching */
async function getData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}products/${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ProductInfo({ id }: { id: string }) {
  const result = await getData(id);
  console.log(result.item);

  const productData = {
    name: result.item.name,
    price: result.item.price,
    brand: result.item.extra.brand,
    amount: result.item.extra.amount,
    content: result.item.content,
    image: result.item.mainImages[0].path,
  };

  console.log(productData);

  // setProduct(productData); // Zustand 스토어에 상품 정보 저장

  return (
    <section className="flex h-[660px] w-[1280px] items-center justify-center ">
      {/* 상품 구매 + 판매 SECTION */}
      <div className="flex h-[560px] w-full flex-row items-center justify-between pl-[60px] pr-[60px]">
        {/* 향수 이미지 */}
        <div className="flex h-[560px] w-[560px] flex-col items-center justify-center">
          <img
            alt="향수 이미지"
            src={`${process.env.NEXT_PUBLIC_API_SERVER}${productData.image}`}
            width={450}
            height={450}
            className="bg-product"
          ></img>
        </div>
        {/* 사용자 상호작용 */}
        <div className="h-[444] w-[560px]">
          <p className="mb-[15px] h-[32px] w-[560px] border-b border-primary text-22 font-bold">
            {productData.brand}
          </p>
          <p className="text-30 font-medium">{productData.name}</p>
          <div className="flex-rowtext-16 mb-[34px] flex font-medium text-tertiary">
            {productData.amount &&
              productData.amount.map((amount, index) => (
                <p className=" pr-[10px]" key={index}>
                  {amount}ml
                </p>
              ))}
          </div>
          <p className="mb-[18px] w-[560px] text-14 font-medium text-tertiary">
            {productData.content}
          </p>
          <div className="mb-[15px] flex w-[560px] flex-row items-baseline justify-end">
            <p className="mr-[8px] text-18 font-semibold text-accent">발매가</p>
            <p className="text-28 font-bold">
              {productData.price.toLocaleString()}원
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

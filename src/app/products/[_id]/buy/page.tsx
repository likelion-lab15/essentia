import BuyButton from "./_components/BuyButton";
import BackButton from "./_components/BackButton";
import Image from "next/image";
import { Key } from "react";

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

export default async function Buy({
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
    price: product.item.price,
    brand: product.item.extra.brand,
    amount: product.item.extra.amount,
    content: product.item.content,
    image: product.item.mainImages[0].path,
  };
  const targetProductsList = product.item.options.item;
  const renderProduct = targetProductsList.filter(
    (item: { extra: { amount: number } }) => item.extra?.amount === targetAmount
  );

  const lowestPrice = renderProduct.reduce(
    (min: number, item: { price: number }) => {
      return item.price < min ? item.price : min;
    },
    Number.POSITIVE_INFINITY
  );

  return (
    <div className="mb-[300px] flex flex-col items-center justify-center">
      {/* 페이지 제목 */}
      <h2 className="flex h-[100px] w-[1280px] items-center justify-center pt-[50px] text-36 font-bold text-primary">
        구매하기
      </h2>
      <div>
        {/* 구매할 상품 정보 */}
        <div className="mb-[25px] flex h-[300px] w-[800px] items-center justify-center border-b-2 border-primary">
          {/* 이미지 */}
          <Image
            src={`${process.env.NEXT_PUBLIC_API_SERVER}${productData.image}`}
            width={200}
            height={200}
            alt="상품 이미지"
            className="border-2 border-primary bg-product"
          />
          {/* 상품 정보 */}
          <div className="ml-[40px] flex h-[200px] w-[500px] flex-col justify-between">
            <div>
              <p className="border-b-2 border-primary text-22 font-bold">
                {productData.brand}
              </p>
              <p className="text-30 font-medium">{productData.name}</p>
            </div>
            <p className="flex flex-row text-22 font-medium">
              {targetAmount}ml
            </p>
            <div className="flex flex-row justify-between">
              <div className="flex w-[200px] flex-row items-baseline justify-start text-tertiary">
                <p className="mr-[10px] text-16 font-semibold">발매가</p>
                <p className="text-28 font-bold">
                  {productData.price.toLocaleString()}원
                </p>
              </div>
              <div className="flex w-[200px] flex-row items-baseline justify-end">
                <p className="mr-[10px] text-16 font-semibold text-accent">
                  최저가
                </p>
                <p className="text-28 font-bold">
                  {(
                    lowestPrice === Number.POSITIVE_INFINITY
                      ? null
                      : lowestPrice
                  )
                    ? `${lowestPrice.toLocaleString()}원`
                    : "- 원"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-[25px] flex w-[800px] flex-row flex-wrap justify-center pl-[25px] pr-[25px] text-18">
          {renderProduct.length === 0 ? (
            <p className="text-18 font-semibold">
              현재 등록된 판매상품이 없습니다. 🥲
            </p>
          ) : (
            renderProduct.map(
              (
                item: {
                  extra: { restamount: number; date: string };
                  price: number;
                  _id: number;
                },
                index: Key
              ) => (
                <div
                  key={index}
                  className="flex w-[800px] flex-row justify-between"
                >
                  <div className="mb-[15px] flex h-[60px] w-[600px] border-b-2 border-t-2 border-primary bg-white text-primary hover:bg-secondary">
                    <p className="flex h-[60px] flex-1 items-center justify-center">
                      남은용량 : {item.extra.restamount}ml
                    </p>
                    <p className="flex h-[60px] flex-1 items-center justify-center">
                      판매금액 : {Number(item.price).toLocaleString()}원
                    </p>
                    <p className="flex h-[60px] flex-1 items-center justify-center">
                      구매일자 :{" "}
                      {`${item.extra.date.substring(
                        0,
                        4
                      )}.${item.extra.date.substring(
                        4,
                        6
                      )}.${item.extra.date.substring(6, 8)}`}
                    </p>
                  </div>
                  <BuyButton
                    productId={targetId}
                    buyProductId={item._id}
                    amount={targetAmount}
                  />
                </div>
              )
            )
          )}
        </div>
        {/* 뒤로가기 버튼 */}
        <div className="flex h-[100px] w-[800px] items-center justify-center">
          <BackButton />
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import ButtonBox from "./_components/ButtonBox";
import { getAccessToken } from "@/utils/_index";
import { fetchData } from "@/fetch/fetch";

/* 상품 데이터 fetching */
async function getData(id: string) {
  // 부모 상품의 데이터를 가져옵니다.
  return fetchData(`products/${id}`);
}

/* 위시리스트 데이터 fetching */
async function getWishList(id: string) {
  const accessToken = (await getAccessToken()) as string;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/bookmarks/products/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-cache",
    }
  );
  if (!res.ok) {
    return false;
  }
  return true;
}

export default async function ProductInfo({ id }: { id: string }) {
  const result = await getData(id);
  const wishlistStatus = await getWishList(id);
  const productData = {
    name: result.name,
    price: result.price,
    brand: result.extra.brand,
    amount: result.extra.amount,
    content: result.content,
    image: result.mainImages[0].path,
  };

  return (
    <section className="flex h-[660px] w-[1280px] items-center justify-center ">
      {/* 상품 구매 + 판매 SECTION */}
      <div className="flex h-[560px] w-full flex-row items-center justify-between pl-[60px] pr-[60px]">
        {/* 향수 이미지 */}
        <div className="flex h-[560px] w-[560px] flex-col items-center justify-center">
          <Image
            alt="향수 이미지"
            src={`${process.env.NEXT_PUBLIC_API_SERVER}/${productData.image}`}
            width={450}
            height={450}
            className="bg-product"
          ></Image>
        </div>
        {/* 사용자 상호작용 */}
        <div className="h-[444] w-[560px]">
          <p className="mb-[15px] h-[32px] w-[560px] border-b border-primary text-22 font-bold">
            {productData.brand}
          </p>
          <p className="text-30 font-medium">{productData.name}</p>
          <div className="flex-rowtext-16 mb-[34px] flex font-medium text-tertiary">
            {productData.amount &&
              productData.amount.map((amount: string, index: number) => (
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
          <ButtonBox
            id={id}
            amount={productData.amount}
            wishListStatus={wishlistStatus}
          />
        </div>
      </div>
    </section>
  );
}

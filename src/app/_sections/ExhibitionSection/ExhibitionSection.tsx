import { Button, CardCarousel } from "./_components/_index";

async function getProductsData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ExhibitionSection() {
  const ExhibitionData = await getProductsData();

  return (
    <section className="mb-[80px] mt-[80px] flex h-[800px] w-full flex-col">
      {/* 1. 섹션 제목 */}
      <div className="mx-auto w-[1280px]">
        <p className="mb-[24px] cursor-default font-gmarket text-[60px]">
          가을에 어울리는 향수 기획전
        </p>
        <p className="mb-[40px] cursor-default text-[18px] font-medium">
          찬바람 불기 시작할 때! 가을향수 구매타이밍은 지금!
        </p>
        {/* 2. 상품페이지 이동 버튼 */}
        <Button />
      </div>
      {/* 3. 캐러셀 */}
      <div className="mx-auto w-[1280px]">
        <CardCarousel cardlist={ExhibitionData.item.slice(1, 10)} />
      </div>
    </section>
  );
}

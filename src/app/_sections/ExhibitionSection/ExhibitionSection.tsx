import { Button } from "./_components/_index";
import { CardCarousel } from "@/containers/_index";
import { fetchData } from "@/fetch/fetch";

export default async function ExhibitionSection() {
  const ExhibitionData = await fetchData(`products`);

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
      <div className="mx-auto w-[1382px]">
        <CardCarousel cardListData={ExhibitionData.slice(0, 9)} />
      </div>
    </section>
  );
}

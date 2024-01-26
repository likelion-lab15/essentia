import { Button } from "./_components/_index";

export default function ExhibitionSection() {
  return (
    <section className="mb-[80px] mt-[80px] flex h-[800px] w-full flex-col">
      {/* 1. 섹션 제목 */}
      <div className="ml-[200px]">
        <p className="mb-[24px] cursor-default font-gmarket text-[60px]">
          가을에 어울리는 향수 기획전
        </p>
        <p className="mb-[40px] cursor-default text-[18px] font-medium">
          찬바람 불기 시작할 때! 가을향수 구매타이밍은 지금!
        </p>
        <Button />
      </div>
    </section>
  );
}

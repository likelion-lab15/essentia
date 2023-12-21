import Link from "next/link";
import Image from "next/image";

export default function MagazineSection() {
  return (
    <div className="h-[800px] w-[1440px] bg-primary px-[150px] py-[80px]">
      <h1 className="text-68 font-bold text-secondary">MAGAZINE</h1>
      <p className="text-18 font-medium text-white">
        ESSENTIA MAGAZINE은 일상에서 시작하여 감각적인 향수로 새로운 삶을
        탐험하며, 향기의 매력으로 일상을 더욱 풍요롭게 만듭니다.
      </p>
      <p className="text-18 font-medium text-white">
        ESSENTIA과 함께라면, 당신의 향기로 가득한 평범한 순간마저도 특별한
        기억이 될 것입니다.
      </p>

      <div className="mt-[40px] flex gap-[65px]">
        <Link href="/" className="relative h-[450px] w-[370px]">
          <Image
            src="/magazine-1.svg"
            alt="매거진 첫번째 아이콘"
            width={370}
            height={450}
          />
          <div className="absolute left-[20px] top-[295px]">
            <h3 className="mb-[10px] text-20 font-bold text-secondary">
              조향의 미학: 향기와 예술의 만남
            </h3>
            <p className="w-[320px] text-14 font-medium text-secondary">
              조향사가 소개하는 그들만의 감각과 예술적 소양이 어우러진 향수들을
              만나보세요. 향수의 제작 과정, 영감, 그리고 특별한 향수들의
              이야기를 담아내어 향의 예술에 대한 새로운 시선을 소개합니다.
            </p>
          </div>
        </Link>
        <Link href="/" className="h-[450px] w-[320px]">
          <Image
            src="/magazine-2.svg"
            alt="매거진 두번째 아이콘"
            width={320}
            height={310}
          />
          <div className="mt-[10px]">
            <h3 className="mb-[10px] text-20 font-semibold text-white">
              기다려온 겨울의 장면
            </h3>
            <p className="w-[320px] text-14 font-medium text-white">
              겨울이 성큼 다가왔어요. 뽀얗고 흐릿한 계절 속 리본을 좋아하는 한
              소녀의 기억과 여정을 담은 셀리테일즈의 겨울 컬렉션을 소개합니다.
            </p>
          </div>
        </Link>
        <Link href="/" className="h-[450px] w-[320px]">
          <Image
            src="/magazine-3.svg"
            alt="매거진 세번째 아이콘"
            width={320}
            height={310}
          />
          <div className="mt-[10px]">
            <h3 className="mb-[10px] text-20 font-semibold text-white">
              본질과 양면의 가치
            </h3>
            <p className="w-[320px] text-14 font-medium text-white">
              겨울과 꼭 어울리는 포근한 공간을 위한 홈데코 아이템을 추천해요.
              아티쉬의 다양한 인테리어 소품들을 단독 할인 혜택으로 만나보세요.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

import { Header, Button } from "@/components/_index";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetail() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center">
        {/* 메인 섹션 */}
        <section className="h-[676px] w-[1280px] ">
          <div className="flex h-[560px] w-full flex-row items-center justify-between pl-[60px] pr-[60px]">
            {/* 향수 이미지 */}
            <div className="flex h-[560px] w-[560px] flex-col items-center justify-center">
              <Image
                alt="santal33"
                src="/santal33.png"
                width={450}
                height={450}
              ></Image>
            </div>

            {/* 상품 정보 및 상호작용 */}
            <div className="h-[444] w-[560px]">
              <p className="mb-[15px] h-[32px] w-[560px] border-b border-primary text-22 font-bold">
                LE LABO
              </p>
              <p className="text-30 font-medium"> SANTAL 33</p>
              <p className="mb-[34px] text-16 font-medium text-tertiary">
                50ml 100ml
              </p>
              <p className="mb-[18px] w-[560px] text-14 font-medium text-tertiary">
                미 서부의 와일드한 평원에 고독하게 앉아있다고 상상해 보세요.
                모닥불의 불빛이 드리우고 머리 위로는 인디고블루의 밤하늘이
                펼쳐집니다. 주변에는 사막의 부드러운 바람을 제외하고 아무것도
                없습니다. 당신은 자유로워요.
              </p>
              <div className="mb-[15px] flex w-[560px] flex-row items-baseline justify-end">
                <p className="mr-[14px] text-14 font-medium">50ml</p>
                <p className="text-28 font-bold">169,000원</p>
              </div>

              <div className="mb-[16px] h-[46px] w-[560px] border">
                drop down box
              </div>
              {/* 버튼 박스 */}
              <div className="mb-[16px] flex w-[560px] justify-between">
                <Button
                  className="h-[46px] w-[275px] border border-primary bg-white text-primary"
                  label="바로 구매하기"
                  type="button"
                ></Button>
                <Button
                  className="h-[46px] w-[275px]"
                  label="판매하기"
                  type="button"
                ></Button>
              </div>
              <Button
                className="h-[46px] w-[560px] border border-primary bg-white text-primary"
                label="위시 리스트에 추가하기"
                type="button"
              ></Button>
            </div>
          </div>
        </section>
        <nav
          aria-label="상품 상세 네비게이션"
          className="flex h-[64px] w-full flex-row justify-center border border-green-400"
        >
          <ul className="text-primary-500 flex h-[62px] w-[500px] justify-center border border-orange-600 text-16">
            <li>
              <Link href="/" accessKey="1">
                상품 상세정보
              </Link>
            </li>
            <li>
              <Link href="/" accessKey="2">
                교환 및 반품안내
              </Link>
            </li>
            <li>
              <Link href="/" accessKey="3">
                리뷰
              </Link>
            </li>
            <li>
              <Link href="/" accessKey="4">
                추천 상품
              </Link>
            </li>
          </ul>
        </nav>
        {/* 상세 이미지 섹션 */}
        <section className="h-[2000px] w-[1280px] border border-secondary">
          <h3>제품 설명 이미지</h3>
        </section>
        {/* 상세 이미지 섹션 */}
        <section className="h-[1450px] w-[1280px] border border-blue-500">
          <div className="h-[555px] border border-pink-700">
            <h3>REVIEW</h3>
          </div>
          <div className="h-[600px] border border-pink-700">
            <h3>추천 상품</h3>
          </div>
        </section>
      </main>
    </>
  );
}

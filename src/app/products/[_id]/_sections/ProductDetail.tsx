import Image from "next/image";
import ReviewList from "./_components/ReviewList";
import Link from "next/link";
import { CardCarousel } from "@/containers/_index";

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

async function getProductsData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

type TReview = {
  content: string;
  title: string;
  extra: {
    title: string;
  };
  user: {
    name: string;
  };
  createdAt: string;
};

type TItem = {
  replies: TReview[];
};

export default async function ProductDetail({ id }: { id: string }) {
  const result = await getData(id);
  const ExhibitionData = await getProductsData();
  const productData = {
    replyItem: result.item.options.item,
    detailImage: result.item.mainImages[1].path,
  };

  // 하위에 등록된 제품들의 리뷰를 가져오는 코드
  const reviewsArray: TReview[] = productData.replyItem
    .flatMap((item: TItem) =>
      Array.isArray(item?.replies)
        ? item.replies.map((review) => ({
            content: review.content,
            title: review.extra.title,
            author: review.user.name,
            createdAt: review.createdAt,
          }))
        : []
    )
    .filter((review: TReview) => review.content && review.title);

  console.log("등록된 리뷰 목록", reviewsArray);

  // 총 리뷰개수
  const numberOfReviews = reviewsArray.length;

  console.log("총 리뷰 개수", numberOfReviews);

  const navItems = [
    { label: "상세정보", section: "detailInfo" },
    { label: "검수기준", section: "returnInfo" },
    { label: `REVIEW (${numberOfReviews})`, section: "review" },
    {
      label: "추천 상품",
      section: "recommendedProducts",
    },
  ];

  return (
    <>
      {/* 상세 네비게이션 */}
      <nav
        aria-label="상품 상세 네비게이션"
        className="sticky top-[79px] z-10 flex h-[64px] w-full flex-row justify-center border-b border-t border-primary bg-white"
      >
        <ul className="flex h-[62px] w-[800px] flex-row justify-between text-16 font-semibold text-primary">
          {navItems.map((item) => (
            <li key={item.section}>
              <Link
                href={`#${item.section}`}
                className={`flex h-[64px] w-[200px] items-center justify-center hover:text-secondary`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* 상세 이미지 */}
      <section
        id="detailInfo"
        className="mb-[100px] flex h-[1800px] w-[1280px] items-center justify-center"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_API_SERVER}${productData.detailImage}`}
          alt="제품 상세 이미지"
          width={800}
          height={1789}
        ></Image>
      </section>
      {/* 검수 기준 */}
      <section
        id="returnInfo"
        className="mb-[100px] mt-[100px] flex h-[800px] w-[1280px] flex-col"
      >
        <h3 className="border-b-2 border-primary pb-[30px] text-48 font-bold">
          검수 기준
        </h3>
        <div className="pt-[50px] text-14 text-primary">
          <p>
            ONYX는 보다 공정하고 효율적인 거래 환경을 제공하기 위해 검수 기준을
            지속적으로 업데이트하고 있습니다. 거래에 앞서 최신 검수기준을
            참고하시기 바랍니다.
          </p>
          <p>
            ONYX를 통해 거래되는 제품은 당사의 검수팀에 의해 정품 요건 충족 여부
            및 철저한 컨디션 확인 이후 검수 합격 시에만 출고됩니다.
          </p>
          <p className="mt-[10px] font-bold">향수 거래 주의사항</p>
          <p>
            ONYX는 정가품 판정 및 검수기준에 의한 기본 품질 확인을 수행하고
            있으나, 통신판매 중개자로서 제조업체의 제품별 보증에 대해서는 책임을
            지지 않습니다.
          </p>
          <p>
            제품 기능에 관한 사항이나 기타 제품 관련 질문은 제조업체에
            문의하시기 바랍니다. 단, 제조업체의 A/S 여부는 보장하지 않습니다.
            (이용약관 제22조 4항 참고)
          </p>
          <p>
            실링/밀봉 패키지 개봉 시 가치가 하락할 수 있는 상품의 경우 내용물은
            검수하지 않습니다. 상품 정보 확인, 박스 상태 점검 및 재포장 흔적
            유무에 대한 다방면 검수가 진행됩니다.
          </p>
          <p>미사용 상태 유지를 위해 정상작동 여부는 확인이 불가합니다.</p>
          <p className="mt-[10px] font-bold">[판매자] 유의 사항</p>
          <p>
            검수 시 타 검수 플랫폼의 검수택이 제거될 수 있습니다. (주문서, 송장
            포함)
          </p>
          <p>
            상품 입고시 검수기준과 무관한 스티커, 폴리백, 사은품 등은 제거될 수
            있습니다.
          </p>
          <p className="mt-[10px] font-bold">[구매자] 유의 사항</p>
          <p>
            타 중개 플랫폼 스티커 등의 제거가 어려울 경우 ONYX 인증 스티커가
            덧댐이 되어 발송될 수 있습니다.
          </p>
          <p>
            정식 발매처에서 부착한 2차 실링은 제조사에서 부착한 1차 실링과
            동일한 기준 적용 대상입니다.
          </p>
          <p>
            작동 여부의 경우 미사용 상태를 유지하기 위해 확인이 불가능하며, 작동
            및 기능 문제는 제조업체에 문의하시기 바랍니다.
          </p>
          <p>
            ONYX의 검수기준으로 고지된 사항 이외 아래와 같이 제조사에서 불량으로
            인정하지 않는 기준, 또는 당사 검수기준에 따라 그 여부를 명확히
            분별할 수 없는 상품의 경우 하자로 판단하지 않으며, <br></br> 이로
            인한 구매 취소는 불가하므로 신중한 거래 부탁드립니다.
          </p>
          <p className="mt-[10px] ">- 배송 과정에서 발생한 패키지의 손상</p>
          <p className="mt-[10px] ">
            - 유통 및 보관과정에서 발생할 수 있는 실링의 변형 혹은 교체
          </p>
          <p className="mt-[10px] ">
            - 제조공정, 유통과정 또는 소재 특성 상 발생할 수 있는 사항
          </p>
          <p className="mt-[10px] ">
            - 이외 제조사 생산 검품 기준을 통과한 기준 항목 명시된 검수 기준에
            해당하지 않는 제품 상태, 제조 및 유통 과정에서 발생 가능한 현상 및
            이로 인한 개체 차이의 경우 검수센터 책임자의 최종 판단하에 합격 여부
            결정됩니다.
          </p>
          <p className="pt-[70px] text-center text-18 font-bold">
            ONYX의 검수기준에 동의하지 않으실 경우 거래가 불가하오니 거래
            당사자는 거래에 앞서 ONYX의 검수기준을 반드시 검토하시기 바랍니다.
          </p>
        </div>
      </section>
      <div className="mb-[100px] h-0 w-full border-b-2 border-primary"></div>
      {/* 리뷰 */}
      <ReviewList numberOfReviews={numberOfReviews} reviews={reviewsArray} />
      {/* 추천 상품 */}
      <section id="recommendedProducts" className="h-[800px] w-[1280px]">
        <h3 className="pb-[60px] text-48 font-bold">추천 상품</h3>
        <CardCarousel cardListData={ExhibitionData.item.slice(0, 9)} />
      </section>
    </>
  );
}

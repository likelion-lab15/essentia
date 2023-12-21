"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";

export default function ProductDetail({ id }) {
  /* 상태 변수 선언 */
  // 현재 활성화된 섹션을 추적하기 위한 상태
  const [activeSection, setActiveSection] = useState("");

  // 리뷰 데이터 관리를 위한 상태
  const [reviews, setReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [countReviews, setCountReviews] = useState(0);

  // 페이지네이션을 위한 상태
  const [currentPage, setCurrentPage] = useState(1);

  // 각 섹션에 대한 참조
  const detailInfoRef = useRef(null);
  const returnInfoRef = useRef(null);
  const reviewRef = useRef(null);
  const recommendedProductsRef = useRef(null);

  /* 상수 선언 */
  const REVIEWS_PER_PAGE = 5;
  const pageCount = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  // 현재 페이지의 리뷰 데이터
  const currentReviews = reviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  /* 함수 선언 */
  // 페이지 전환 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setActiveIndex(null);
  };

  // 해당 섹션으로 스크롤 이동
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    const headerHeight = 170;
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - headerHeight,
        behavior: "smooth",
      });
    }
  };

  // 스크롤에 따라 현재 섹션을 감지
  const checkActiveSection = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    const refs: { [key: string]: React.MutableRefObject<null> } = {
      detailInfo: detailInfoRef,
      returnInfo: returnInfoRef,
      review: reviewRef,
      recommendedProducts: recommendedProductsRef,
    };

    for (const section in refs) {
      const ref = refs[section];
      if (ref.current) {
        const offsetTop = ref.current.offsetTop;
        const offsetBottom = offsetTop + ref.current.offsetHeight;
        if (scrollPosition > offsetTop && scrollPosition < offsetBottom) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  // API 호출 및 데이터 가져오기
  async function getProductInfo() {
    try {
      console.log("getProductDetail Id: ", id);
      const response = await axios.get(`https://localhost/api/products/${id}`);
      const result = response.data;
      return result.item.replies;
    } catch (error) {
      console.error("Error 🥲", error);
      return [];
    }
  }

  // 컴포넌트 마운트 시 API 호출
  useEffect(() => {
    const fetchData = async () => {
      const replies = await getProductInfo();
      setReviews(replies);
      setCountReviews(replies.length);
    };
    fetchData();
  }, []);

  // 스크롤 이벤트 리스너 추가
  useEffect(() => {
    window.addEventListener("scroll", checkActiveSection);

    return () => {
      window.removeEventListener("scroll", checkActiveSection);
    };
  }, []);

  // 리뷰 아코디언 토글 함수
  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const navItems = [
    { label: "상세정보", ref: detailInfoRef, section: "detailInfo" },
    { label: "검수기준", ref: returnInfoRef, section: "returnInfo" },
    { label: `REVIEW (${countReviews})`, ref: reviewRef, section: "review" },
    {
      label: "추천 상품",
      ref: recommendedProductsRef,
      section: "recommendedProducts",
    },
  ];

  return (
    <>
      {/* 상세페이지 네비게이션  */}
      <nav
        aria-label="상품 상세 네비게이션"
        className="sticky top-[79px] z-10 flex h-[64px] w-full flex-row justify-center border-b border-t border-primary bg-white"
      >
        <ul className="flex h-[62px] w-[800px] flex-row justify-between text-16 font-semibold text-tertiary">
          {navItems.map((item) => (
            <li key={item.section}>
              <button
                onClick={() => scrollToSection(item.ref)}
                className={`flex h-[64px] w-[200px] items-center justify-center hover:text-primary ${
                  activeSection === item.section ? "font-bold text-primary" : ""
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {/* 상세 이미지 SECTION */}
      <section
        ref={detailInfoRef}
        className="mb-[100px] flex h-[1800px] w-[1280px] items-center justify-center"
      >
        <Image
          src="/detailImage.png"
          alt="제품 상세 이미지"
          width={800}
          height={1789}
        ></Image>
      </section>
      <section
        ref={returnInfoRef}
        className="mb-[100px] mt-[100px] flex h-[700px] w-[1280px] flex-col"
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
      {/* 구분선 */}
      <div className="mb-[100px] h-0 w-full border-b-2 border-primary"></div>
      <div className="flex h-[1450px] w-[1280px] flex-col items-center ">
        {/* 리뷰 섹션 */}
        <section ref={reviewRef} className="mb-[100px] w-full overflow-y-auto ">
          <h3 className="border-b-2 border-primary pb-[40px] text-48 font-bold">
            REVIEW ({countReviews})
          </h3>
          {/* 리뷰 아코디언 */}
          <div className="text-20 font-medium">
            {currentReviews.map((review, index) => (
              <div
                key={review._id}
                className={`flex flex-col border-b-2 border-primary ${
                  activeIndex === index ? "bg-blue-100" : ""
                }`}
              >
                <button
                  className="flex w-full items-center justify-between p-[20px] text-left"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="flex-grow">{review.extra.title}</span>
                  <span className="w-[100px] text-center">
                    {review.extra.author}
                  </span>
                  <span className="w-[200px] text-right">
                    {new Date(review.createdAt).toLocaleDateString("ko-KR")}
                  </span>
                </button>
                <div
                  className={
                    activeIndex === index ? "max-h-[200px]" : "max-h-0"
                  }
                >
                  <div
                    className={`p-[20px] ${
                      activeIndex === index ? "block" : "hidden"
                    }`}
                  >
                    <p>{review.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* 페이지네이션 컴포넌트 */}
          <div className="mt-[40px] flex items-center justify-center text-24 font-bold">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                className="m-[5px] p-[10px]"
                key={i}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </section>
        {/* 추천 상품 */}
        <section
          ref={recommendedProductsRef}
          className="h-[600px] w-full border border-pink-700"
        >
          <h3 className="text-48 font-bold">추천 상품</h3>
        </section>
      </div>
    </>
  );
}

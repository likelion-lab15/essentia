/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

export default function HeroSection() {
  return (
    <section className="flex h-screen w-screen overflow-hidden">
      {/* 왼쪽 타이포 */}
      <div className="flex flex-grow-[3] items-center justify-center border-r border-tertiary bg-[#e1e1e1]">
        <div className="relative">
          <h2 className="relative left-[100px] top-[400px] z-10  text-left text-[180px] font-extrabold">
            2023 BEST AWARDS
          </h2>
          <img
            src="/heroSectionImage/b.png"
            alt=""
            className="relative left-[100px] top-[-200px] z-0 max-w-[800px]"
          ></img>
        </div>
        {/* <div className="h-[500px] w-[800px] border border-primary"></div> */}
      </div>
      <div className="z-20 flex max-w-[600px] flex-grow flex-row">
        {/* 왼쪽 이미지 */}
        <div className="relative w-1/2 max-w-[300px]">
          <div className="relative flex flex-col flex-nowrap items-center">
            {/* 원본 슬라이드 */}
            <div className="animate-infiniteAnimation1 flex flex-nowrap items-center">
              <img
                alt="향수 슬라이드 이미지 A"
                src="/HeroSectionImage/hero-set_1.png"
                style={{ width: "100%" }}
              ></img>
            </div>
            {/* 복제 슬라이드 */}
            <div className="animate-infiniteAnimation2 flex flex-nowrap items-center">
              <img
                alt="향수 슬라이드 이미지 A"
                src="/HeroSectionImage/hero-set_1.png"
                style={{ width: "100%" }}
              ></img>
            </div>
          </div>
        </div>
        {/* 오른쪽 이미지 */}
        <div className="relative w-1/2 max-w-[300px]">
          <div className="relative flex flex-col flex-nowrap items-center">
            {/* 원본 슬라이드 */}
            <div className="animate-infiniteAnimation3 flex flex-nowrap items-center">
              <img
                alt="향수 슬라이드 이미지 B-1"
                src="/HeroSectionImage/hero-set_2.png"
                style={{ width: "100%" }}
              ></img>
            </div>
            {/* 복제 슬라이드 */}
            <div className="animate-infiniteAnimation4 flex flex-nowrap items-center">
              <img
                alt="향수 슬라이드 이미지 B-2"
                src="/HeroSectionImage/hero-set_2.png"
                style={{ width: "100%" }}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

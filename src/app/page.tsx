import HeroSection from "./_sections/HeroSection";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <HeroSection />
      <section className="flex h-[800px] w-[1280px] items-center justify-center border-2">
        <h1>향수 기획전 캐러셀</h1>
      </section>
      <section className="flex h-[800px] w-[1280px] items-center justify-center border-2">
        <h1>매거진 추천</h1>
      </section>
      <section className="flex h-[800px] w-[1280px] items-center justify-center border-2">
        <h1>브랜드 리스트</h1>
      </section>
    </main>
  );
}

import {
  BrandListSection,
  MagazineSection,
  PerfumeCarousel,
  HeroSection,
} from "./_sections/_index";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <HeroSection />
      <PerfumeCarousel />
      <section className="flex h-[800px] w-[1440px] items-center justify-center border-2">
        <MagazineSection />
      </section>
      <section className="flex h-[800px] w-[1280px] items-center justify-center">
        <BrandListSection />
      </section>
    </main>
  );
}

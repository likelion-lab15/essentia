import {
  BrandListSection,
  MagazineSection,
  ExhibitionSection,
  HeroSection,
} from "./_sections/_index";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <HeroSection />
      <ExhibitionSection />
      <MagazineSection />
      <BrandListSection />
    </main>
  );
}

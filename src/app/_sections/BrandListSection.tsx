/* eslint-disable no-unused-vars */
"use client";

export default function BrandListSection() {
  const brands = [
    "Diptyque",
    "Aesop",
    "Maison Margiela",
    "Byredo",
    "Creed",
    "Le Labo",
    "Santa Maria Novella",
    "Tom Ford",
    "Jo Malone",
    "Dior",
    "Chanel",
    "Frederic Malle",
    "Giorgio Armani",
    "Kilian",
    "Maison Francis Kurkdjian",
    "Saint Laurent",
    "Gucci",
    "Buly 1803",
    "Kiehl's",
    "Acqua Di Parma",
    "Palace",
    "Nonfiction",
    "Valentino",
    "Prada",
    "Memo",
    "Malin+Goetz",
    "Celine",
    "Tamburins",
  ];

  const handleBrand = (brandName: string) => {
    window.location.href = "/products";
  };

  return (
    <div className="flex flex-wrap gap-[10px]">
      {brands.map((brand) => (
        <button
          key={brand}
          onClick={() => handleBrand(brand)}
          className="text-50 font-bold hover:text-secondary hover:underline"
        >
          {brand},
        </button>
      ))}
    </div>
  );
}

import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { getSelectedBrand } from "../_lib/getSelectedBrand";

type TProductsProps = {
  selectedBrand: string;
};

export default async function Products({ selectedBrand }: TProductsProps) {
  const products = await getSelectedBrand(selectedBrand);

  return (
    <div className="w-[984px]">
      <div className="max-h-full">
        <div className="flex justify-between">
          {/* 브랜드명 */}
          {selectedBrand && (
            <div className="mb-[20px] flex flex-row items-center gap-[5px]">
              <span className="text-16 font-medium text-tertiary">SHOP</span>
              <Image
                src="/products-right-icon.svg"
                alt="오른쪽 아이콘"
                width={24}
                height={24}
              />
              <span className="font-bold">{selectedBrand}</span>
            </div>
          )}
        </div>
        {/* 상품 목록 */}
        <ul className="flex w-[1000px] flex-row flex-wrap">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ul>
      </div>
    </div>
  );
}

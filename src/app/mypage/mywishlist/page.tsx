import { WishCardList } from "./_components/_index";

export default function MyWishList() {
  return (
    <section className="w-[1000px]">
      {/* 1. 제목 */}
      <div className="mb-[40px] flex h-[70px] items-center border-b-[3px] border-[#222]">
        <p className="text-[28px] font-bold">관심상품</p>
      </div>

      {/* 2. 장바구니 품목 */}
      <WishCardList />
    </section>
  );
}

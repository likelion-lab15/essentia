"use client";
export default function WishList() {
  // 찜 목록 불러오기
  const getWishList = async () => {
    try {
      const res = await axiosPrivate.get("bookmarks");
      return res.data.item;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <section className="flex w-[1000px] flex-wrap">
    </section>
  );
}

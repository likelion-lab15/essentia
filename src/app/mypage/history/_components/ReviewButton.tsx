"use client";

export default function ReviewButton({
  repliesData,
  id,
}: {
  repliesData: number[];
  id: number;
}) {
  const handleClick = () => {
    console.log("클릭!");
  };

  /* const handleClick = (buyHistory: TBuyHistory, product: TProduct) => () => {
    const { _id: orderId } = buyHistory;
    const { _id: productId, name, image, extra } = product;

    setReview({
      order_id: orderId,
      product_id: productId,
      brand: extra.brand,
      name: name,
      image: image,
    });

    router.push("/review");
  }; */

  if (repliesData.includes(id)) {
    return (
      <button type="button" className="h-[50px] w-[70px]" disabled>
        완료
      </button>
    );
  } else {
    return (
      <button
        type="button"
        className="h-[50px] w-[70px] hover:bg-[#A0D1EF]"
        onClick={() => handleClick()}
      >
        작성
      </button>
    );
  }
}

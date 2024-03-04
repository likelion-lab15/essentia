import Image from "next/image";
import { fetchPrivateData } from "@/fetch/fetch";
import { getAccessToken } from "@/utils/_index";

type TReply = {
  _id: number;
  content: string;
  createdAt: string;
  extra: {
    title: string;
  };
  product: {
    _id: number;
    name: string;
    image: {
      path: string;
      name: string;
      originalname: string;
    };
  };
};

export default async function MyReview() {
  const accessToken = await getAccessToken();
  const repliesData: TReply[] = await fetchPrivateData("replies", accessToken);

  return (
    <section className="w-[1000px]">
      {/* 1. 제목 */}
      <div className="mb-[40px] flex h-[70px] items-center border-b-[3px] border-[#222]">
        <p className="text-[28px] font-bold">내가 쓴 리뷰</p>
      </div>
      {repliesData?.map((reply) => {
        const { _id, createdAt, product, extra, content } = reply;

        return (
          <div key={_id} className="mb-[25px] flex bg-gray-100 p-[30px]">
            <div className="mr-[42px] flex flex-col">
              <div className="relative mb-[10px] h-[200px] w-[200px]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_SERVER}${product.image.path}`}
                  alt={product.image.originalname}
                  fill
                />
              </div>
              <span className="text-[16px] font-medium">{product.name}</span>
            </div>
            <div>
              <p className="font-bold">{extra.title}</p>
              <p className="mb-[10px]">{createdAt.split(" ")[0]}</p>
              <p>{content}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

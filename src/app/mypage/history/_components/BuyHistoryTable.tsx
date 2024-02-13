import { ReviewButton } from "./_index";
import { getRepliesData } from "../_functions/_index";

type TProduct = {
  _id: number;
  quantity: number;
  seller_id: number;
  name: string;
  image: {
    path: string;
    name: string;
    originalname: string;
  };
  price: number;
  extra: {
    brand: string;
    category: [];
    parent: number;
    depth: number;
    amount: number;
    restamount: number;
    date: string;
  };
};

type TBuyHistory = {
  _id: number;
  products: TProduct[];
  address: {
    name: string;
    value: string;
  };
  state: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  cost: {
    products: number;
    shippingFees: number;
    discount: {
      products: number;
      shippingFees: number;
    };
    total: number;
  };
};

type TBuyHistoryData = TBuyHistory[];

const BuyHistoryTable = async ({
  buyHistoryData,
}: {
  buyHistoryData: TBuyHistoryData;
}) => {
  const repliesData = await getRepliesData();

  return (
    <table className="mb-[66px] w-[100%]">
      <caption className="h-[64px] border-b-[3px] border-black text-left text-[28px] font-bold">
        구매 내역
      </caption>
      <tbody>
        <tr className="h-[50px] border-b-[1px] border-black text-[18px] font-bold">
          <th className="w-[10%]">구매일</th>
          <th className="w-[30%]">상품정보</th>
          <th className="w-[10%]">결제금액</th>
          <th className="w-[10%]">리뷰</th>
        </tr>
        {buyHistoryData?.map((buyHistory) => {
          const { createdAt, products } = buyHistory;

          return products.map((product, index) => {
            const { _id, name, price } = product;

            return (
              <tr
                key={index}
                className="h-[50px] border-b-[1px] border-black text-center text-[18px] font-medium"
              >
                <td className="w-[10%]">{createdAt.split(" ")[0]}</td>
                <td className="w-[30%] text-left">{name}</td>
                <td className="w-[10%] pr-[30px] text-right">
                  {price.toLocaleString("ko-KR")} 원
                </td>
                <td className="w-[10%]">
                  <ReviewButton repliesData={repliesData} id={_id} />
                </td>
              </tr>
            );
          });
        })}
      </tbody>
    </table>
  );
};

export default BuyHistoryTable;

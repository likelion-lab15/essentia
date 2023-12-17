"use client";

const BuyHistoryTable = ({ buyHistoryData }) => {
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
            const { name, price } = product;

          return (
            <tr
              key={index}
              className="h-[50px] border-b-[1px] border-black text-center text-[18px] font-medium"
            >
              <td className="w-[10%]">{createdAt.split(" ")[0]}</td>
                <td className="w-[30%] text-left">{name}</td>
                <td className="w-[10%]">{price.toLocaleString("ko-KR")} 원</td>
              <td className="w-[10%]">
                <button
                  type="button"
                  className="h-[50px] w-[70px] hover:bg-[#A0D1EF]"
                >
                  작성
                </button>
                <button
                  type="button"
                  className="h-[50px] w-[70px] hover:bg-[#A0D1EF]"
                >
                  수정
                </button>
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

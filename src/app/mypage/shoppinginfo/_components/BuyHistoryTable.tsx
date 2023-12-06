const BuyHistoryTable = () => {
  return (
    <table className="mb-[66px] w-[100%]">
      <caption className="h-[64px] border-b-[3px] border-black text-left text-[28px] font-bold">
        구매 내역
      </caption>
      <tbody>
        <tr className="h-[50px] border-b-[1px] border-black text-[18px] font-bold">
          <th>구매일</th>
          <th>상품정보</th>
          <th>결제금액</th>
          <th>리뷰</th>
        </tr>
        <tr className="h-[50px] border-b-[1px] border-black text-center text-[18px] font-medium">
          <td>2023.11.26</td>
          <td className="text-left">BYREDO 상탈 33 EDT</td>
          <td>195,000 원</td>
          <td>
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
      </tbody>
    </table>
  );
};

export default BuyHistoryTable;

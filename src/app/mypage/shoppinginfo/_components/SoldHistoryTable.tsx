const SoldHistoryTable = () => {
  return (
    <table className="mb-[66px] w-[100%]">
      <caption className="h-[64px] border-b-[3px] border-black text-left text-[28px] font-bold">
        판매 내역
      </caption>
      <tbody>
        <tr className="h-[50px] border-b-[1px] border-black text-[18px] font-bold">
          <th>판매일</th>
          <th>상품정보</th>
          <th>판매금액</th>
        </tr>
        <tr className="h-[50px] border-b-[1px] border-black text-center text-[18px] font-medium">
          <td>2023.11.26</td>
          <td className="text-left">BYREDO 상탈 33 EDT</td>
          <td>195,000 원</td>
        </tr>
      </tbody>
    </table>
  );
};

export default SoldHistoryTable;

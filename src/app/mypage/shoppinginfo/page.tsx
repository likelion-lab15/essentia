export default function ShoppingInfo() {
  return (
    <section className="w-[1000px]">
      {/* 1. 여백 공간 */}
      <div className="h-[67px]"></div>

      {/* 2. 멤버쉽 박스 */}
      <div className="mb-[65px] flex h-[150px] items-center justify-between bg-[#222] text-white">
        <div className="flex-1 py-[35px] pl-[40px]">
          <p className="text-[18px] font-regular">Membership</p>
          <p className="text-[45px] font-bold">Welcome</p>
        </div>
        <div className="w-[275px] py-[35px] pl-[40px]">
          <p className="text-[18px] font-regular">사용가능쿠폰</p>
          <p className="text-[45px] font-bold">1</p>
        </div>
        <div className="w-[275px] py-[35px] pl-[40px]">
          <p className="text-[18px] font-regular">마일리지</p>
          <p className="text-[45px] font-bold">924</p>
        </div>
      </div>

      {/* 3. 구매 내역 */}
      <div className="mb-[66px]">
        <table className="w-[100%]">
          <caption className="h-[64px] border-b-[3px] border-black text-left text-[28px] font-bold">
            구매 내역
          </caption>
          <tbody>
            <tr className="h-[50px] border-b-[1px] border-black text-[18px] font-bold">
              <th>주문일</th>
              <th>상품정보</th>
              <th>결제금액</th>
              <th>리뷰</th>
            </tr>
            <tr className="h-[50px] border-b-[1px] border-black text-center text-[18px] font-medium">
              <td>2023.11.26</td>
              <td className="text-left">BYREDO 상탈 33 EDT</td>
              <td>195,000 원</td>
              <td className="">
                <button type="button" className="h-[50px] w-[70px]">
                  작성
                </button>
                <button type="button" className="h-[50px] w-[70px]">
                  수정
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 4. 판매 내역 */}
      <div className="mb-[66px]">
        <table className="w-[100%]">
          <caption className="h-[64px] border-b-[3px] border-black text-left text-[28px] font-bold">
            판매 내역
          </caption>
          <tbody>
            <tr className="h-[50px] border-b-[1px] border-black text-[18px] font-bold">
              <th>등록일</th>
              <th>상품정보</th>
              <th>결제금액</th>
              <th>리뷰</th>
            </tr>
            <tr className="h-[50px] border-b-[1px] border-black text-center text-[18px] font-medium">
              <td>2023.11.26</td>
              <td className="text-left">BYREDO 상탈 33 EDT</td>
              <td>195,000 원</td>
              <td className="">
                <button type="button" className="h-[50px] w-[70px]">
                  작성
                </button>
                <button type="button" className="h-[50px] w-[70px]">
                  수정
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

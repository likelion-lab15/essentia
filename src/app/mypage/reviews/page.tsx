export default function Reviews() {
  return (
    <section className="w-[1000px]">
      <div className="pt-[6px]">
        <table className="mb-[66px] w-[100%]">
          <caption className="h-[64px] border-b-[3px] border-black text-left text-[28px] font-bold">
            내가 쓴 리뷰
          </caption>
          <tbody>
            <tr className="h-[50px] border-b-[1px] border-black text-[18px] font-bold">
              <th className="w-[10%]">등록일</th>
              <th className="w-[30%]">리뷰 제목</th>
              <th className="w-[10%]">리뷰 관리</th>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

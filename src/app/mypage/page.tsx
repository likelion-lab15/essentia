export default function MyPage() {
  return (
    <main>
      <h2>내 페이지</h2>
      {/* 상단 콘텐츠 */}
      <div>
        <span>TTP님</span>환영합니다
      </div>

      {/* 하단 콘텐츠 */}
      <div>
        <div>
          {/* 필터 */}
          <div>
            <p>MY PAGE</p>
            <div>
              <p>쇼핑 정보</p>
              <ul>
                <li>전체보기</li>
                <li>구매내역</li>
                <li>판매내역</li>
                <li>관심상품</li>
              </ul>
            </div>
            <div>
              <p>회원 정보</p>
              <ul>
                <li>회원정보 수정</li>
              </ul>
            </div>
          </div>
          {/* 페이지 콘텐츠 */}
          <div></div>
        </div>
      </div>
    </main>
  );
}

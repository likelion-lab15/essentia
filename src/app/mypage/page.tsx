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
        <p>MY PAGE</p>
        <div>
          <div>{/* 필터 */}</div>
          <div>{/* 페이지 콘텐츠 */}</div>
        </div>
      </div>
    </main>
  );
}

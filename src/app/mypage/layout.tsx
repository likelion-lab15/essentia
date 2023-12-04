import { ReactNode } from "react";
import { Filter } from "@/components/_index";

export default function layout({ children }: { children: ReactNode }) {
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
          <Filter />
          {/* 페이지 콘텐츠 */}
          {children}
        </div>
      </div>
    </main>
  );
}

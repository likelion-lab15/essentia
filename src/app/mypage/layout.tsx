import { ReactNode } from "react";
import { userInfoList, shoppingInfoList } from "@/constants/_index";
import { FilterList } from "@/components/_index";
import { Filter } from "@/containers/_index";
import { UserName } from "./_components/_index";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto w-[1280px]">
      {/* <h2>내 페이지</h2> */}
      {/* 상단 콘텐츠 */}
      <div className="relative mb-[62px] h-[300px] items-center border-b-[1px] border-black text-[32px]">
        <div className="absolute left-0 top-[50%]">
          {/* 사용자 이름 */}
          <UserName />
        </div>
      </div>
      {/* 하단 콘텐츠 */}
      <div className="flex">
        {/* 필터 */}
        <Filter title="MY PAGE">
          <FilterList list={shoppingInfoList} />
          <FilterList list={userInfoList} />
        </Filter>
        {/* 페이지 콘텐츠 */}
        {children}
      </div>
    </main>
  );
}

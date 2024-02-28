import Link from "next/link";
import Image from "next/image";
import naviList from "@/constants/naviList";
import { Logo, ToolTip, SignInToggleButton } from "@/components/_index";
import { getUserSession } from "@/utils/getServerSession";

export default async function Header() {
  // 유저 세션 저장
  const user = await getUserSession();

  return (
    <header
      role="banner"
      className="sticky top-0 z-[30] h-[80px] border-b border-primary bg-white"
    >
      <nav
        aria-label="메인 헤더 네비게이션"
        className="flex items-center justify-between pl-[60px] pr-[60px]"
      >
        {/* 좌측 로고 이미지 */}
        <Logo />
        {/* 중앙 페이지 네비게이션 */}
        <ul className="text-primary-500 flex h-[80px] w-[600px] justify-between text-16">
          {naviList.map((naviList, index) => (
            <li className="flex items-center" key={naviList.href}>
              <Link
                href={naviList.href}
                className="flex h-[80px] w-[110px] items-center justify-center hover:font-bold"
                accessKey={`${index + 1}`}
              >
                {naviList.text}
              </Link>
            </li>
          ))}
        </ul>
        {/* 우측 버튼 박스 */}
        <div className="ml-[100px] mr-[-15px] flex h-[80px] w-[220px] justify-end">
          {/* 검색 & 사용자 버튼 */}
          <ToolTip text="SEARCH">
            <button
              aria-label="검색창 열기"
              className="m-[5px] flex h-full w-full items-center justify-center bg-center bg-no-repeat p-[10px]"
            >
              <Image
                src="/search-icon.svg"
                alt="검색 아이콘"
                width={24}
                height={24}
              />
            </button>
          </ToolTip>
          {/* 마이페이지 <-> 회원가입 버튼 */}
          <ToolTip text={user ? "MYPAGE" : "SIGNUP"}>
            <Link
              href={user ? "/mypage/history" : "/signup"}
              className="m-[5px] flex h-full w-full items-center bg-center bg-no-repeat p-[10px]"
              aria-label="마이페이지로 이동하기"
            >
              <Image
                src="/user-icon.svg"
                alt=" 마이페이지 아이콘"
                width={24}
                height={24}
              />
            </Link>
          </ToolTip>
          {/* 로그인 <-> 로그아웃 버튼 */}
          <SignInToggleButton serverUserSession={user} />
          {/* 찜 목록 보기 버튼 */}
          {user && (
            <ToolTip text="WISHLIST">
              <Link
                href={"/mypage/mywishlist"}
                aria-label="찜 목록 보기"
                className="m-[5px] flex h-full w-full items-center bg-center bg-no-repeat p-[10px]"
              >
                <Image
                  src="/blackheart-icon.svg"
                  alt="찜 아이콘"
                  width={24}
                  height={24}
                />
              </Link>
            </ToolTip>
          )}
        </div>
      </nav>
    </header>
  );
}

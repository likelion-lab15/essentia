import Link from "next/link";
import Image from "next/image";
import naviList from "@/constants/naviList";
import { getServerSession } from "next-auth";
import { Logo, ToolTip } from "@/components/_index";

export default await function Header() {
  // 유저 세션 저장
  const userSession = getServerSession();

  return (
    <header
      role="banner"
      className="sticky top-0 z-[30] h-[80px] border-b border-primary bg-white"
    >
      <nav
        aria-label="메인 헤더 네비게이션"
        className="flex items-center justify-between  pl-[60px] pr-[60px]"
      >
        {/* 로고 이미지 */}
        <Logo />
        {/* 페이지 네비게이션 */}
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
        {/* 검색 & 사용자 버튼 */}
        <div className="ml-[100px] flex h-[80px] w-[180px] justify-between">
          <ToolTip text="SEARCH">
            <button
              aria-label="검색창 열기"
              className="flex items-center justify-center bg-center bg-no-repeat"
            >
              <Image
                src="/search-icon.svg"
                alt="검색 아이콘"
                width={24}
                height={24}
              />
            </button>
          </ToolTip>
          <button
            aria-label="마이페이지로 이동하기"
            className="bg-center bg-no-repeat"
          >
            <Image
              src="/user-icon.svg"
              alt=" 마이페이지 아이콘"
              width={24}
              height={24}
            />
          </button>
          <button
            aria-label="로그인 또는 로그아웃하기"
            className="bg-center bg-no-repeat"
          >
            <Image
              src={userSession ? "/signout-icon.svg" : "/signin-icon.svg"}
              alt="로그인 로그아웃 아이콘"
              width={24}
              height={24}
            />
          </button>
          <button aria-label="찜 목록 보기" className="bg-center bg-no-repeat">
            <Image
              src="/blackheart-icon.svg"
              alt="찜 아이콘"
              width={24}
              height={24}
            />
          </button>
        </div>
      </nav>
    </header>
  );
};

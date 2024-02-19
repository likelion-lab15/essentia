"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import naviList from "@/constants/naviList";
import SearchBar from "./SearchBar";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  /* 로고 효과를 위한 상태 */
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  /* 검색바 노출 */
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleCloseSearchBar = () => {
    setShowSearchBar(false);
  };

  return (
    <header
      role="banner"
      className="sticky top-0 z-[30] h-[80px] border-b border-primary bg-white"
    >
      <nav
        aria-label="메인 네비게이션"
        className="flex items-center justify-between  pl-[60px] pr-[60px]"
      >
        <Link
          href="/"
          className="mr-[60px] flex h-[80px] w-[140px] items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={isHovered ? "/ONYX.svg" : "/ONYX-black.svg"}
            alt="Logo image to go to homepage"
            width={140}
            height={55}
          />
        </Link>
        <ul className="text-primary-500 flex w-[500px] justify-between text-16 ">
          {naviList.map((naviList, index) => (
            <li key={naviList.href}>
              <Link
                href={naviList.href}
                className="text-primary-500"
                accessKey={`${index + 1}`}
              >
                {naviList.text}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-[100px] flex h-[80px] w-[180px] justify-between">
          <button
            aria-label="검색창 열기"
            onClick={() => {
              setShowSearchBar(!showSearchBar);
            }}
            className="bg-center bg-no-repeat"
          >
            <Image
              src="/search-icon.svg"
              alt="검색 아이콘"
              width={24}
              height={24}
            />
          </button>
          <button
            aria-label="마이페이지로 이동하기"
            onClick={() => router.push("/mypage/history")}
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
            onClick={session ? () => signOut() : () => signIn()}
            className="bg-center bg-no-repeat"
          >
            <Image
              src={session ? "/signout-icon.svg" : "/signin-icon.svg"}
              alt="로그인 로그아웃 아이콘"
              width={24}
              height={24}
            />
          </button>
          <button
            aria-label="찜 목록 보기"
            onClick={() => router.push("/mypage/mywishlist")}
            className="bg-center bg-no-repeat"
          >
            <Image
              src="/blackheart-icon.svg"
              alt="찜 아이콘"
              width={24}
              height={24}
            />
          </button>
        </div>
      </nav>
      {showSearchBar && <SearchBar onClose={handleCloseSearchBar} />}
    </header>
  );
}

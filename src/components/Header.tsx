"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTokens } from "@/hooks/_index";
import { useState, useEffect } from "react";
import { useTokenStore, useUserStore } from "@/stores/_index";
import naviList from "@/constants/naviList";
import SearchBar from "./SearchBar";

export default function Header() {
  /* User 토큰을 위한 상태 관리 */
  const token = useTokenStore((state) => state.token);
  const user = useUserStore((state) => state.user);

  /* 로그아웃을 위한 토큰 상태 관리 */
  const setToken = useTokenStore((state) => state.setToken);
  const setUser = useUserStore((state) => state.setUser);

  /* 로그인 상태를 위한 상태 */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* 로그아웃 처리 함수 */
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    alert("로그아웃 되었습니다");
  };

  /* 로고 효과를 위한 상태 */
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const { getNewAccessToken } = useTokens();

  /* 검색바 노출 */
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleCloseSearchBar = () => {
    setShowSearchBar(false);
  };

  useEffect(() => {
    if (token) {
      const accessToken = token.accessToken;
      const expirationTime = JSON.parse(atob(accessToken.split(".")[1])).exp;
      const currentTime = Math.floor(new Date().getTime() / 1000);

      // 토큰 만료됐을 경우
      if (currentTime >= expirationTime) {
        (async () => {
          await getNewAccessToken();
        })();
      } else {
        console.log("토큰이 아직 멀쩡합니다!");
      }
    } else {
      console.log("현재 토큰이 없는 상태입니다");
    }
  }, [token, getNewAccessToken]);

  /* 마운트될 때 로그인, 토큰 상태를 확인하고 아이콘 변경 */
  useEffect(() => {
    if (token && user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token, user]);

  return (
    <header
      role="banner"
      className="sticky top-0 z-[99] h-[80px] border-b border-primary bg-white"
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
            onClick={
              isLoggedIn
                ? () => router.push("/mypage/history")
                : () => router.push("/signin")
            }
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
            onClick={isLoggedIn ? handleLogout : () => router.push("/signin")}
            className="bg-center bg-no-repeat"
          >
            <Image
              src={isLoggedIn ? "/signout-icon.svg" : "/signin-icon.svg"}
              alt="로그인 로그아웃 아이콘"
              width={24}
              height={24}
            />
          </button>
          <button
            aria-label="찜 목록 보기"
            onClick={() => router.push("/mypage/wishlist")}
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

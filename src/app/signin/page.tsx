"use client";
// 노드 모듈 / 외부 라이브러리 임포트
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

// 프로젝트 내부 임포트
import { useUserStore } from "@/stores/useUserStore";
import { cn } from "@/utils/_index";

export default function SignIn() {
  /* 상태 변수 */
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [checkUser, setCheckUser] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  /* 훅스 */
  const router = useRouter();

  /* 라이프 사이클 */
  useEffect(() => {
    if (user._id) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  /* 이벤트 핸들러 */
  const handleSignIn = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    await axios
      .post("https://localhost/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setUser(res.data.item);
        setCheckUser(false);
        alert("로그인 성공!");
        router.push("/");
      })
      .catch((err) => {
        setCheckUser(true);
        console.log(err.message);
        alert("로그인 실패!");
      });
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h2 className="mb-[57px] text-[36px] font-bold">로그인</h2>

      <form className="flex w-[400px] flex-col" onSubmit={handleSignIn}>
        <div className="mb-[6px] flex flex-col">
          <label htmlFor="email" className="h-[32px] text-[14px] font-bold">
            이메일 주소
          </label>
          <input
            id="email"
            type="email"
            name="email"
            ref={emailRef}
            placeholder="example@essentia.co.kr"
            className="mb-[26px] h-[32px] border-b border-black text-[14px] font-medium"
          />
          <div
            aria-live="polite"
            className={cn("hidden text-[12px] text-red-500", {
              block: checkUser,
            })}
          >
            아이디를 확인해주세요
          </div>
        </div>
        <div className="mb-[26px] flex flex-col">
          <label htmlFor="password" className="h-[32px] text-[14px] font-bold">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            name="password"
            ref={passwordRef}
            placeholder="영문 대/소문자, 숫자 및 특수문자를 포함한 비밀번호"
            className="mb-[26px] h-[32px] border-b border-black text-[14px] font-medium"
          />
          <div
            aria-live="polite"
            className={cn("hidden text-[12px] text-red-500", {
              block: checkUser,
            })}
          >
            비밀번호를 확인해주세요
          </div>
        </div>
        <button
          type="submit"
          className="mb-[20px] h-[50px] bg-black text-[18px] font-bold text-white"
        >
          이메일로 로그인
        </button>
      </form>

      <div className="mb-[20px] flex w-[400px] items-center justify-around">
        <Link
          href="/signup"
          className="flex h-[32px] w-[100px] items-center justify-center text-[14px] font-medium"
        >
          이메일 회원가입
        </Link>
        <button
          type="button"
          className="h-[32px] w-[100px] text-[14px] font-medium"
        >
          이메일 찾기
        </button>
        <button
          type="button"
          className="h-[32px] w-[100px] text-[14px] font-medium"
        >
          비밀번호 찾기
        </button>
      </div>

      <div className="flex w-[400px] items-center justify-around">
        <button
          type="button"
          className="h-[50px] w-[190px] bg-[#FEE500] text-[14px] font-semibold"
        >
          카카오로 로그인
        </button>
        <button
          type="button"
          className="h-[50px] w-[190px] bg-[#03C75A] text-[14px] font-semibold text-white"
        >
          네이버로 로그인
        </button>
      </div>
    </main>
  );
}

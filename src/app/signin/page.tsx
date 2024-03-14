"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  /* state */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* 이벤트 핸들러 */
  const handleInputValue =
    (setter: any) => (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await signIn("credentials", {
      username: email,
      password: password,
      redirect: true,
      callbackUrl: `${process.env.NEXT_PUBLIC_MAIN}`,
    });
  };

  return (
    <main className="mb-[100px] flex h-screen flex-col items-center justify-center">
      {/* 1.제목 */}
      <h2 className="mb-[57px] text-[36px] font-bold">로그인</h2>

      {/* 2.이메일과 비밀번호 */}
      <form className="flex w-[400px] flex-col" onSubmit={handleFormSubmit}>
        {/* 이메일 */}
        <div className="mb-[6px] flex flex-col">
          <label
            htmlFor="email"
            className="flex h-[32px] items-center text-[14px] font-bold"
          >
            이메일 주소
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleInputValue(setEmail)}
            className="h-[32px] border-b border-black text-[14px] font-medium"
          />
          <div className="mb-[6px] flex h-[20px] items-center"></div>
        </div>

        {/* 비밀번호 */}
        <div className="mb-[46px] flex flex-col">
          <label
            htmlFor="password"
            className="flex h-[32px] items-center text-[14px] font-bold"
          >
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handleInputValue(setPassword)}
            className="h-[32px] border-b border-black text-[14px] font-medium"
          />
          <div className="h-[20px]"></div>
        </div>

        {/* 로그인 버튼 */}
        <button
          type="submit"
          className="mb-[20px] h-[50px] bg-black text-[18px] font-bold text-white"
        >
          이메일로 로그인
        </button>
      </form>

      {/* 3. 회원가입 */}
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

      {/* 4. 라이브러리 회원가입 */}
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

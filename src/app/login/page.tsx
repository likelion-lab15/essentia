"use client";

import Link from "next/link";

const page = () => {
  return (
    <main>
      <h2>로그인</h2>

      <form action="/">
        <label htmlFor="email">이메일</label>
        <input id="email" type="email" placeholder="example@essentia.co.kr" />
        <div aria-live="polite">아이디를 확인해주세요</div>
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          placeholder="영문 대/소문자, 숫자 및 특수문자를 포함한 비밀번호"
        />
        <div aria-live="polite">비밀번호를 확인해주세요</div>
        <button type="submit">이메일로 로그인</button>
      </form>

      <div>
        <Link href="#">이메일 회원가입</Link>
        <button>이메일 찾기</button>
        <button>비밀번호 찾기</button>
      </div>

      <div>
        <button type="button">카카오로 로그인</button>
        <button type="button">네이버로 로그인</button>
      </div>
    </main>
  );
};

export default page;

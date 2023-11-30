"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useUserStore } from "@/stores/useUserStore";

export default function SignIn() {
  /* 상태 변수 */
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  /* 훅스 */
  const router = useRouter();

  /* 라이프 사이클 */
  useEffect(() => {
    if (user._id) {
      localStorage.setItem("user", JSON.stringify(user));
      alert("로그인 성공!");
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
        console.log("로그인 성공!");
        router.push("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <main>
      <h2>로그인</h2>

      <form onSubmit={handleSignIn}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          name="email"
          ref={emailRef}
          placeholder="example@essentia.co.kr"
        />
        <div aria-live="polite">아이디를 확인해주세요</div>
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          name="password"
          ref={passwordRef}
          placeholder="영문 대/소문자, 숫자 및 특수문자를 포함한 비밀번호"
        />
        <div aria-live="polite">비밀번호를 확인해주세요</div>
        <button type="submit">이메일로 로그인</button>
      </form>

      <div>
        <Link href="/signup">이메일 회원가입</Link>
        <button>이메일 찾기</button>
        <button>비밀번호 찾기</button>
      </div>

      <div>
        <button type="button">카카오로 로그인</button>
        <button type="button">네이버로 로그인</button>
      </div>
    </main>
  );
}

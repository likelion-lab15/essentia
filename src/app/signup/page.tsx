"use client";
import React, { useState } from "react";

export default function SignUp() {
  const [isEmailValid, setEmailValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isPhoneValid, setPhoneValid] = useState(true);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showPhoneError, setShowPhoneError] = useState(false);

  /* 유효성 검사 */
  /* 이메일 유효성 (올바른 이메일 형식 체크) */
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  /* 비밀번호 유효성 
  조건 1. 10글자 이상 16글자 이하 
  조건 2. 영문자와 숫자 또는 특수문자가 포함되어야 한다
   */
  const validatePassword = (password: string) => {
    const isValidLength = password.length >= 10 && password.length <= 16;
    const isValidComplexity = /^(?=.*[a-zA-Z])(?=.*[\d\W])/.test(password);
    return isValidLength && isValidComplexity;
  };

  /* 휴대폰번호 유효성
  조건 1. 010으로 시작하는 11자리 숫자여야 한다
  */
  const validatePhone = (phone: string) => {
    return /^010\d{8}$/.test(phone);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = validatePhone(e.target.value);
    setPhoneValid(isValid);
    setShowPhoneError(!isValid);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = validateEmail(e.target.value);
    setEmailValid(isValid);
    setShowEmailError(!isValid);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = validatePassword(e.target.value);
    setPasswordValid(isValid);
    setShowPasswordError(!isValid);
  };

  return (
    <main className="flex flex-col items-center pt-[120px]">
      <h2 className="mb-[66px] text-36 font-bold">회원가입</h2>

      <form action="/" className="flex w-[400px] flex-col">
        {/* 이메일 주소 */}
        <label htmlFor="email">
          로그인에 사용할 이메일 주소를 입력해주세요
        </label>
        <input
          id="email"
          type="email"
          aria-errormessage="emailError"
          aria-invalid={!isEmailValid}
          onChange={handleEmailChange}
          placeholder="example@essentia.co.kr"
        />
        {/* 이메일 오류 경고창 */}
        {showEmailError && (
          <div id="emailError" aria-live="polite" className="text-red-500">
            이메일 오류 메세지
          </div>
        )}

        {/* 비밀번호 */}
        <label htmlFor="password">사용할 비밀번호를 입력해주세요</label>
        <input
          id="password"
          type="password"
          aria-errormessage="passwordError"
          aria-invalid={!isPasswordValid}
          onChange={handlePasswordChange}
          placeholder="영문 대/소문자, 숫자 및 특수문자를 포함한 비밀번호"
        />
        <input
          id="passwordCheck"
          type="password"
          aria-errormessage="passwordError"
          placeholder="비밀번호 확인"
        />
        {/* 비밀번호 오류 경고창 */}
        {showPasswordError && (
          <div id="passwordError" aria-live="polite" className="text-red-500">
            비밀번호 오류 메세지
          </div>
        )}

        {/* 이름 & 휴대폰번호 */}
        <label htmlFor="name">이름과 휴대폰 번호를 입력해주세요</label>
        <input
          id="name"
          type="text"
          aria-errormessage="nameError"
          placeholder="이름"
        />
        <div id="nameError" aria-live="polite">
          이름 오류 메세지
        </div>
        <label htmlFor="phone"></label>
        <input
          id="phone"
          type="tel"
          aria-errormessage="phoneError"
          aria-invalid={!isPhoneValid}
          onChange={handlePhoneChange}
          placeholder="휴대폰 번호('_')제외"
        />
        {/* 휴대폰번호 오류 경고창*/}
        {showPhoneError && (
          <div id="phoneError" aria-live="polite" className="text-red-500">
            휴대폰 번호 오류 메세지
          </div>
        )}

        {/* 생년월일 */}
        <label htmlFor="birth">생년월일을 입력해주세요</label>
        <input
          id="birth"
          type="date"
          aria-errormessage="birthError"
          placeholder="예) 19990707"
        />
        {/* 생년월일 오류 경고창*/}
        <div id="birthError" aria-live="polite">
          생년월일 오류 메세지
        </div>

        {/* 주소 */}
        <label htmlFor="address">주소를 입력해주세요</label>
        <input
          id="address"
          type="text"
          aria-errormessage="addressError"
          placeholder="도로명 주소를 입력해주세요"
        />
        <button type="button">주소 검색</button>
        <label htmlFor="addressDetail"></label>
        <input
          id="addressDetail"
          type="text"
          aria-errormessage="addressError"
          placeholder="상세 주소를 입력해주세요"
        />
        {/* 주소 오류 경고창*/}
        <div id="addressError" aria-live="polite">
          주소 오류 메세지
        </div>

        <button type="submit">회원가입 완료</button>
      </form>
    </main>
  );
}

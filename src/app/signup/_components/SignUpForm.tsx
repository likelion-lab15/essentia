"use client";

import React from "react";
import Button from "@/components/Button";
import { useReducer } from "react";

type TFormState = {
  email: string;
  isEmailValid: boolean;
  password: string;
  isPassWordValid: boolean;
  errorMessages: {
    email: string | null;
    password: string | null;
  };
};

type TFormAction =
  | { type: "UPDATE_EMAIL"; payload: string }
  | { type: "UPDATE_PASSWORD"; payload: string }
  | { type: "VALIDATE_EMAIL" }
  | { type: "VALIDATE_PASSWORD" };

const initialFormState = {
  email: "",
  isEmailValid: true,
  password: "",
  isPassWordValid: true,
  errorMessages: {
    email: null,
    password: null,
  },
};

function formReducer(state: TFormState, action: TFormAction) {
  switch (action.type) {
    /* 이메일 상태 업데이트 */
    case "UPDATE_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    /* 이메일 유효성 검사 */
    case "VALIDATE_EMAIL": {
      const email = state.email.trim();
      const isValid =
        email === "" ||
        /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i.test(
          email
        );
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          email: isValid ? null : "이메일 형식을 확인해주세요",
        },
      };
    }
    /* 비밀번호 상태 업데이트 */
    case "UPDATE_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    /* 비밀번호 유효성 검사 */
    case "VALIDATE_PASSWORD": {
      const password = state.password.trim();
      const isValidLength = password.length >= 8 && password.length <= 16;
      const isValidComplexity = /^(?=.*[a-zA-Z])(?=.*[\d\W])/.test(password);
      const isValid = password === "" || (isValidLength && isValidComplexity);
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          password: isValid ? null : "비밀번호 양식을 확인해주세요",
        },
      };
    }
    default:
      return state;
  }
}

export default function SignUpForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(state.errorMessages.email);
    dispatch({ type: "UPDATE_EMAIL", payload: e.target.value });
    dispatch({ type: "VALIDATE_EMAIL" });
  };

  const handlePassWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_PASSWORD", payload: e.target.value });
    dispatch({ type: "VALIDATE_PASSWORD" });
  };

  // const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   dispatch({ type: "VALIDATE_EMAIL" });

  //   if (state.isValid) {
  //     console.log("Email is valid:", state.email);
  //   }
  // };

  return (
    <form onSubmit={() => {}} className="flex w-[400px] flex-col">
      {/* 이메일 주소 */}
      <div className="flex h-[106px] w-[400px] flex-col text-14">
        <label
          className="flex h-[38px] w-full items-center font-semibold"
          htmlFor="email"
        >
          로그인에 사용할 이메일 주소를 입력해주세요
        </label>
        <input
          className="h-[38px] w-full border-b border-primary"
          id="email"
          type="email"
          placeholder="example@onyx.co.kr"
          value={state.email}
          onChange={handleEmailChange}
        />
        {state.errorMessages.email && (
          <div
            id={"email" + "Error"}
            aria-live="polite"
            className="flex h-[30px] w-full items-center text-warning"
          >
            {state.errorMessages.email}
          </div>
        )}
      </div>
      {/* 비밀번호 */}
      <div className="flex h-[106px] w-[400px] flex-col text-14">
        <label
          className="flex h-[38px] w-full items-center font-semibold"
          htmlFor="password"
        >
          사용할 비밀번호를 입력해주세요
        </label>
        <input
          className="h-[38px] w-full border-b border-primary"
          id="password"
          type="password"
          placeholder="8~16 글자의 영문, 숫자, 특수문자 조합"
          value={state.password}
          onChange={handlePassWordChange}
        />
        {state.errorMessages && (
          <div
            id={"password" + "Error"}
            aria-live="polite"
            className="flex h-[30px] w-full items-center text-warning"
          >
            {state.errorMessages.password}
          </div>
        )}
      </div>
      {/* 회원가입 완료 버튼 */}
      <Button
        className="mt-[50px]"
        label="회원가입 완료"
        type="submit"
      ></Button>
    </form>
  );
}

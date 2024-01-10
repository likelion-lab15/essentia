"use client";

import React from "react";
import Button from "@/components/Button";
import { useReducer } from "react";

type TFormState = {
  email: string;
  isEmailValid: boolean;
  errorMessage: string;
};

type TFormAction =
  | { type: "UPDATE_EMAIL"; payload: string }
  | { type: "VALIDATE_EMAIL" };

const initialFormState = {
  email: "",
  isEmailValid: true,
  errorMessage: "",
};

function formReducer(state: TFormState, action: TFormAction) {
  switch (action.type) {
    case "UPDATE_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "VALIDATE_EMAIL": {
      const email = state.email.trim();
      const isValid =
        email === "" ||
        /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i.test(
          email
        );
      return {
        ...state,
        isEmailValid: isValid,
        errorMessage: isValid ? "" : "이메일 형식을 확인해주세요",
      };
    }
    default:
      return state;
  }
}

export default function SignUpForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_EMAIL", payload: e.target.value });
    dispatch({ type: "VALIDATE_EMAIL" });
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
        {state.errorMessage && (
          <div
            id={"email" + "Error"}
            aria-live="polite"
            className="flex h-[30px] w-full items-center text-warning"
          >
            {state.errorMessage}
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

"use client";

import React from "react";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import signUp from "../_lib/signup";
import checkEmailDuplication from "../_lib/checkEmailDuplication";
import { useReducer } from "react";

type TFormInput =
  | "email"
  | "password"
  | "confirmPassword"
  | "name"
  | "phone"
  | "birth";

type TFormState = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
  birth: string;
  valids: Record<TFormInput, boolean>;
  errorMessages: Record<TFormInput, string | null>;
};

type TFormAction =
  | { type: "UPDATE_EMAIL"; payload: string }
  | { type: "UPDATE_PASSWORD"; payload: string }
  | { type: "UPDATE_CONFIRM_PASSWORD"; payload: string }
  | { type: "UPDATE_NAME"; payload: string }
  | { type: "UPDATE_PHONE"; payload: string }
  | { type: "UPDATE_BIRTH"; payload: string }
  | { type: "VALIDATE_EMAIL" }
  | { type: "VALIDATE_PASSWORD" }
  | { type: "VALIDATE_CONFIRM_PASSWORD" }
  | { type: "VALIDATE_NAME" }
  | { type: "VALIDATE_PHONE" }
  | { type: "VALIDATE_BIRTH" }
  | { type: "EMAIL_DUPLICATION"; payload: string | null };

const initialFormState: TFormState = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  phone: "",
  birth: "",
  valids: {
    email: true,
    password: true,
    confirmPassword: true,
    name: true,
    phone: true,
    birth: true,
  },
  errorMessages: {
    email: null,
    password: null,
    confirmPassword: null,
    name: null,
    phone: null,
    birth: null,
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
        valids: {
          ...state.valids,
          email: isValid,
        },
        errorMessages: {
          ...state.errorMessages,
          email: isValid ? null : "이메일 형식을 확인해주세요",
        },
      };
    }
    /* 이메일 중복 확인 */
    case "EMAIL_DUPLICATION":
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          email: action.payload,
        },
      };
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
        valids: {
          ...state.valids,
          password: isValid,
        },
        errorMessages: {
          ...state.errorMessages,
          password: isValid
            ? null
            : "8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.",
        },
      };
    }
    /* 비밀번호 확인 상태 업데이트 */
    case "UPDATE_CONFIRM_PASSWORD":
      return {
        ...state,
        confirmPassword: action.payload,
      };
    /* 비밀번호 확인 유효성 검사 */
    case "VALIDATE_CONFIRM_PASSWORD": {
      const isFieldEmpty = state.confirmPassword.trim() === "";
      const isPasswordMatch = state.confirmPassword === state.password;
      const isValid = isFieldEmpty || isPasswordMatch;

      return {
        ...state,
        valids: {
          ...state.valids,
          confirmPassword: isValid,
        },
        errorMessages: {
          ...state.errorMessages,
          confirmPassword:
            isValid || isFieldEmpty ? null : "비밀번호가 일치하지 않습니다.",
        },
      };
    }
    /* 이름 상태 업데이트 */
    case "UPDATE_NAME":
      return {
        ...state,
        name: action.payload,
      };
    /* 이름 유효성 검사 */
    case "VALIDATE_NAME": {
      const name = state.name.trim();
      const isValidLength = name.length <= 8;
      const isValidComplexity = /^[가-힣]+$/.test(name);
      const isValid = name === "" || (isValidLength && isValidComplexity);
      return {
        ...state,
        valids: {
          ...state.valids,
          name: isValid,
        },
        errorMessages: {
          ...state.errorMessages,
          name: isValid ? null : "8글자 이하의 한글을 입력해주세요.",
        },
      };
    }
    /* 휴대폰 번호 상태 업데이트 */
    case "UPDATE_PHONE":
      return {
        ...state,
        phone: action.payload,
      };

    /* 휴대폰 번호 유효성 검사 */
    case "VALIDATE_PHONE": {
      const phone = state.phone.trim();
      const isValid = phone === "" || /^010\d{8}$/.test(phone);
      return {
        ...state,
        valids: {
          ...state.valids,
          phone: isValid,
        },
        errorMessages: {
          ...state.errorMessages,
          phone: isValid ? null : "올바른 휴대폰 번호를 입력해주세요",
        },
      };
    }
    /* 생년월일 상태 업데이트 */
    case "UPDATE_BIRTH":
      return {
        ...state,
        birth: action.payload,
      };

    /* 생년월일 유효성 검사 */
    case "VALIDATE_BIRTH": {
      const birth = state.birth.trim();
      const isValidLength = birth.length <= 8;
      const isValidComplexity =
        /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/.test(birth) &&
        parseInt(birth.substring(0, 4)) >= 1900 &&
        parseInt(birth.substring(0, 4)) <= 2024;
      const isValid = birth === "" || (isValidLength && isValidComplexity);
      return {
        ...state,
        valids: {
          ...state.valids,
          birth: isValid,
        },
        errorMessages: {
          ...state.errorMessages,
          birth: isValid ? null : "올바른 생년월일을 입력해주세요",
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
    dispatch({ type: "UPDATE_EMAIL", payload: e.target.value });
    dispatch({ type: "VALIDATE_EMAIL" });
  };

  const handlePassWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_PASSWORD", payload: e.target.value });
    dispatch({ type: "VALIDATE_PASSWORD" });
    dispatch({ type: "VALIDATE_CONFIRM_PASSWORD" });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({ type: "UPDATE_CONFIRM_PASSWORD", payload: e.target.value });
    dispatch({ type: "VALIDATE_CONFIRM_PASSWORD" });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_NAME", payload: e.target.value });
    dispatch({ type: "VALIDATE_NAME" });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_PHONE", payload: e.target.value });
    dispatch({ type: "VALIDATE_PHONE" });
  };

  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_BIRTH", payload: e.target.value });
    dispatch({ type: "VALIDATE_BIRTH" });
  };

  /* 이메일 포커스 잃었을 때 함수 */
  const checkEmailDuplicationOnBlur = async () => {
    // 1. 이메일 유효성 검사
    dispatch({ type: "VALIDATE_EMAIL" });
    // 2. 유효성 검사에 통과한 경우에만 이메일 중복 확인 요청
    if (state.valids.email && state.email.trim()) {
      const isDuplicated = await checkEmailDuplication(state.email);
      console.log(isDuplicated);
      if (!isDuplicated) {
        dispatch({
          type: "EMAIL_DUPLICATION",
          payload: "중복된 이메일입니다.",
        });
      }
    }
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
      <InputField
        label="로그인에 사용할 이메일 주소를 입력해주세요"
        id="email"
        type="email"
        placeholder="example@onyx.co.kr"
        errorMessage={state.errorMessages.email}
        invalid={!state.valids.email}
        onChange={handleEmailChange}
        onBlur={checkEmailDuplicationOnBlur}
        value={state.email}
      />
      {/* 비밀번호 */}
      <InputField
        label="사용할 비밀번호를 입력해주세요"
        id="password"
        type="password"
        placeholder="8~16자의 영문 대/소문자, 숫자, 특수문자"
        errorMessage={state.errorMessages.password}
        invalid={!state.valids.password}
        onChange={handlePassWordChange}
        value={state.password}
      />
      {/* 비밀번호 확인 */}
      <InputField
        label="비밀번호 확인"
        id="confirmPassword"
        type="password"
        placeholder="비밀번호 재입력"
        errorMessage={state.errorMessages.confirmPassword}
        invalid={!state.valids.confirmPassword}
        onChange={handleConfirmPasswordChange}
        value={state.confirmPassword}
      />
      {/* 이름 */}
      <InputField
        label="이름을 입력해주세요"
        id="name"
        type="text"
        placeholder="예) 현지수"
        errorMessage={state.errorMessages.name}
        invalid={!state.valids.name}
        onChange={handleNameChange}
        value={state.name}
      />
      {/* 휴대폰 번호 */}
      <InputField
        label="휴대폰 번호를 입력해주세요"
        id="phone"
        type="tel"
        placeholder="휴대폰 번호('-' 제외)"
        errorMessage={state.errorMessages.phone}
        invalid={!state.valids.phone}
        onChange={handlePhoneChange}
        value={state.phone}
      />
      {/* 생년월일 */}
      <InputField
        label="생년월일을 입력해주세요"
        id="birth"
        type="text"
        placeholder="예) 19990707"
        errorMessage={state.errorMessages.birth}
        invalid={!state.valids.birth}
        onChange={handleBirthChange}
        value={state.birth}
      />
      {/* 도로명 주소 */}
      <InputField
        label="주소를 입력해주세요"
        id="address"
        type="text"
        placeholder="도로명 주소 검색하기를 통해 입력해주세요"
      />
      <Button
        className="mb-[30px] h-[38px]"
        label="도로명 주소 검색하기"
        type="button"
        onClick={() => console.log("도로명 주소 검색하기")}
      ></Button>
      {/* 상세 주소 */}
      <InputField
        label="상세 주소를 입력해주세요"
        id="detailAddress"
        type="text"
        placeholder="상세 주소를 입력해주세요"
      />
      {/* 회원가입 완료 버튼 */}
      <Button
        className="mt-[50px]"
        label="회원가입 완료"
        type="submit"
      ></Button>
    </form>
  );
}

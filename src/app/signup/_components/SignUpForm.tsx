"use client";

import React from "react";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import checkEmailDuplication from "../_lib/checkEmailDuplication";
import formReducer from "@/hooks/useFormRuducer";
import { useReducer } from "react";
import { TFormState, TFormInput } from "../../../../types/formType";

const initialFormState: TFormState = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  phone: "",
  birth: "",
  address: "",
  addressDetail: "",
  valids: {
    email: true,
    password: true,
    confirmPassword: true,
    name: true,
    phone: true,
    birth: true,
    address: true,
    addressDetail: true,
  },
  errorMessages: {
    email: null,
    password: null,
    confirmPassword: null,
    name: null,
    phone: null,
    birth: null,
    address: null,
    addressDetail: null,
  },
};

export default function SignUpForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  /* 각 Input 함수 */
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

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_ADDRESS", payload: e.target.value });
  };

  const handleAddressDetailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({ type: "UPDATE_ADDRESS_DETAIL", payload: e.target.value });
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

  /* Form 제출 함수 */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password, name, phone, birth, address, addressDetail } =
      state;

    const {
      valids: {
        email: validEmail,
        password: validPassword,
        confirmPassword: validConfirmPassword,
        name: validName,
        phone: validPhone,
        birth: validBirth,
        address: validAddress,
        addressDetail: validAddressDetail,
      },
    } = state;

    /* 공백일 때 포커스 */
    const firstInvalidInput = Object.keys(state.valids).find((key) => {
      const value = state[key as TFormInput];
      return value === null || value === undefined || value === "";
    });

    if (firstInvalidInput) {
      const inputRef = document.getElementById(firstInvalidInput);
      if (inputRef) {
        inputRef.focus();
      }
      return;
    }

    /* 유효성 검사에 통과하지 못했을 때 포커스 */
    const isValidForm =
      validEmail &&
      validPassword &&
      validConfirmPassword &&
      validName &&
      validPhone &&
      validBirth &&
      validAddress &&
      validAddressDetail;

    if (!isValidForm) {
      // 첫 번째 유효하지 않은 Input 필드를 찾아 포커스
      const firstInvalidInput = Object.keys(state.valids).find(
        (key) => !state.valids[key as TFormInput]
      );
      if (firstInvalidInput) {
        const inputRef = document.getElementById(firstInvalidInput);
        if (inputRef) {
          inputRef.focus();
        }
      }
      return;
    }

    const type = "seller";
    const data = {
      email,
      password,
      name,
      address,
      type,
      phone,
      extra: {
        birthday: birth,
        membershipClass: "MC01",
        addressBook: {
          value: address,
          detail: addressDetail,
        },
      },
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        alert("회원가입이 정상적으로 처리되었습니다");
        console.log("회원가입이 정상적으로 처리되었습니다.", responseData);
      } else if (response.status === 409) {
        alert("이미 가입된 이메일입니다.");
        dispatch({
          type: "EMAIL_DUPLICATION",
          payload: "중복된 이메일입니다.",
        });
      } else {
        alert("회원가입에 실패하였습니다.");
      }
    } catch (error) {
      console.error("이메일 중복 확인 요청 중 오류가 발생했습니다.:", error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-[400px] flex-col">
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
        errorMessage={state.errorMessages.address}
        invalid={!state.valids.address}
        onChange={handleAddressChange}
        value={state.address}
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
        id="addressDetail"
        type="text"
        placeholder="상세 주소를 입력해주세요"
        errorMessage={state.errorMessages.addressDetail}
        invalid={!state.valids.addressDetail}
        onChange={handleAddressDetailChange}
        value={state.addressDetail}
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

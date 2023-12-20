"use client";
import axios from "axios";
import React, { useState } from "react";
import { AddressModal, Header, InputField, Button } from "@/components/_index";

export default function SignUp() {
  type TAddressData = {
    address: string;
  };

  // Input 상태관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  // 유효성 상태 관리
  const [isEmailValid, setEmailValid] = useState(true);
  const [isEmailUnique, setEmailUnique] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isPasswordCheckValid, setPasswordCheckValid] = useState(true);
  const [isNameValid, setNameValid] = useState(true);
  const [isPhoneValid, setPhoneValid] = useState(true);
  const [isBirthValid, setBirthValid] = useState(true);

  // 오류메세지 상태 관리
  const [showNameError, setShowNameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showPhoneError, setShowPhoneError] = useState(false);
  const [showPasswordCheckError, setShowPasswordCheckError] = useState(false);
  const [showBirthError, setShowBirthError] = useState(false);

  // 주소 API 관련 상태 관리
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);

  // 이메일 중복확인 상태 관리
  const [hasCheckedDuplication, setHasCheckedDuplication] = useState(false);

  // 회원가입 제출 통신
  const sendPostRequest = async () => {
    const type = "seller";
    try {
      const response = await axios.post("https://localhost/api/users/", {
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
      });
      console.log(response.data);
    } catch (error) {
      console.error("회원가입 제출 통신 에러 발생", error);
    }
  };

  // 이메일 중복확인 통신
  const checkEmailDuplication = async () => {
    if (!email.trim()) {
      setShowEmailError(true);
      setEmailValid(false);
      return;
    }
    try {
      const res = await axios.get(
        `https://localhost/api/users/email?email=${email}`
      );
      setEmailUnique(true);
      setShowEmailError(false);
      setHasCheckedDuplication(true);
      console.log(res);
      console.log("사용가능한 이메일입니다");
    } catch (error) {
      if (error instanceof Error) {
        if (error.response && error.response.status === 409) {
          // Handle duplicate email case
          setEmailUnique(false);
          setShowEmailError(true);
          console.log("중복된 이메일입니다.");
        } else {
          // Handle other errors
          console.error("이메일 중복확인 에러 ", error.message);
        }
      } else {
        console.error("알 수 없는 오류 발생", error);
      }
    }
  };

  // 이름 유효성 검사 (한글만 허용)
  const validateName = (name: string) => {
    return /^[가-힣]+$/.test(name);
  };

  // 생년월일 유효성 검사 (1900 ~2023년생까지 가능)
  const validateBirth = (birth: string) => {
    return (
      /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/.test(birth) &&
      parseInt(birth.substring(0, 4)) >= 1900 &&
      parseInt(birth.substring(0, 4)) <= 2023
    );
  };

  // 이메일 유효성 검사
  // 조건 1. 올바른 이메일 형식
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  //  비밀번호 유효성 검사
  // 조건 1. 10글자 이상 16글자 이하
  // 조건 2. 영문자와 숫자 또는 특수문자가 포함되어야 한다
  const validatePassword = (password: string) => {
    const isValidLength = password.length >= 10 && password.length <= 16;
    const isValidComplexity = /^(?=.*[a-zA-Z])(?=.*[\d\W])/.test(password);
    return isValidLength && isValidComplexity;
  };

  // 휴대폰번호 유효성
  // 조건 1. 010으로 시작하는 11자리 숫자
  const validatePhone = (phone: string) => {
    return /^010\d{8}$/.test(phone);
  };

  // 핸들러 함수
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    const isValid = validateEmail(emailValue);
    setEmailValid(isValid);
    setShowEmailError(!isValid);
    setEmail(emailValue);
    setEmailUnique(true);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    const isValid = validatePassword(passwordValue);
    setPasswordValid(isValid);
    setShowPasswordError(!isValid);
    setPassword(passwordValue);
  };

  const handlePasswordCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const passwordCheckValue = e.target.value;
    const isValid = password === passwordCheckValue;
    setPasswordCheck(passwordCheckValue);
    setPasswordCheckValid(isValid);
    setShowPasswordCheckError(!isValid);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    const isValid = validateName(nameValue);
    setNameValid(isValid);
    setShowNameError(!isValid);
    setName(nameValue);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    const isValid = validatePhone(phoneValue);
    setPhoneValid(isValid);
    setShowPhoneError(!isValid);
    setPhone(phoneValue);
  };

  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const birthValue = e.target.value;
    const isValid = validateBirth(birthValue);
    setBirthValid(isValid);
    setShowBirthError(!isValid);
    setBirth(birthValue);
  };

  const handleAddressChange = (data: TAddressData) => {
    setAddress(data.address);
    setAddressModalOpen(false);
  };

  // 회원가입 폼 제출 함수
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 각 입력 필드가 비어 있는지 검사
    const isEmailEmpty = !email.trim();
    const isPasswordEmpty = !password.trim();
    const isPasswordCheckEmpty = !passwordCheck.trim();
    const isNameEmpty = !name.trim();
    const isPhoneEmpty = !phone.trim();
    const isBirthEmpty = !birth.trim();
    const isAddressEmpty = !address.trim();

    // 유효성 상태와 오류 메시지 상태 업데이트
    setEmailValid(!isEmailEmpty);
    setPasswordValid(!isPasswordEmpty);
    setNameValid(!isNameEmpty);
    setPhoneValid(!isPhoneEmpty);
    setBirthValid(!isBirthEmpty);

    // 오류 메시지 표시
    setShowEmailError(isEmailEmpty);
    setShowPasswordError(isPasswordEmpty);
    setShowNameError(isNameEmpty);
    setShowPhoneError(isPhoneEmpty);
    setShowBirthError(isBirthEmpty);
    setShowPasswordCheckError(isPasswordCheckEmpty);

    // 모든 인풋이 유효한 경우에만 요청 보내기
    if (
      !isEmailEmpty &&
      isEmailUnique &&
      !isPasswordEmpty &&
      !isNameEmpty &&
      !isPhoneEmpty &&
      !isBirthEmpty &&
      !isAddressEmpty
    ) {
      sendPostRequest();
    }
  };

  return (
    <div>
      <main className="flex h-[1500px] flex-col items-center pt-[120px]">
        <h2 className="mb-[66px] text-36 font-bold">회원가입</h2>

        <form onSubmit={handleSubmit} className="flex w-[400px] flex-col">
          {/* 이메일 주소 */}
          <InputField
            label="로그인에 사용할 이메일 주소를 입력해주세요"
            id="email"
            type="email"
            placeholder="example@essentia.co.kr"
            showError={showEmailError}
            errorMessage={
              isEmailUnique
                ? "이메일 양식을 확인해주세요"
                : "이미 가입된 이메일입니다"
            }
            invalid={!isEmailValid}
            onChange={handleEmailChange}
          />
          {/* 이메일 중복확인 버튼 */}
          <Button
            className="mb-[20px] h-[38px]"
            label="이메일 중복 확인"
            type="button"
            onClick={checkEmailDuplication}
          ></Button>
          {/* 비밀번호 */}
          <InputField
            label="사용할 비밀번호를 입력해주세요"
            id="password"
            type="password"
            placeholder="영문 대/소문자와 숫자 또는 특수문자를 포함한 비밀번호"
            showError={showPasswordError}
            errorMessage="영문 대/소문자와 숫자 또는 특수문자를 포함한 비밀번호를 입력해주세요"
            invalid={!isPasswordValid}
            onChange={handlePasswordChange}
          />
          {/* 비밀번호 확인 */}
          <InputField
            label="비밀번호 확인"
            id="passwordCheck"
            type="password"
            placeholder="비밀번호 확인"
            showError={showPasswordCheckError}
            errorMessage="비밀번호가 일치하지 않습니다."
            invalid={!isPasswordCheckValid}
            onChange={handlePasswordCheckChange}
          />
          {/* 이름 */}
          <InputField
            label="이름을 입력해주세요"
            id="name"
            type="text"
            placeholder="예) 현지수"
            showError={showNameError}
            errorMessage="정확한 이름을 입력해주세요"
            invalid={!isNameValid}
            onChange={handleNameChange}
          />
          {/* 휴대폰 번호 */}
          <InputField
            label="휴대폰 번호를 입력해주세요"
            id="phone"
            type="tel"
            placeholder="휴대폰 번호('-' 제외)"
            showError={showPhoneError}
            errorMessage="'-' 를 제외한 11자리 휴대폰 번호를 입력해주세요"
            invalid={!isPhoneValid}
            onChange={handlePhoneChange}
          />
          {/* 생년월일 */}
          <InputField
            label="생년월일을 입력해주세요"
            id="birth"
            type="text"
            placeholder="예) 19990707"
            showError={showBirthError}
            errorMessage="올바른 생년월일을 입력해주세요"
            invalid={!isBirthValid}
            onChange={handleBirthChange}
          />
          {/* 주소 */}
          <label htmlFor="address">주소를 입력해주세요</label>
          <input
            id="address"
            type="text"
            aria-errormessage="addressError"
            placeholder="도로명 주소를 입력해주세요"
            value={address}
            readOnly
            onChange={(e) => setAddress(e.target.value)}
          />
          {/* 주소 검색 버튼 */}
          <Button
            className="mt-[50px] h-[38px]"
            label="도로명 주소 검색하기"
            type="button"
            onClick={() => setAddressModalOpen(true)}
          ></Button>
          <AddressModal
            isOpen={isAddressModalOpen}
            onClose={() => setAddressModalOpen(false)}
            onSelectAddress={handleAddressChange}
          />
          <label htmlFor="addressDetail"></label>
          <input
            id="addressDetail"
            type="text"
            aria-errormessage="addressError"
            placeholder="상세 주소를 입력해주세요"
            onChange={(e) => setAddressDetail(e.target.value)}
          />
          {/* 회원가입 완료 버튼 */}
          <Button
            className="mt-[50px]"
            label="회원가입 완료"
            type="submit"
            onClick={checkEmailDuplication}
          ></Button>
        </form>
      </main>
    </div>
  );
}

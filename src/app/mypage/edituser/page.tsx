"use client";

import { useState } from "react";
import { Button, InputField } from "@/components/_index";

function getUserData() {
  const userData = JSON.parse(localStorage.getItem("user"));
  return userData;
}

export default function EditUser() {
  // 이벤트 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("전송 완료");
  };

  const [userData, setUserData] = useState(getUserData());

  return (
    <section className="w-[1000px]">
      <div className="mb-[40px] flex h-[70px] items-center border-b-[3px] border-[#222]">
        <p className="text-[28px] font-bold">회원정보 수정</p>
      </div>
      {/* <Form> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-[60px] flex justify-start gap-[100px]">
          <div className="w-full">
            {/* 이메일 */}
            <InputField
              label="이메일"
              id="email"
              type="email"
              value={userData.email}
            />

            {/* 이름 */}
            <InputField
              label="이름"
              id="name"
              type="text"
              value={userData.name}
            />

            {/* 휴대폰 */}
            <InputField
              label="휴대폰 번호"
              id="phone"
              type="tel"
              value={userData.phone}
            />

            {/* 비밀번호 */}
            <InputField label="현재 비밀번호" id="password" type="password" />

            {/* 비밀번호 중복 */}
            <InputField
              label="새로운 비밀번호"
              id="passwordCheck"
              type="password"
            />
          </div>

          <div className="w-full">
            {/* 생년월일 */}
            <InputField
              label="생년월일"
              id="birthday"
              type="text"
              value={userData.extra.birthday}
            />
            {/* 배송지1 */}
            <InputField
              label="등록된 배송지"
              id="address1"
              type="text"
              value={userData.extra.addressBook[0].value}
            />
            {/* 배송지2 */}
            {/* <InputField
            label="등록된 배송지2"
            id="address2"
            type="text"
            value={userData.extra.addressBook[1].value}
          /> */}
            {/* <InputField label="새로운 배송지 등록" id="newAddress" type="text" /> */}
            <div className="w-[400px]">
              <label
                htmlFor="newAddress"
                className="flex h-[38px] w-full items-center font-semibold"
              >
                새로운 배송지 등록
              </label>
              <Button type="button" label="주소 검색" className="mb-[14px]" />
              <input
                type="text"
                id="newAddress"
                className="h-[38px] w-full border-b border-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full justify-center">
          <Button type="button" label="회원정보 수정 완료" className="m-auto" />
        </div>
      </form>
    </section>
  );
}

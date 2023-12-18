"use client";

import { useState } from "react";
import { Button, AddressModal } from "@/components/_index";
import { useUserStore } from "@/stores/useUserStore";
import { axiosPrivate } from "@/api/axios";
import { cn } from "@/utils/_index";

export default function EditUser() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassowrd] = useState("");

  const [birthday, setBirthday] = useState(user?.extra.birthday);
  const [address, setAddress] = useState(user?.extra.addressBook.value);
  const [detailAddress, setDetailAddress] = useState(
    user?.extra.addressBook.detail
  );

  // 경고 메세지 상태 관리
  const [message, setMessage] = useState(false);

  // 주소 API 관련 상태 관리
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);

  // 회원정보 수정기능
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      phone: phone,
      password: newPassword,
      extra: {
        addressBook: {
          value: address,
          detail: detailAddress,
        },
        birthday: birthday,
      },
    };

    try {
      const res = await axiosPrivate.patch(`users/${user._id}`, newUser);
      const res2 = await axiosPrivate.get(`users/${user._id}`);

      setUser(res2.data.item);
      setMessage(false);
      alert("회원정보 수정을 성공했습니다!");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      setMessage(true);
      alert("회원정보 수정을 실패했습니다!");
    }
  };

  // input값 업데이트 기능
  const handleInputValue = (setter) => (e) => {
    setter(e.target.value);
  };

  // 주소 변경 기능
  const handleAddressChange = (data) => {
    setAddress(data.address);
    setAddressModalOpen(false);
  };

  return (
    <section className="w-[1000px]">
      {/* 1. 제목 */}
      <div className="mb-[40px] flex h-[70px] items-center border-b-[3px] border-[#222]">
        <p className="text-[28px] font-bold">회원정보 수정</p>
      </div>
      {/* 2. 회원정보 */}
      <form className="flex w-[900px] flex-col" onSubmit={handleFormSubmit}>
        <div className="mb-[60px] flex gap-[100px]">
          <div className="w-[400px]">
            {/* 이메일 */}
            <div className="mb-[40px] flex h-[94px] flex-col">
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
                readOnly={true}
                value={user?.email}
                className="h-[32px] border-b border-black text-[14px] font-medium"
              />
              <div
                className={cn("hidden h-[30px] text-[12px] text-red-500", {
                  "flex items-center": message,
                })}
              >
                아이디를 확인해주세요
              </div>
            </div>

            {/* 이름과 휴대폰 번호 */}
            <fieldset className="mb-[40px]">
              <legend className="flex h-[32px] items-center text-[14px] font-bold">
                이름과 휴대폰 번호
              </legend>

              <div className="flex h-[62px] flex-col">
                <label
                  htmlFor="name"
                  className="sr-only flex h-[32px] items-center text-[14px] font-bold"
                >
                  이름
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={handleInputValue(setName)}
                  className="h-[32px] border-b border-black text-[14px] font-medium"
                />
                <div
                  className={cn("hidden h-[30px] text-[12px] text-red-500", {
                    "flex items-center": message,
                  })}
                >
                  이름을 확인해주세요
                </div>
              </div>

              <div className="flex h-[62px] flex-col">
                <label
                  htmlFor="phone"
                  className="sr-only flex h-[32px] items-center text-[14px] font-bold"
                >
                  휴대폰 번호를 확인해주세요
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={handleInputValue(setPhone)}
                  className="h-[32px] border-b border-black text-[14px] font-medium"
                />
                <div
                  className={cn("hidden h-[30px] text-[12px] text-red-500", {
                    "flex items-center": message,
                  })}
                >
                  이름을 확인해주세요
                </div>
              </div>
            </fieldset>

            {/* 비밀번호 수정 */}
            <fieldset>
              <legend className="flex h-[32px] items-center text-[14px] font-bold">
                비밀번호 수정
              </legend>

              <div className="flex h-[62px] flex-col">
                <label
                  htmlFor="oldPassword"
                  className="sr-only flex h-[32px] items-center text-[14px] font-bold"
                >
                  현재 비밀번호
                </label>
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  placeholder="현재 비밀번호"
                  value={oldPassword}
                  onChange={handleInputValue(setOldPassword)}
                  className="h-[32px] border-b border-black text-[14px] font-medium"
                />
                <div
                  className={cn("hidden h-[30px] text-[12px] text-red-500", {
                    "flex items-center": message,
                  })}
                >
                  비밀번호를 확인해주세요
                </div>
              </div>

              <div className="flex h-[62px] flex-col">
                <label
                  htmlFor="newPassword"
                  className="sr-only flex h-[32px] items-center text-[14px] font-bold"
                >
                  새로운 비밀번호
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="새로운 비밀번호"
                  value={newPassword}
                  onChange={handleInputValue(setNewPassowrd)}
                  className="h-[32px] border-b border-black text-[14px] font-medium"
                />
                <div
                  className={cn("hidden h-[30px] text-[12px] text-red-500", {
                    "flex items-center": message,
                  })}
                >
                  새로운 비밀번호를 확인해주세요
                </div>
              </div>
            </fieldset>
          </div>

          <div className="w-[400px]">
            {/* 생년월일 */}
            <div className="mb-[40px] flex h-[94px] flex-col">
              <label
                htmlFor="birthday"
                className="flex h-[32px] items-center text-[14px] font-bold"
              >
                생년월일
              </label>
              <input
                id="birthday"
                name="birthday"
                type="text"
                value={birthday}
                onChange={handleInputValue(setBirthday)}
                className="h-[32px] border-b border-black text-[14px] font-medium"
              />
              <div
                className={cn("hidden h-[30px] text-[12px] text-red-500", {
                  "flex items-center": message,
                })}
              >
                생년월일을 확인해주세요
              </div>
            </div>

            {/* 주소 */}
            <fieldset className="mb-[40px]">
              <legend className="flex h-[32px] items-center text-[14px] font-bold">
                주소
              </legend>

              <div className="flex h-[62px] flex-col">
                <label
                  htmlFor="address"
                  className="sr-only flex h-[32px] items-center text-[14px] font-bold"
                >
                  주소
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={address}
                  readOnly={true}
                  onChange={handleInputValue(setAddress)}
                  className="h-[32px] border-b border-black text-[14px] font-medium"
                />
                <div
                  className={cn("hidden h-[30px] text-[12px] text-red-500", {
                    "flex items-center": message,
                  })}
                >
                  주소를 확인해주세요
                </div>
              </div>

              <div className="flex h-[62px] flex-col">
                <label
                  htmlFor="detailAdress"
                  className="sr-only flex h-[32px] items-center text-[14px] font-bold"
                >
                  상세 주소
                </label>
                <input
                  id="detailAdress"
                  name="detailAdress"
                  type="text"
                  value={detailAddress}
                  onChange={handleInputValue(setDetailAddress)}
                  className="h-[32px] border-b border-black text-[14px] font-medium"
                />
                <div
                  className={cn("hidden h-[30px] text-[12px] text-red-500", {
                    "flex items-center": message,
                  })}
                >
                  상세 주소를 확인해주세요
                </div>
              </div>

              <Button
                label="새로운 주소 등록"
                type="button"
                onClick={() => setAddressModalOpen(true)}
              />
            </fieldset>
          </div>
        </div>

        {/* 3. 수정 버튼 */}
        <Button label="회원정보 수정" type="submit" className="mx-auto" />
      </form>

      {/* 주소 모달창 */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        onSelectAddress={handleAddressChange}
      />
    </section>
  );
}

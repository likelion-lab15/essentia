"use client";

import { useEffect, useReducer } from "react";
import { AddressModal, Button, InputField } from "@/components/_index";
import { useClientSession } from "@/hooks/_index";
import { useModal } from "@/hooks/_index";
import { initialState, reducer } from "../_reducers/_index";

export default function UserForm() {
  const { getUserSession, getAccessToken } = useClientSession();
  const { openModal, closeModal, ModalPortal } = useModal();

  const user = getUserSession();
  const accessToken = getAccessToken();

  const [state, dispatch] = useReducer(reducer, initialState);

  /* useEffect */
  useEffect(() => {
    if (user) {
      dispatch({
        type: "SET_INITIAL_STATE",
        payload: {
          email: user?.email || "",
          name: user?.name || "",
          phone: user?.phone || "",
          birthday: user?.extra.birthday || "",
          address: user?.extra.addressBook.value || "",
          detailAddress: user?.extra.addressBook.detail || "",
        },
      });
    }
  }, [user]);

  /* 이벤트 핸들러 */
  const handleInputBlur = (type, value) => {
    dispatch({ type: type, payload: value });
  };

  const handleInputValidation = (type, value) => {
    dispatch({ type: type, payload: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newUserData = {
      ...user,
      phone: state?.phone,
      password: state?.newPassword,
      extra: {
        ...user.extra,
        addressBook: {
          value: state?.address,
          detail: state?.detailAddress,
        },
      },
    };

    try {
      /* "https://jsonplaceholder.typicode.com/posts" */
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}/users/${user._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newUserData),
        }
      );

      if (!res.ok) {
        return;
      }

      alert("회원정보를 수정했습니다!");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      alert("회원정보를 수정하는데 실패했습니다!");
    }
  };

  return (
    <>
      <form className="flex w-[900px] flex-col" onSubmit={handleFormSubmit}>
        <div className="mb-[60px] flex gap-[100px]">
          <div className="w-[400px]">
            <InputField
              label="이메일"
              id="email"
              type="text"
              value={state?.formData.email}
              readOnly={true}
            />
            <InputField
              label="이름"
              id="name"
              type="text"
              value={state?.formData.name}
              readOnly={true}
            />
            <InputField
              label="휴대폰 번호"
              id="phone"
              type="text"
              name="phone"
              placeholder={state?.formData.phone}
              errorMessage={state?.errorMessage.phone}
              onBlur={(e) => {
                handleInputBlur("UPDATE_PHONE", e.target.value);
                handleInputValidation("VALIDATE_PHONE", e.target.value);
              }}
            />
            <InputField
              label="새로운 비밀번호"
              id="newPassword"
              type="password"
              name="newPassword"
              errorMessage={state?.errorMessage.newPassword}
              onBlur={(e) => {
                handleInputBlur("UPDATE_NEWPASSWORD", e.target.value);
                handleInputValidation("VALIDATE_NEWPASSWORD", e.target.value);
              }}
            />
            <InputField
              label="비밀번호 확인"
              id="confirmNewPassword"
              type="password"
              name="confirmNewPassword"
              errorMessage={state?.errorMessage.confirmNewPassword}
              onBlur={(e) => {
                handleInputBlur("UPDATE_CONFIRMNEWPASSWORD", e.target.value);
                handleInputValidation(
                  "VALIDATE_CONFIRMNEWPASSWORD",
                  e.target.value
                );
              }}
            />
          </div>
          <div className="w-[400px]">
            <InputField
              label="생일"
              id="birthday"
              type="text"
              readOnly={true}
              value={state?.formData.birthday}
            />
            <InputField
              label="주소"
              id="address"
              name="address"
              type="text"
              readOnly={true}
              value={state?.formData.address}
            />
            <InputField
              label="상세주소"
              id="detailAddress"
              name="detailAddress"
              type="text"
              placeholder={state?.formData.detailAddress}
              onBlur={(e) =>
                handleInputBlur("UPDATE_ADDRESSDETAIL", e.target.value)
              }
            />
            <Button
              label="새로운 주소 등록"
              type="button"
              onClick={openModal}
            />
          </div>
        </div>
        <Button label="회원정보 수정" type="submit" className="mx-auto" />
      </form>
      <ModalPortal>
        <AddressModal
          selectedAddress={(address) => {
            handleInputBlur("UPDATE_ADDRESS", address);
            closeModal();
          }}
        />
      </ModalPortal>
    </>
  );
}

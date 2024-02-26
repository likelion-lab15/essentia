"use client";

import { useEffect, useReducer } from "react";
import { AddressModal, Button, InputField } from "@/components/_index";
import { useClientSession } from "@/hooks/_index";
import { useModal } from "@/hooks/_index";
import { fetchPrivateData } from "@/fetch/fetch";

/* INITIAL_STATE */
const INITIAL_STATE = {
  formData: {
    phone: "",
    newPassword: "",
    confirmNewPassword: "",
    address: "",
    detailAddress: "",
  },
  errorMessage: {
    phone: "",
    newPassword: "",
    confirmNewPassword: "",
    address: "",
    detailAddress: "",
  },
  isValid: {
    phone: false,
    newPassword: false,
    confirmNewPassword: false,
    address: false,
    detailAddress: false,
  },
};

/* VALIDATION_RULES */
const VALIDATION_RULES = {
  phone: (value) =>
    /^010\d{8}$/.test(value) ? "" : "올바른 휴대폰 번호를 입력해주세요",
  newPassword: (value) =>
    value.length >= 8 &&
    value.length <= 16 &&
    /^(?=.*[a-zA-Z])(?=.*[\d\W])/.test(value)
      ? ""
      : "8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.",
};

/* Reducer */
const formReducer = (state, action) => {
  switch (action.type) {
    /* 상태 초기화를 위한 업데이트 */
    case "SET_INITIAL_STATE": {
      const { phone, address, birthday, detailAddress } = action.payload;
      return {
        ...state,
        formData: {
          phone,
          birthday,
          address,
          detailAddress,
        },
      };
    }

    /* 인풋 상태 업데이트 */
    case "UPDATE_INPUT": {
      const { name, value } = action.payload;
      return {
        ...state,
        formData: {
          ...state.formData,
          [name]: value,
        },
      };
    }

    /* 에러, 유효성 검사 */
    case "UPDATE_ERROR": {
      const { name, value } = action.payload;
      const error = VALIDATION_RULES[name](value);
      return {
        ...state,
        errorMessage: {
          ...state.errorMessage,
          [name]: error,
        },
        isValid: {
          ...state.isValid,
          [name]: error ? false : true,
        },
      };
    }

    /* 비밀번호 중복검사 */
    case "CONFIRM_PASSWORD": {
      const value = action.payload;
      const passwordValidation =
        value !== "" && value === state.formData.newPassword
          ? ""
          : "비밀번호가 불일치합니다.";
      return {
        ...state,
        errorMessage: {
          ...state.errorMessage,
          confirmNewPassword: passwordValidation,
        },
        isValid: {
          ...state.isValid,
          confirmNewPassword: passwordValidation ? false : true,
        },
      };
    }

    /* 주소 업데이트 */
    case "UPDATE_ADDRESS": {
      const selectedAddress = action.payload;
      return {
        ...state,
        formData: {
          ...state.formData,
          address: selectedAddress,
        },
      };
    }

    default:
      return state;
  }
};

export default function UserForm() {
  const { getUserSession } = useClientSession();
  const { openModal, closeModal, ModalPortal } = useModal();
  const user = getUserSession();

  /* useReducer */
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  /* 초창기값 설정을 위한 useEffect */
  useEffect(() => {
    if (user) {
      dispatch({
        type: "SET_INITIAL_STATE",
        payload: {
          phone: user?.phone || "",
          birthday: user?.extra.birthday || "",
          address: user?.extra.addressBook.value || "",
          detailAddress: user?.extra.addressBook.detail || "",
        },
      });
    }
  }, [user]);

  /* 이벤트 핸들러 */
  const handleInputUpdate = (e) => {
    dispatch({
      type: "UPDATE_INPUT",
      payload: { name: e.target.id, value: e.target.value },
    });
  };

  const handleInputError = (e) => {
    dispatch({
      type: "UPDATE_ERROR",
      payload: { name: e.target.id, value: e.target.value },
    });
  };

  const handlePasswordMatch = (e) => {
    dispatch({ type: "CONFIRM_PASSWORD", payload: e.target.value });
  };

  const handleAddress = (address) => {
    dispatch({
      type: "UPDATE_INPUT",
      payload: { name: "address", value: address },
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const allTrue = Object.values(state.isValid).every(
      (value) => value === true
    );

    if (!allTrue) {
      alert("잘못 입력된 정보가 있습니다!");
      return;
    }

    const { phone, address, detailAddress, newPassword } = state.formData;

    const newUserData = {
      phone: phone,
      password: newPassword,
      extra: {
        addressBook: {
          value: address,
          detail: detailAddress,
        },
      },
    };

    try {
      const res = await fetchPrivateData(`users/${user._id}`, {
        method: "POST",
        body: JSON.stringify(newUserData),
      });

      return await res.json();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
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
              value={user?.email}
              readOnly={true}
            />
            <InputField
              label="이름"
              id="name"
              type="text"
              value={user?.name}
              readOnly={true}
            />
            <InputField
              label="휴대폰 번호"
              id="phone"
              type="text"
              placeholder={state?.formData.phone}
              onBlur={(e) => {
                handleInputUpdate(e);
                handleInputError(e);
              }}
              errorMessage={state?.errorMessage.phone}
            />
            <InputField
              label="새로운 비밀번호"
              id="newPassword"
              type="password"
              onBlur={(e) => {
                handleInputUpdate(e);
                handleInputError(e);
              }}
              errorMessage={state?.errorMessage.newPassword}
            />
            <InputField
              label="비밀번호 확인"
              id="confirmNewPassword"
              type="password"
              onBlur={(e) => {
                handleInputUpdate(e);
                handlePasswordMatch(e);
              }}
              errorMessage={state?.errorMessage.confirmNewPassword}
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
              type="text"
              readOnly={true}
              value={state?.formData.address}
              onBlur={handleInputUpdate}
            />
            <InputField
              label="상세주소"
              id="detailAddress"
              type="text"
              placeholder={state?.formData.detailAddress}
              onBlur={handleInputUpdate}
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
            handleAddress(address);
            closeModal();
          }}
        />
      </ModalPortal>
    </>
  );
}

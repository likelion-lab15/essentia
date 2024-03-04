export const initialState = {
  formData: {
    email: "",
    name: "",
    phone: "",
    birthday: "",
    newPassword: "",
    confirmNewPassword: "",
    address: "",
    addressDetail: "",
  },
  errorMessage: {
    phone: "",
    newPassword: "",
    confirmNewPassword: "",
  },
  isValid: {
    phone: false,
    newPassword: false,
    confirmNewPassword: false,
  },
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    /* 상태 초기화를 위한 업데이트 */
    case "SET_INITIAL_STATE": {
      const { email, name, phone, birthday, address, addressDetail } =
        action.payload;
      return {
        ...state,
        formData: {
          ...state.formData,
          email,
          name,
          phone,
          birthday,
          address,
          addressDetail,
        },
      };
    }
    /* 휴대폰 번호 업데이트 */
    case "UPDATE_PHONE":
      return {
        ...state,
        formData: {
          ...state.formData,
          phone: action.payload,
        },
      };
    /* 휴대폰 번호 유효성 검사 */
    case "VALIDATE_PHONE": {
      const validation = /^010\d{8}$/.test(action.payload);
      return {
        ...state,
        errorMessage: {
          ...state.errorMessage,
          phone: validation ? "" : "올바른 휴대폰 번호를 입력해주세요",
        },
        isValid: {
          ...state.isValid,
          phone: validation ? true : false,
        },
      };
    }
    /* 새 비밀번호 업데이트 */
    case "UPDATE_NEWPASSWORD":
      return {
        ...state,
        formData: {
          ...state.formData,
          newPassword: action.payload,
        },
      };
    /* 새 비밀번호 유효성 검사 */
    case "VALIDATE_NEWPASSWORD": {
      const validation = /^.{8,16}$/.test(action.payload);
      return {
        ...state,
        errorMessage: {
          ...state.errorMessage,
          newPassword: validation ? "" : "비밀번호는 8~16자리입니다",
        },
        isValid: {
          ...state.isValid,
          newPassword: validation ? true : false,
        },
      };
    }
    /* 중복 비밀번호 업데이트 */
    case "UPDATE_CONFIRMNEWPASSWORD":
      return {
        ...state,
        formData: {
          ...state.formData,
          confirmNewPassword: action.payload,
        },
      };
    /* 중복 비밀번호 유효성 검사 */
    case "VALIDATE_CONFIRMNEWPASSWORD": {
      const validation = state.formData.newPassword === action.payload;
      return {
        ...state,
        errorMessage: {
          ...state.errorMessage,
          confirmNewPassword: validation ? "" : "비밀번호가 일치하지 않습니다",
        },
        isValid: {
          ...state.isValid,
          confirmNewPassword: validation ? true : false,
        },
      };
    }
    /* 주소 업데이트 */
    case "UPDATE_ADDRESS":
      return {
        ...state,
        formData: {
          ...state.formData,
          address: action.payload,
        },
      };
    /* 상세주소 업데이트 */
    case "UPDATE_ADDRESSDETAIL":
      return {
        ...state,
        formData: {
          ...state.formData,
          addressDetail: action.payload,
        },
      };
    default:
      return state;
  }
};

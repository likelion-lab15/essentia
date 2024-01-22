import { TFormState, TFormAction } from "../../types/formType";

export default function useFormReducer(state: TFormState, action: TFormAction) {
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

    /* 도로명 주소 상태 업데이트 */
    case "UPDATE_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };

    /* 상세 주소 상태 업데이트 */
    case "UPDATE_ADDRESS_DETAIL":
      return {
        ...state,
        addressDetail: action.payload,
      };

    default:
      return state;
  }
}

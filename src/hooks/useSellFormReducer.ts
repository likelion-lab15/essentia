import { TFromSellState, TFormSellAction } from "../../types/formSellType";

export const INITIAL_STATE = {
  price: "",
  content: "",
  mainImages: [],
  previewImages: [],
  shippingFees: 0,
  show: true,
  active: true,
  name: "Tacit Eau De Perfume",
  quantity: 200,
  buyQuantity: 198,
  extra: {
    depth: 2,
    restamount: "",
    date: "",
  },
  valids: {
    restamount: null,
    price: null,
    date: null,
    content: null,
  },
  errorMessages: {
    restamount: null,
    price: null,
    date: null,
    content: null,
  },
};

// 유효성 검사를 위한 함수
const validatePrice = (price: number) => {
  return price >= 100; // 가격이 100원 이상인지 검사
};

const validateContent = (content: string) => {
  return content.length > 10;
};

const validateDate = (date: string) => {
  const isValidLength = date.length === 8;
  const isValidFormat = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/.test(
    date
  );
  const year = parseInt(date.substring(0, 4), 10);
  const isValidYear = year >= 1900 && year <= 2024;

  return isValidLength && isValidFormat && isValidYear;
};

export function useSellFormReducer(
  state: TFromSellState,
  action: TFormSellAction
) {
  switch (action.type) {
    /* 인풋 상태 업데이트 */
    case "CHANGE_INPUT":
      if (action.payload.name in state.extra) {
        // extra 내부의 값 업데이트
        return {
          ...state,
          extra: {
            ...state.extra,
            [action.payload.name]: action.payload.value,
          },
        };
      } else {
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      }
    /* 가격 유효성 검사 */
    case "VALIDATE_PRICE": {
      const isValidPrice = validatePrice(action.payload.value);
      return {
        ...state,
        valids: {
          ...state.valids,
          price: isValidPrice,
        },
        errorMessages: {
          ...state.errorMessages,
          price: isValidPrice ? null : "100원 이상 입력해주세요.",
        },
      };
    }
    /* 구매일시 유효성 검사 */
    case "VALIDATE_DATE": {
      const isValidDate = validateDate(action.payload);
      return {
        ...state,
        valids: {
          ...state.valids,
          date: isValidDate,
        },
        errorMessages: {
          ...state.errorMessages,
          date: isValidDate ? null : "올바른 구매일시를 입력해주세요.",
        },
      };
    }
    /* 설명 유효성 검사 */
    case "VALIDATE_CONTENT": {
      const isValidContent = validateContent(action.payload.value);
      return {
        ...state,
        valids: {
          ...state.valids,
          content: isValidContent,
        },
        errorMessages: {
          ...state.errorMessages,
          content: isValidContent
            ? null
            : "상품 설명을 10글자 이상 입력해주세요.",
        },
      };
    }
    /* 이미지 상태 업데이트 */
    case "UPLOAD_IMAGE":
      return {
        ...state,
        mainImages: action.payload.uploadedPaths,
        previewImages: action.payload.previewUrls,
      };
    default:
      return state;
  }
}

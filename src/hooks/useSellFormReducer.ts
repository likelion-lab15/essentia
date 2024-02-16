import { TFromSellState, TFormSellAction } from "../../types/formSellType";

export const INITIAL_STATE = {
  price: "",
  content: "",
  mainImages: [],
  previewImages: [],
  shippingFees: 0,
  show: true,
  active: true,
  name: "Replica Lazy Sunday Morning Eau De Toilette",
  quantity: 200,
  buyQuantity: 198,
  extra: {
    depth: 2,
    restamount: "",
    date: "",
    parent: "",
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
const validateAmount = (restamount: number, amount: number) => {
  return restamount >= 0 && restamount <= amount;
};

const validatePrice = (price: number, fixed: number) => {
  return price >= 100 && price < fixed;
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

const validateContent = (content: string) => {
  return content.length > 10;
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
    /* 이미지 상태 업데이트 */
    case "UPLOAD_IMAGE":
      return {
        ...state,
        mainImages: action.payload.uploadedPaths,
        previewImages: action.payload.previewUrls,
      };
    /* 남은용량 유효성 검사 */
    case "VALIDATE_RESTAMOUNT": {
      const restamountValue = parseInt(action.payload.value, 10);
      const isValidRestAmount = validateAmount(restamountValue, state.amount);
      return {
        ...state,
        valids: {
          ...state.valids,
          restamount: isValidRestAmount,
        },
        errorMessages: {
          ...state.errorMessages,
          restamount: isValidRestAmount ? null : "정가 용량 이하이어야 합니다.",
        },
      };
    }
    /* 가격 유효성 검사 */
    case "VALIDATE_PRICE": {
      const priceValue = action.payload.value;
      const isValidPrice = validatePrice(priceValue, state.fixed);
      return {
        ...state,
        valids: {
          ...state.valids,
          price: isValidPrice,
        },
        errorMessages: {
          ...state.errorMessages,
          price: isValidPrice ? null : "정가 가격보다 낮아야 합니다.",
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
    default:
      return state;
  }
}

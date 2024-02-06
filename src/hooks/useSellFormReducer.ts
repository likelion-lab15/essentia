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

export function useSellFormReducer(state, action) {
  switch (action.type) {
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

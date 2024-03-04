export type TFormSellInput =
  | "price"
  | "date"
  | "content"
  | "name"
  | "quantity"
  | "buyQuantity"
  | "amount"
  | string;

export type TExtra = {
  depth?: number;
  restamount?: string;
  date?: string;
};

export type TFromSellState = {
  price: string;
  content: string;
  mainImages: string[];
  previewImages: string[];
  shippingFees: number;
  show: boolean;
  active: boolean;
  name: string;
  quantity: number;
  buyQuantity: number;
  amount: number;
  fixedPrice: number;
  extra: TExtra;
  valids: Record<TFormSellInput, boolean | null>;
  errorMessages: Record<TFormSellInput, string | null>;
};

export type TFormSellAction =
  | {
      type: "CHANGE_INPUT";
      payload: { name: TFormSellInput; value: string | number | boolean };
    }
  | { type: "VALIDATE_PRICE"; payload: { value: any } }
  | { type: "VALIDATE_DATE"; payload: string }
  | { type: "VALIDATE_CONTENT"; payload: { value: string } }
  | {
      type: "UPLOAD_IMAGE";
      payload: { uploadedPaths: string[]; previewUrls: string[] };
    }
  | { type: "VALIDATE_RESTAMOUNT"; payload: { value: any } };

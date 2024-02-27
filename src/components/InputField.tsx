/* eslint-disable no-unused-vars */
import React from "react";

type TInputField = {
  label: string;
  id: string;
  type: string;
  name?: string;
  placeholder?: string;
  errorMessage?: string | null;
  invalid?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddressChange?: (selectedAddress: string) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  readOnly?: boolean;
};

export default function InputField({
  label,
  id,
  type,
  name,
  placeholder,
  errorMessage,
  invalid,
  onChange,
  onBlur,
  value,
  readOnly,
}: TInputField) {
  return (
    <div className="flex h-[106px] w-[400px] flex-col text-14">
      <label
        className="flex h-[38px] w-full items-center font-semibold"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`h-[38px] w-full border-b border-primary ${
          invalid ? "border-warning" : ""
        }`}
        id={id}
        type={type}
        placeholder={placeholder}
        aria-errormessage={id + "Error"}
        aria-invalid={invalid ? "true" : "false"}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        readOnly={readOnly}
        name={name}
      />
      {errorMessage !== null && (
        <div
          id={id + "Error"}
          aria-live="polite"
          className="flex h-[30px] w-full items-center text-warning"
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
}

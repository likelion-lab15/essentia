/* eslint-disable no-unused-vars */
import React from "react";

type TInputField = {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  showError?: boolean;
  errorMessage?: string;
  invalid?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  srOnly?: boolean;
};

export default function InputField({
  label,
  id,
  type,
  placeholder,
  showError,
  errorMessage,
  invalid,
  onChange,
  value,
  srOnly,
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
        className="h-[38px] w-full border-b border-primary"
        id={id}
        type={type}
        placeholder={placeholder}
        aria-errormessage={id + "Error"}
        aria-invalid={invalid}
        onChange={onChange}
        value={value}
      />
      {showError && (
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

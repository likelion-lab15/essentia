import React from "react";

type TInputField = {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  errormessage: string;
  invalid: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({
  label,
  id,
  type,
  placeholder,
  errormessage,
  invalid,
  onChange,
}: TInputField) {
  return (
    <div className="flex h-[76px] w-[400px] flex-col justify-center border-b border-primary text-14">
      <label
        className="flex h-[38px] w-full items-center font-semibold"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="h-[38px] w-full"
        id={id}
        type={type}
        placeholder={placeholder}
        aria-errormessage={errormessage}
        aria-invalid={invalid}
        onChange={onChange}
      />
    </div>
  );
}

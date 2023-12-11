import React from "react";
import { cn } from "@/utils/_index";

type TButton = {
  label: string;
  type: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
};

export default function Button({ label, type, className, onClick }: TButton) {
  return (
    <button
      type={type}
      className={cn(
        "h-[50px] w-[400px] bg-primary text-20 font-medium text-white hover:bg-secondary hover:text-primary",
        className
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

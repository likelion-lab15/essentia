import React from "react";

type BackDropType = {
  children: React.ReactNode;
  loginModalHandler: () => void;
};

export default function Test({ children }: BackDropType) {
  return (
    <div
      className="h-[100px] w-[100px] border"
      onClick={() => {
        console.log("test");
      }}
    >
      {children}
    </div>
  );
}

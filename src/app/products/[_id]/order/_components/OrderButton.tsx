"use client";

import Button from "@/components/Button";

export default function OrderButton() {
  return (
    <Button
      label="구매 결정하기"
      type="button"
      className="mt-[100px] w-[600px] font-bold"
      onClick={() => console.log("구매하기 버튼 클릭")}
    />
  );
}

"use client";

import { useUserStore } from "@/stores/_index";

export default function UserName() {
  const user = useUserStore((state) => state.user);

  return (
    <>
      <span className="text-[48px] font-bold">{user.name} </span>님 환영합니다
    </>
  );
}

"use client";

import useClientSession from "@/hooks/useClientSession";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { ToolTip } from "@/components/_index";

export default function SignInToggleButton({
  serverUserSession,
}: {
  serverUserSession: string;
}) {
  const { getUserSession } = useClientSession();
  const clientUserSession = getUserSession();

  return (
    <ToolTip text={serverUserSession ? "LOGOUT" : "LOGIN"}>
      <button
        aria-label="로그인 또는 로그아웃하기"
        className="flex h-full w-full items-center bg-center bg-no-repeat p-[10px]"
        onClick={clientUserSession ? () => signOut() : () => signIn()}
      >
        <Image
          src={serverUserSession ? "/signout-icon.svg" : "/signin-icon.svg"}
          alt="로그인 로그아웃 아이콘"
          width={24}
          height={24}
        />
      </button>
    </ToolTip>
  );
}

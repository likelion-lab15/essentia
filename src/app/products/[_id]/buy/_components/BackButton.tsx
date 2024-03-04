"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button label="뒤로가기" type="button" onClick={() => router.back()} />
  );
}

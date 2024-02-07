"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function BuyButton({
  productId,
  buyProductId,
  amount,
}: {
  productId: string;
  buyProductId: number;
  amount: number;
}) {
  const router = useRouter();
  return (
    <Button
      className="mb-[15px] h-[60px] w-[120px] border-2 border-primary bg-secondary text-primary hover:bg-primary hover:text-secondary"
      label="구매하기"
      type="button"
      onClick={() =>
        router.push(
          `/products/${productId}/order?&perchaseItem=${buyProductId}&amount=${amount}`
        )
      }
    />
  );
}

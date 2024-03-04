"use client";

import Button from "@/components/Button";
import useClientSession from "@/hooks/useClientSession";

export default function OrderButton({ targetId }: { targetId: string }) {
  /* 세션, 상품 ID 가져오기 */
  const { getAccessToken, getUserSession } = useClientSession();
  const productId = parseInt(targetId);
  /* 유저 정보 */
  const accessToken = getAccessToken();
  const userSession = getUserSession();
  const userName = userSession?.name;
  const userAddressValue = userSession?.extra?.addressBook?.value;
  const userAddressDetail = userSession?.extra?.addressBook?.detail;
  const userAddress = `${userAddressValue} ${userAddressDetail}`;

  /* 구매하기 요청 POST 통신 */
  const requestOrder = async (productId: number) => {
    if (!userSession) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          products: [
            {
              _id: productId,
              quantity: 1,
            },
          ],
          address: {
            name: userName,
            value: userAddress,
          },
        }),
        cache: "no-cache",
      });
      alert("상품 주문이 완료되었습니다. 주문 내역을 확인해주세요.");
      if (!res.ok) {
        throw new Error("상품 주문 실패");
      }
    } catch (error) {
      console.error("상품 주문 요청 중 에러가 발생하였습니다. :", error);
      throw error;
    }
  };

  return (
    <Button
      label="구매 결정하기"
      type="button"
      className="mt-[100px] w-[600px] font-bold"
      onClick={() => requestOrder(productId)}
    />
  );
}

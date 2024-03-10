"use client";

import Button from "@/components/Button";
import { fetchPrivateData } from "@/fetch/fetch";
import useClientSession from "@/hooks/useClientSession";

export default function OrderButton({ targetId }: { targetId: string }) {
  /* 세션, 상품 ID 가져오기 */
  const { getAccessToken, getUserSession } = useClientSession();
  const productId = parseInt(targetId);
  /* 유저 정보 */
  const accessToken = getAccessToken() as string;
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

    const orderData = {
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
    };

    try {
      // fetchPrivateData 함수를 사용해 주문 요청을 보냅니다.
      const response = await fetchPrivateData("orders", accessToken, {
        method: "POST",
        body: JSON.stringify(orderData),
        cache: "no-cache",
      });

      // response를 기반으로 알림을 보냅니다.
      if (response) {
        alert("상품 주문이 완료되었습니다. 구매 내역을 확인해주세요.");
      } else {
        alert("상품 주문에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("상품 주문 요청 중 에러가 발생하였습니다. :", error);
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

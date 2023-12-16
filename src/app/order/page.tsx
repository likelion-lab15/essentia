"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function page() {
  // 향수 정보 상태 관리
  const [order, setOrder] = useState({
    products: [],
    address: {
      name: "",
      value: "",
    },
    user_id: "",
    cost: {
      products: 0,
      shippingFees: 0,
      total: 0,
    },
  });

  // 향수 정보 가져오기
  useEffect(() => {
    const getProductOrder = async () => {
      // sessionStorage에서 인증 토큰(accessToken)을 가져와서 요청 헤더에 포함
      const userDataString = sessionStorage.getItem("user");
      const accessToken = userDataString
        ? JSON.parse(userDataString).state.user.token.accessToken
        : null;

      try {
        const response = await axios.get("https://localhost/api/orders/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const result = response.data.item;
        console.log(result);

        // 데이터가 존재하는 경우 상태 업데이트
        if (result && result.length > 0) {
          setOrder(result[0]); // 첫 번째 주문 정보를 상태로 설정
        }

        console.log(result[0].products[0].name);
      } catch (error) {
        console.error("Error 🥲", error);
      }
    };

    getProductOrder();
  }, []);

  return (
    <section className="flex flex-col items-center pt-[120px]">
      <h2 className="mb-[66px] text-36 font-bold">주문 정보 등록</h2>

      {/* 체크박스 */}
      <div className="h-[205px] w-[600px]">
        <h3 className="text-18 font-bold">구매하시기 전에 꼭 확인하세요</h3>

        <li className="flex">
          <div className="h-[34px]">
            <input type="checkbox" className="h-[26px] w-[26px]" />
          </div>
          <div>
            <p className="text-12 font-bold">구매하려는 상품이 맞습니다.</p>
            <p className="text-10 font-regular">
              상품 이미지, 상품명, 사이즈를 한 번 더 확인했습니다. 단, 상품의
              이미지는 촬영 환경에 따라 실제와 다를 수 있습니다.
            </p>
          </div>
        </li>
      </div>
      {/* 구매할 향수 정보 */}
      {order.products && order.products.length > 0 && (
        <div className="flex h-[150px] w-[600px] flex-row items-center border-b-[2px] border-primary">
          {/* 향수 이미지 */}
          <img
            src={order.products[0].image}
            alt={order.products[0].name}
            className="mr-[50px] h-[120px] w-[120px]"
          />
          {/* 사용자 상호작용 */}
          <div>
            <p className="text-24 font-medium">{order.products[0].name}</p>
            <p className="text-24 font-medium">{order.address.name}</p>
            {/* 기타 표시할 정보 */}
          </div>
        </div>
      )}
    </section>
  );
}

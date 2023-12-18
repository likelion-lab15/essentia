"use client";

import { useEffect, useState } from "react";
import { useTokenStore } from "@/stores/_index";
import axios from "axios";
import Button from "@/components/Button";

export default function Order() {
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
  const token = useTokenStore((state) => state.token);

  // 향수 정보 가져오기
  useEffect(() => {
    const getProductOrder = async () => {
      // useTokenStore에서 인증 토큰(accessToken)을 가져와서 요청 헤더에 포함
      const accessToken = token.accessToken;

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
      } catch (error) {
        console.error("Error 🥲", error);
      }
    };

    getProductOrder();
  }, []);

  return (
    <section className="flex flex-col items-center">
      <h2 className="py-[60px] text-36 font-bold">주문 정보 등록</h2>

      {/* 구매할 향수 정보 */}
      {order.products && order.products.length > 0 && (
        <div className="flex h-[150px] w-[600px] flex-row items-center border-b-[2px] border-primary">
          <img
            src={order.products[0].image}
            alt={order.products[0].name}
            className="mr-[50px] h-[120px] w-[120px]"
          />
          <div>
            <p className="text-18 font-regular">
              {order.products[0].extra.brand}
            </p>
            <p className="my-[12px] text-24 font-medium">
              {order.products[0].name}
            </p>
            <p className="text-16 font-regular">
              {order.products[0].extra.amount[0]}ml
            </p>
          </div>
        </div>
      )}
      {/* 체크박스 */}
      <div className="my-[30px] h-[205px] w-[600px]">
        <h3 className="mb-[12px] text-18 font-bold">
          구매하시기 전에 꼭 확인하세요
        </h3>
        <ul className="flex flex-col gap-[8px]">
          <li className="flex">
            <div className="mr-[10px] flex h-[34px] items-center">
              <input type="checkbox" className="h-[26px] w-[26px] " />
            </div>
            <div>
              <p className="text-12 font-bold">구매하려는 상품이 맞습니다.</p>
              <p className="text-10 font-regular">
                상품 이미지, 상품명, 사이즈를 한 번 더 확인했습니다. 단, 상품의
                이미지는 촬영 환경에 따라 실제와 다를 수 있습니다.
              </p>
            </div>
          </li>
          <li className="flex">
            <div className="mr-[10px] flex h-[34px] items-center">
              <input type="checkbox" className="h-[26px] w-[26px] " />
            </div>
            <div>
              <p className="text-12 font-bold">
                국내/해외에서 발매한 정품 중고상품입니다.
              </p>
              <p className="text-10 font-regular">
                파손이나 사용하는데 문제없는 제품이며 중고상품입니다.
              </p>
            </div>
          </li>
          <li className="flex">
            <div className="mr-[10px] flex h-[34px] items-center">
              <input type="checkbox" className="h-[26px] w-[26px] " />
            </div>
            <div>
              <p className="text-12 font-bold">
                향수 검수에 대한 주의사항을 확인합니다.
              </p>
              <p className="text-10 font-regular">
                박스/패키지와 상품 컨디션에 민감하시다면 검수 기준을 반드시
                확인하시기 바랍니다.
              </p>
            </div>
          </li>
          <li className="flex">
            <div className="mr-[10px] flex h-[34px] items-center">
              <input type="checkbox" className="h-[26px] w-[26px] " />
            </div>
            <div>
              <p className="text-12 font-bold">
                ESSENTIA의 최신 이용정책을 모두 확인하였으며, 구매를 계속합니다.
              </p>
              <p className="text-10 font-regular">
                건전하고 안전한 거래를 위해 반드시 숙지해야할 미입고, 패널티,
                부정거래 등의 이용정책을 확인했습니다.
              </p>
            </div>
          </li>
        </ul>
      </div>
      {/* 배송 정보 */}
      {order.products && order.products.length > 0 && (
        <div>
          <h3 className="flex h-[38px] w-[600px] items-center bg-primary pl-[30px] text-18 font-bold text-white">
            배송 정보
          </h3>
          <div className="my-[15px]">
            <div className="flex">
              <p className="flex h-[24px] w-[92px] items-center justify-center text-12 font-bold">
                받는 분
              </p>
              <p className="flex items-center text-12 font-medium">현지수</p>
            </div>
            <div className="flex">
              <p className="flex h-[24px] w-[92px] items-center justify-center text-12 font-bold">
                연락처
              </p>
              <p className="flex items-center text-12 font-medium">
                01027395166
              </p>
            </div>
            <div className="flex">
              <p className="flex h-[24px] w-[92px] items-center justify-center text-12 font-bold">
                주소지
              </p>
              <p className="flex items-center text-12 font-medium">
                {order.address.value}
              </p>
            </div>
          </div>
          <div className="mt-[100px] flex h-[43px] justify-between border-b-[5px] border-primary px-[32px]">
            <p className="text-24 font-bold">최종 결제 금액</p>
            <p className="text-28 font-bold">
              {order.products[0].price.toLocaleString()}원
            </p>
          </div>
        </div>
      )}
      {/* 구매하기 버튼 */}
      <Button
        label="구매 결정하기"
        type="button"
        className="mt-[100px] w-[600px] font-bold"
      />
    </section>
  );
}

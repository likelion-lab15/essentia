/* eslint-disable @next/next/no-img-element */
"use client";

import Button from "@/components/Button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { axiosPrivate } from "@/api/axios";
import { useProductStore, useUserStore } from "@/stores/_index";
import { useEffect } from "react";

export default function Order() {
  const { user } = useUserStore();
  const { product } = useProductStore((state) => state);
  const router = useRouter();

  // 사용자 로그인 상태 확인
  useEffect(() => {
    if (!user) {
      console.log("로그인이 필요합니다.");
      router.push("/signin");
    }
  }, [user, router]);

  const userName = user?.name;
  const userAddress =
    (user?.extra?.addressBook?.value || "") +
    (user?.extra?.addressBook?.detail || "");
  const userPhone = user?.phone;
  const brand = product.brand;
  const image = product.image;
  const name = product.name;
  const searchParams = useSearchParams();
  const getId = Number(searchParams.get("perchaseItem")); // 자식 상품 id
  const price = searchParams.get("price"); // 자식 상품 가격
  const amount = searchParams.get("amount"); // 자식 상품 용량

  // 주문정보 제출 함수
  const requestOrder = async () => {
    try {
      const response = await axiosPrivate.post("/orders", {
        products: [
          {
            _id: getId,
            quantity: 1,
          },
        ],
        address: {
          name: userName,
          value: userAddress,
        },
      });
      console.log("POST 통신 성공", response.data);
      alert("주문이 성공적으로 완료되었습니다.");
      router.push("/products");
    } catch (error) {
      console.error("주문하기 통신 에러 발생", error);
    }
  };

  return (
    <section className="mb-[200px] flex flex-col items-center">
      <h2 className="py-[60px] text-36 font-bold">주문 정보 등록</h2>

      {/* 구매할 향수 정보 */}
      <div className="flex h-[200px] w-[600px] flex-row items-center justify-center border-b-[2px] border-primary">
        <img
          src={`${process.env.NEXT_PUBLIC_API_SERVER}${image}`}
          alt="구매할 상품 이미지"
          className=" h-[150px] w-[150px] border-2 border-primary bg-product"
        />
        <div className="ml-[40px] flex h-[150px] w-[500px] flex-col justify-between">
          <div>
            <p className="text-24 font-bold">{brand}</p>
            <p className="my-[12px] text-28 font-medium">{name}</p>
          </div>

          <p className="text-22 font-medium">{amount}ml</p>
        </div>
      </div>
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
      <div>
        <h3 className="flex h-[38px] w-[600px] items-center bg-primary pl-[30px] text-18 font-bold text-white">
          배송 정보
        </h3>
        <div className="my-[15px]">
          <div className="flex">
            <p className="flex h-[24px] w-[92px] items-center justify-center text-12 font-bold">
              받는 분
            </p>
            <p className="flex items-center text-12 font-medium">{userName}</p>
          </div>
          <div className="flex">
            <p className="flex h-[24px] w-[92px] items-center justify-center text-12 font-bold">
              연락처
            </p>
            <p className="flex items-center text-12 font-medium">{userPhone}</p>
          </div>
          <div className="flex">
            <p className="flex h-[24px] w-[92px] items-center justify-center text-12 font-bold">
              주소지
            </p>
            <p className="flex items-center text-12 font-medium">
              {userAddress}
            </p>
          </div>
        </div>
        <div className="mt-[100px] flex h-[43px] justify-between border-b-[5px] border-primary px-[32px]">
          <p className="text-24 font-bold">최종 결제 금액</p>
          <p className="text-28 font-bold">
            {Number(price).toLocaleString()}원
          </p>
        </div>
      </div>
      {/* 구매하기 버튼 */}
      <Button
        label="구매 결정하기"
        type="button"
        className="mt-[100px] w-[600px] font-bold"
        onClick={() => requestOrder()}
      />
    </section>
  );
}

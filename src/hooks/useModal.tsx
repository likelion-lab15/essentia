"use client";

import { createPortal } from "react-dom";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

type TModalPortal = {
  children: React.ReactNode;
};

export default function useModal() {
  /* 모달창 상태관리 */
  const [modal, setModal] = useState(false);

  // 모달창 여는 함수
  const openModal = () => {
    setModal(true);
    document.body.style.overflow = "hidden";
  };

  // 모달창 닫는 함수
  const closeModal = () => {
    setModal(false);
    document.body.style.overflow = "auto";
  };

  // reactPortal을 사용하여 모달창을 렌더링하는 함수
  const ModalPortal = ({ children }: TModalPortal) => {
    const ref = useRef<Element | null>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      if (document) {
        const dom = document.querySelector("#portal");
        ref.current = dom;
      }
    }, []);

    if (ref.current && mounted && modal) {
      return createPortal(
        // 모달 컨테이너 스타일
        <div className="fixed left-0 top-0 z-[99] flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <div>
            <div className="flex h-[38px] items-end justify-between border-b border-primary bg-white">
              <div className="grow"></div>
              <div
                className="flex w-[48px] cursor-pointer items-center justify-center"
                onClick={closeModal}
              >
                <Image
                  src={"/close-button.svg"}
                  alt="팝업창 닫기 버튼"
                  width={25}
                  height={25}
                />
              </div>
            </div>
            {children}
          </div>
        </div>,
        ref.current
      );
    }
    return null;
  };

  return {
    openModal,
    closeModal,
    ModalPortal,
  };
}

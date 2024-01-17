"use client";

import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import TestModal from "@/components/TestModal";

export default function TestComponent() {
  let [Modal, setModal] = useState(false);
  let [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById("portal"));
  }, [Modal]);

  const ModalHandler = () => {
    setModal(!Modal);
  };

  return (
    <>
      <div
        className="h-[200px] w-[200px] border border-primary"
        onClick={ModalHandler}
      >
        <h2>테스트 모달 컨테이너</h2>
      </div>
      {Modal && portalElement
        ? createPortal(<TestModal />, portalElement)
        : null}
    </>
  );
}

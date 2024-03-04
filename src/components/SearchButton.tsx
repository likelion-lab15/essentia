"use client";

import Image from "next/image";
import useModal from "@/hooks/useModal";
import { SearchBar, ToolTip } from "@/components/_index";

export default function SearchButton() {
  const { openModal, closeModal, ModalPortal } = useModal();
  return (
    <>
      <ToolTip text="SEARCH">
        <button
          aria-label="검색창 열기"
          className="m-[5px] flex h-full w-full items-center justify-center bg-center bg-no-repeat p-[10px]"
          onClick={() => {
            openModal();
          }}
        >
          <Image
            src="/search-icon.svg"
            alt="검색 아이콘"
            width={24}
            height={24}
          />
        </button>
      </ToolTip>
      <ModalPortal>
        <SearchBar onClose={closeModal} />
      </ModalPortal>
    </>
  );
}

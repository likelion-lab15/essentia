"use client";

import { useRouter } from "next/navigation";

const MoreButton = ({ path }) => {

  return (
    <button
      type="button"
      className="absolute bottom-[-40px] right-0 text-[14px] font-medium text-[#808080] hover:text-[#222]"
    >
      + 더보기
    </button>
  );
};

export default MoreButton;

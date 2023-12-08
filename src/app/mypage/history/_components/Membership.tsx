import React from "react";

const Membership = () => {
  return (
    <div className="mb-[65px] flex h-[150px] items-center justify-between bg-[#222] text-white">
      <div className="flex-1 py-[35px] pl-[40px]">
        <p className="text-[18px] font-regular">Membership</p>
        <p className="text-[45px] font-bold">Welcome</p>
      </div>
      <div className="w-[275px] py-[35px] pl-[40px]">
        <p className="text-[18px] font-regular">사용가능쿠폰</p>
        <p className="text-[45px] font-bold">1</p>
      </div>
      <div className="w-[275px] py-[35px] pl-[40px]">
        <p className="text-[18px] font-regular">마일리지</p>
        <p className="text-[45px] font-bold">924</p>
      </div>
    </div>
  );
};

export default Membership;

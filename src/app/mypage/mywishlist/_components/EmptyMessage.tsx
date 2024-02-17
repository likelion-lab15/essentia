import Image from "next/image";

export default function EmptyMessage() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image
        src="/heart_empty.svg"
        alt="찜"
        width={32}
        height={32}
        className="mb-[10px]"
      />
      <span className="text-[18px] font-regular">
        찜목록에 상품 데이터가 없습니다
      </span>
    </div>
  );
}

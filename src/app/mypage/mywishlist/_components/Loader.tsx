import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image src="/loading-spinner.svg" width={100} height={100} alt="로딩바" />
    </div>
  );
}

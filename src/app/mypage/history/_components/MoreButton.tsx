import Link from "next/link";

const MoreButton = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      className="absolute bottom-[-40px] right-0 text-[14px] font-medium text-[#808080] hover:text-[#222]"
    >
      + 더보기
    </Link>
  );
};

export default MoreButton;

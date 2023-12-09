import Link from "next/link";

export default function FilterList({ list }) {
  const { title, data } = list;

  return (
    <div>
      <p className="flex h-[46px] cursor-default items-center px-[25px] font-semibold">
        {title}
      </p>
      <ul className="mb-[20px]">
        {data.map((item, index) => {
          const { title, href } = item;
          return (
            <li
              key={index}
              className="flex h-[36px] cursor-pointer items-center px-[25px] font-medium text-[#808080] hover:bg-[#A0D1EF] hover:text-[#222]"
            >
              <Link href={href}>{title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

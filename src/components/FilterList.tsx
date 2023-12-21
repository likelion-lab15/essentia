"use client";

import Link from "next/link";

type TFilterList = {
  list: {
    title: string;
    data: {
      title: string;
      href: string;
    }[];
  };
  onClick?: (title: string) => void;
};

export default function FilterList({ list, onClick }: TFilterList) {
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
              className="flex h-[36px] cursor-pointer items-center px-[25px] font-medium text-tertiary hover:bg-secondary hover:text-primary"
              onClick={() => onClick && onClick(title)}
            >
              <Link href={href} className="flex h-full flex-1 items-center">
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

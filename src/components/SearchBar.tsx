"use client";
import { FormEvent, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

type TSearchBar = {
  _id: string;
  name: string;
};

type TSearchBarProps = {
  onClose: () => void;
};

export default function SearchBar({ onClose }: TSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<TSearchBar[]>([]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://localhost/api/products?keyword=${encodeURIComponent(
          searchTerm
        )}`
      );
      setSearchResults(response.data.item);
    } catch (error) {
      console.error("검색 중 오류 발생 🥲", error);
    }
  };

  /* 라우터 설정을 위한 useRouter 사용 */
  const router = useRouter();

  /* prudcts/[id]로 이동시킨 후 검색창 닫는 함수 */
  const handleItemClick = (itemId: string) => {
    router.push(`/products/${itemId}`);
    onClose(); // 검색창 닫기
  };

  return (
    <div className="z-100 border-3 fixed top-[80px] h-screen w-screen bg-white bg-opacity-95">
      <div className="absolute right-[100px] top-[200px] flex-col">
        {/* 검색 폼 */}
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[800px] border-b-[5px] border-primary bg-transparent text-36 font-bold"
          />
          <button type="submit" className="absolute right-[10px] top-[-5px]">
            <Image
              src="/search-big-icon.svg"
              alt="검색 아이콘"
              width={55}
              height={55}
            />
          </button>
        </form>
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="fixed right-[40px] top-[100px]">
          <Image
            src="/close-icon.svg"
            alt="닫기 아이콘"
            width={60}
            height={60}
          />
        </button>
        {/* 검색 결과 표시 */}
        {searchResults.length > 0 && (
          <ul className="border-x-[2px] border-b-[2px] border-tertiary text-16 font-regular">
            {searchResults.map((item) => (
              <li
                key={item._id}
                onClick={() => handleItemClick(item._id)}
                className="cursor-pointer py-[15px] pl-[20px] hover:bg-secondary"
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

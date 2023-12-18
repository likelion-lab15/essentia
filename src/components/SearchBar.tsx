"use client";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
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

  return (
    <div className="absolute right-[100px] top-[200px] flex-col">
      <form onSubmit={handleSearch} className="">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[800px] border-b-[5px] border-primary text-36 font-bold"
        />
        <button type="submit">
          <Image
            src="/search-big-icon.svg"
            alt="검색 아이콘"
            width={55}
            height={55}
            className="absolute right-[10px] top-[-5px]"
          />
        </button>
      </form>

      {/* 검색 결과 표시 */}
      {searchResults.length > 0 && (
        <ul className="border-x-[2px] border-b-[2px] border-tertiary text-16 font-regular">
          {searchResults.map((item) => (
            <li
              key={item._id}
              className="py-[15px] pl-[20px] hover:bg-secondary"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

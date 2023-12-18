"use client";
import { useState } from "react";
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
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">검색</button>
      </form>

      {/* 검색 결과 표시 */}
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((item) => (
            <li key={item._id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

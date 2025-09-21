import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input.trim() !== "") onSearch(input.trim());
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="flex w-11/12 max-w-lg shadow-lg rounded-full overflow-hidden border border-gray-300">
        <input
          type="text"
          placeholder="Search Nashid..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 px-4 py-2 focus:outline-none text-sm font-kufi"
        />
        <button
          onClick={handleSearch}
          className="bg-islamicGreen hover:bg-islamicDark text-white px-4 flex items-center justify-center transition-colors duration-200"
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
}


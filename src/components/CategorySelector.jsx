import React, { useState } from "react";

export default function CategorySelector({ categories, onSelect }) {
  const [openCountry, setOpenCountry] = useState(null);

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4">
      {Object.entries(categories).map(([country, items]) => (
        <div
          key={country}
          className="w-40 bg-islamicCream border border-islamicGold rounded-lg shadow-sm overflow-hidden transform transition duration-200 hover:scale-105 hover:shadow-md"
        >
          {/* Country Header */}
          <button
            onClick={() => setOpenCountry(openCountry === country ? null : country)}
            className="w-full py-2 px-3 bg-islamicGreen text-white font-kufi text-center text-sm hover:bg-islamicDark transition-colors"
          >
            {country}
          </button>

          {/* Category List */}
          <ul
            className={`transition-max-height duration-300 ease-in-out overflow-hidden bg-white text-sm ${
              openCountry === country ? "max-h-64" : "max-h-0"
            }`}
          >
            {items.map((cat, idx) => (
              <li key={idx} className="border-b last:border-b-0">
                <button
                  onClick={() => onSelect(cat)}
                  className="w-full text-left px-3 py-1 text-islamicGreen hover:bg-islamicGold hover:text-white font-arabic transition-colors duration-150"
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

import { useState } from "react";
import { menuItems } from "../data/menuData";
import MenuCard from "./MenuCard";

const categories = ["all", "food", "drinks", "desserts"];

export default function MenuGrid() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter items based on active category
  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Category filter tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-colors
              ${
                activeCategory === cat
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

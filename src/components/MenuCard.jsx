import { useCart } from "../context/CartContext";

export default function MenuCard({ item }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
      {/* Emoji image area */}
      <div className="bg-orange-50 rounded-xl h-32 flex items-center justify-center text-6xl">
        {item.emoji}
      </div>

      {/* Item details */}
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
        <p className="text-sm text-gray-500 leading-snug">{item.description}</p>
      </div>

      {/* Price + Add button */}
      <div className="flex items-center justify-between mt-auto">
        <span className="text-orange-500 font-bold text-lg">
          ${item.price.toFixed(2)}
        </span>
        <button
          onClick={() => addToCart(item)}
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
        >
          + Add
        </button>
      </div>
    </div>
  );
}

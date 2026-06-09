import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Restaurant name */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            🍽️ Takos
          </h1>
          <p className="text-sm text-gray-500">Digital Menu</p>
        </div>

        {/* Cart button with badge */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium transition-colors"
        >
          <ShoppingCart size={18} />
          <span>Cart</span>

          {/* Badge — only shows when cart has items */}
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

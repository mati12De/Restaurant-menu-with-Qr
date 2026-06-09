import { useCart } from "../context/CartContext";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";

export default function CartSidebar() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    tableNumber,
  } = useCart();

  function handlePlaceOrder() {
    if (cartItems.length === 0) return;

    const order = {
      id: Date.now(),
      items: cartItems,
      total: cartTotal,
      status: "pending",
      time: new Date().toLocaleTimeString(),
      table: tableNumber, // ← table number saved here
    };

    const existing = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...existing, order]));

    clearCart();
    setIsCartOpen(false);
    alert(
      `✅ Order placed! Table ${tableNumber} — Total: $${cartTotal.toFixed(2)}`,
    );
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
          ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl
          flex flex-col transition-transform duration-300
          ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header — shows table number */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Your Order</h2>
            <p className="text-sm text-orange-500 font-medium">
              Table {tableNumber}
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
          {cartItems.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="text-sm">Your cart is empty</p>
            </div>
          )}

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
            >
              <span className="text-3xl">{item.emoji}</span>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                <p className="text-orange-500 text-sm font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-orange-300 transition-colors"
                >
                  <Minus size={12} />
                </button>
                <span className="text-sm font-semibold w-4 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-orange-300 transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-100 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total</span>
              <span className="text-xl font-bold text-gray-900">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Place Order 🎉
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

import { useState, useEffect } from "react";

// Status badge colors
const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  preparing: "bg-blue-100 text-blue-700",
  done: "bg-green-100 text-green-700",
};

export default function AdminPage() {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage
  useEffect(() => {
    loadOrders();
  }, []);

  function loadOrders() {
    const saved = JSON.parse(localStorage.getItem("orders") || "[]");
    // Show newest first
    setOrders(saved.reverse());
  }

  // Update a single order's status
  function updateStatus(id, newStatus) {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order,
    );
    setOrders(updated);
    // Save back to localStorage — reverse again to keep correct order
    localStorage.setItem("orders", JSON.stringify([...updated].reverse()));
  }

  // Clear all orders
  function clearAllOrders() {
    if (!confirm("Clear all orders?")) return;
    localStorage.removeItem("orders");
    setOrders([]);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              👨‍🍳 Kitchen Dashboard
            </h1>
            <p className="text-sm text-gray-500">Casa Bella — Orders</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Live refresh */}
            <button
              onClick={loadOrders}
              className="text-sm text-orange-500 hover:text-orange-600 font-medium border border-orange-200 px-3 py-2 rounded-lg transition-colors"
            >
              🔄 Refresh
            </button>
            {/* Clear all */}
            <button
              onClick={clearAllOrders}
              className="text-sm text-red-500 hover:text-red-600 font-medium border border-red-200 px-3 py-2 rounded-lg transition-colors"
            >
              🗑️ Clear All
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Empty state */}
        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
            <span className="text-6xl">🍽️</span>
            <p className="text-lg font-medium">No orders yet</p>
            <p className="text-sm">
              Orders will appear here when customers place them
            </p>
          </div>
        )}

        {/* Stats bar */}
        {orders.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
              <p className="text-3xl font-bold text-gray-900">
                {orders.length}
              </p>
              <p className="text-sm text-gray-500 mt-1">Total Orders</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
              <p className="text-3xl font-bold text-yellow-500">
                {orders.filter((o) => o.status === "pending").length}
              </p>
              <p className="text-sm text-gray-500 mt-1">Pending</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
              <p className="text-3xl font-bold text-green-500">
                {orders.filter((o) => o.status === "done").length}
              </p>
              <p className="text-sm text-gray-500 mt-1">Done</p>
            </div>
          </div>
        )}

        {/* Orders list */}
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* Order header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-orange-500">
                    T{order.table}
                  </span>
                  <div>
                    <p className="text-xs text-gray-400">Order #{order.id}</p>
                    <p className="text-xs text-gray-400">{order.time}</p>
                  </div>
                </div>

                {/* Status badge + controls */}
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>

                  {/* Action buttons based on current status */}
                  {order.status === "pending" && (
                    <button
                      onClick={() => updateStatus(order.id, "preparing")}
                      className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full transition-colors"
                    >
                      Start Preparing
                    </button>
                  )}
                  {order.status === "preparing" && (
                    <button
                      onClick={() => updateStatus(order.id, "done")}
                      className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full transition-colors"
                    >
                      Mark Done ✓
                    </button>
                  )}
                </div>
              </div>

              {/* Order items */}
              <div className="px-5 py-4 flex flex-col gap-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-700">
                      {item.emoji} {item.name}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400">x{item.quantity}</span>
                      <span className="font-medium text-gray-900 w-16 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order footer — total */}
              <div className="px-5 py-3 bg-gray-50 flex items-center justify-between">
                <span className="text-sm text-gray-500">Order Total</span>
                <span className="font-bold text-gray-900">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

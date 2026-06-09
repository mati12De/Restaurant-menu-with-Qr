import { createContext, useContext, useState } from "react";

// 1. Create the context
const CartContext = createContext();

// 2. Build the provider — holds all cart logic
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add item — if it already exists, increase quantity
  function addToCart(item) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }

  // Remove one quantity — if it hits 0, remove from array
  function removeFromCart(id) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing.quantity === 1) {
        return prev.filter((i) => i.id !== id);
      }
      return prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
      );
    });
  }

  // Clear the whole cart
  function clearCart() {
    setCartItems([]);
  }

  // Total item count for the badge
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  // Total price
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 3. Custom hook — cleaner to use in components
export function useCart() {
  return useContext(CartContext);
}

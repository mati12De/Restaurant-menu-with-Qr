export const menuItems = [
  // --- FOOD ---
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic tomato sauce, fresh mozzarella, basil",
    price: 12.99,
    category: "food",
    emoji: "🍕",
  },
  {
    id: 2,
    name: "Chicken Burger",
    description: "Crispy chicken, lettuce, tomato, special sauce",
    price: 9.99,
    category: "food",
    emoji: "🍔",
  },
  {
    id: 3,
    name: "Pasta Carbonara",
    description: "Creamy egg sauce, pancetta, parmesan, black pepper",
    price: 13.99,
    category: "food",
    emoji: "🍝",
  },
  {
    id: 4,
    name: "Caesar Salad",
    description: "Romaine lettuce, croutons, parmesan, caesar dressing",
    price: 8.99,
    category: "food",
    emoji: "🥗",
  },

  // --- DRINKS ---
  {
    id: 5,
    name: "Fresh Lemonade",
    description: "Freshly squeezed lemons, mint, sugar syrup",
    price: 3.99,
    category: "drinks",
    emoji: "🍋",
  },
  {
    id: 6,
    name: "Mango Smoothie",
    description: "Fresh mango, yogurt, honey, ice",
    price: 4.99,
    category: "drinks",
    emoji: "🥭",
  },
  {
    id: 7,
    name: "Espresso",
    description: "Double shot, rich and bold",
    price: 2.99,
    category: "drinks",
    emoji: "☕",
  },

  // --- DESSERTS ---
  {
    id: 8,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake, melted center, vanilla ice cream",
    price: 6.99,
    category: "desserts",
    emoji: "🍫",
  },
  {
    id: 9,
    name: "Tiramisu",
    description: "Espresso soaked ladyfingers, mascarpone cream",
    price: 5.99,
    category: "desserts",
    emoji: "🍰",
  },
];

// Read table number from URL — ?table=3
export function getTableNumber() {
  const params = new URLSearchParams(window.location.search);
  return params.get("table") || "1";
}

import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />

        {/* Placeholder — we'll replace this in Step 3 */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-gray-500 text-center">Menu coming in Step 3...</p>
        </main>
      </div>
    </CartProvider>
  );
}

import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import MenuGrid from "./components/MenuGrid";
import CartSidebar from "./components/CartSidebar";
import QRPage from "./pages/QRPage";
import AdminPage from "./pages/AdminPage";

const path = window.location.pathname;

export default function App() {
  if (path === "/qr") return <QRPage />;
  if (path === "/admin") return <AdminPage />;

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <MenuGrid />
        <CartSidebar />
      </div>
    </CartProvider>
  );
}

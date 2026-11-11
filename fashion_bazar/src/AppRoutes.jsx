import { Routes, Route, Navigate } from "react-router-dom";
import { PublicLayout } from "./layouts/PublicLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import ShopPage from "./pages/ShopPage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import SellPage from "./pages/SellPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import CookiesPage from "./pages/CookiesPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ShopPage />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        {/* /categories on its own would repeat /products, so send it there */}
        <Route path="/categories" element={<Navigate to="/products" replace />} />
        <Route path="/categories/:categorySlug" element={<ShopPage />} />
        <Route path="/new-arrivals" element={<ShopPage />} />
        <Route path="/deals" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/orders/:orderId" element={<AccountPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/help/faq" element={<FaqPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

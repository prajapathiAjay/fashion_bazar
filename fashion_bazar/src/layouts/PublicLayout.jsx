import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileTabBar from "../components/MobileTabBar";

export const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white pb-16 lg:pb-0">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileTabBar />
    </div>
  );
};

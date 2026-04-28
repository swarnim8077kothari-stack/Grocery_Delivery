import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  const [cartItems, setCartItems] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatIcon, setChatIcon] = useState("💬");
  const [currentPage, setCurrentPage] = useState(window.location.hash === "#login" ? "login" : "home");

  useEffect(() => {
    const syncPageWithHash = () => {
      setCurrentPage(window.location.hash === "#login" ? "login" : "home");
    };

    window.addEventListener("hashchange", syncPageWithHash);
    return () => window.removeEventListener("hashchange", syncPageWithHash);
  }, []);

  const handleChatClick = () => {
    setChatIcon("🌿");
    window.setTimeout(() => {
      setChatIcon("💬");
    }, 1100);
  };

  const goToLogin = () => {
    window.location.hash = "login";
  };

  const goHome = () => {
    window.location.hash = "";
  };

  if (currentPage === "login") {
    return <LoginPage onBackHome={goHome} />;
  }

  return (
    <HomePage
      cartItems={cartItems}
      chatIcon={chatIcon}
      menuOpen={menuOpen}
      searchTerm={searchTerm}
      onAddToCart={() => setCartItems((count) => count + 1)}
      onChatClick={handleChatClick}
      onGoToLogin={goToLogin}
      onSearchChange={setSearchTerm}
      onToggleMenu={() => setMenuOpen((open) => !open)}
    />
  );
}

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminLogin from "./pages/Login"; // This is your AuthPage component
import UserRegister from "./pages/UserRegister";
import UserDashboard from "./pages/UserDashboard"; // <-- ADDED THIS IMPORT (Make sure the filename matches your file)
import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/Users";
import Retailers from "./pages/Retailers";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AdminLogin />} />

      <Route path="/UserRegister" element={<UserRegister />} />

      {/* ==================================================== */}
      {/* ADDED THIS ROUTE TO MATCH YOUR LOGIN REDIRECT        */}
      {/* ==================================================== */}
      <Route path="/UserDashboard" element={<UserDashboard />} />

      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/retailers" element={<Retailers />} />
      <Route path="/products" element={<Products />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
}

export default App;

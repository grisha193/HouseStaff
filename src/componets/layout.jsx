import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout({ orders, onDelete, onUpdateQuantity, userId }) {
  return (
    <div className="wrapper">
      <Header
        orders={orders}
        onDelete={onDelete}
        onUpdateQuantity={onUpdateQuantity}
        userId={userId}
      />
      <Footer />
    </div>
  );
}

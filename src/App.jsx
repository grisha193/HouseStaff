import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AboutUsPage from './Pages/AboutUsPage';
import ContactsPage from './Pages/ContactsPage';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import ProfilePage from './Pages/ProfilePage';
import ProductDetailPage from './Pages/ProductDetailPage';
import Layout from './componets/layout';
import { useAuth } from './auth/authContext';
import React, { useEffect, useState } from 'react';

function App() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const userId = user?.id || null;

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8000/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
        .then((res) => res.json())
        .then((cartItems) => {
          const enrichedItems = cartItems.map((cartItem) => ({
            ...cartItem.item,
            cartId: cartItem.id,
            count: cartItem.count,
          }));
          setOrders(enrichedItems);
        });
    }
  }, [userId]);

  const deleteOrder = (cartId) => {
    setOrders((prev) => prev.filter((item) => item.cartId !== cartId));
    if (userId) {
      fetch(`http://localhost:8000/api/cart/${cartId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
    }
  };

  const updateQuantity = async (cartId, newCount) => {
    if (newCount < 1) return;
    setOrders((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, count: newCount } : item
      )
    );
    if (userId) {
      await fetch(`http://localhost:8000/api/cart/${cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({ count: newCount }),
      });
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            orders={orders}
            onDelete={deleteOrder}
            onUpdateQuantity={updateQuantity}
            userId={userId}
          />
        }
      >
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutUsPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="items/:id" element={<ProductDetailPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
    </Routes>
  );
}

export default App;

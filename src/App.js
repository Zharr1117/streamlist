// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import StreamList from "./components/StreamList";
import Movies from "./components/Movies";
import Cart from "./components/Cart";
import About from "./components/About";
import MovieSearch from "./components/MovieSearch";
import Login from "./components/Login";
import Register from "./components/Register";
import CreditCard from "./components/CreditCard";
import SubscriptionList from "./components/SubscriptionList"; // ✅ Import SubscriptionList
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function App() {
  // 🛒 Initialize Cart State from Local Storage
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // 💾 Sync Cart State with Local Storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ➕ Add Item to Cart (Restricting Subscriptions)
  const addToCart = (item) => {
    const isSubscription = item.id <= 4;
    const hasSubscription = cartItems.some((cartItem) => cartItem.id <= 4);

    if (isSubscription && hasSubscription) {
      alert("You can only add one subscription at a time!");
      return;
    }

    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, amount: cartItem.amount + 1 } : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, amount: 1 }]);
    }
  };

  // ❌ Remove Item from Cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // 🔄 Update Quantity of Items in Cart
  const updateQuantity = (id, amount) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, amount: Math.max(1, +amount) } : item
      )
    );
  };

  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="content">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <StreamList />
                </PrivateRoute>
              }
            />
            <Route
              path="/movies"
              element={
                <PrivateRoute>
                  <Movies />
                </PrivateRoute>
              }
            />
            <Route
              path="/subscriptions"
              element={
                <PrivateRoute>
                  <SubscriptionList addToCart={addToCart} />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart
                    cartItems={cartItems}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/about"
              element={
                <PrivateRoute>
                  <About />
                </PrivateRoute>
              }
            />
            <Route
              path="/search"
              element={
                <PrivateRoute>
                  <MovieSearch />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <CreditCard />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SubscriptionList from "./components/SubscriptionList";
import Cart from "./components/Cart";
import "./styles.css";

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

    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      // If it's an accessory, increase quantity
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, amount: cartItem.amount + 1 } : cartItem
      ));
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
      cartItems.map((item) => (item.id === id ? { ...item, amount: Math.max(1, +amount) } : item))
    );
  };

  return (
    <Router>
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<SubscriptionList addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

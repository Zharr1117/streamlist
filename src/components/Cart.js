// src/components/Cart.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
    </div>
  );
};

export default Cart;

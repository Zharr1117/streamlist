// src/components/Cart.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  return (
    <div className="cart">
      <h2>Cart Page</h2>
      <p>This page will feature cart data in Week 4.</p>

      {/* ✅ Checkout Button */}
      <button onClick={() => navigate("/checkout")}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;

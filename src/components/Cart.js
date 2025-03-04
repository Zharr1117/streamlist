// src/components/Cart.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  return (
    <div className="cart">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.img} alt={item.service} />
            <h3>{item.service}</h3>
            <p>${item.price}</p>
            <input
              type="number"
              value={item.amount}
              min="1"
              onChange={(e) => updateQuantity(item.id, e.target.value)}
            />
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))
      )}

      <h3>Total: ${total.toFixed(2)}</h3>

      {/* ✅ Show checkout button only if there are items */}
      {cartItems.length > 0 && (
        <button onClick={() => navigate("/checkout")} className="checkout-btn">
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default Cart;

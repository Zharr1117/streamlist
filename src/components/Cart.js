// src/components/Cart.js
import React from "react";
import "./Cart.css";

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.img} alt={item.service} />
            <div>
              <h3>{item.service}</h3>
              <p>{item.serviceInfo}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <input
                type="number"
                min="1"
                value={item.amount}
                onChange={(e) => updateQuantity(item.id, e.target.value)}
              />
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))
      )}
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;

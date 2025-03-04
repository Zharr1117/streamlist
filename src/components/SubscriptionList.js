// src/components/SubscriptionList.js
import React from "react";
import list from "../data";
import "./SubscriptionList.css";

const SubscriptionList = ({ addToCart }) => {
  return (
    <div className="subscription-list">
      <h2>Shop Subscriptions & Accessories</h2>
      {list.map((item) => (
        <div key={item.id} className="subscription-item">
          <img src={item.img} alt={item.service} />
          <h3>{item.service}</h3>
          <p>{item.serviceInfo}</p>
          <p>${item.price.toFixed(2)}</p>
          <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionList;

// src/components/CreditCard.js
import React, { useState } from "react";
import "./CreditCard.css";

const CreditCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    value = value.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cardNumber.length !== 19) {
      setMessage("❌ Invalid card number format.");
      return;
    }

    const cardInfo = {
      cardNumber,
      expiry,
      cvv,
      name,
    };

    localStorage.setItem("creditCardInfo", JSON.stringify(cardInfo));
    setMessage("✅ Card info saved successfully!");
  };

  return (
    <div className="credit-card-container">
      <h2>Checkout - Enter Payment Info</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Cardholder Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Card Number (1234 5678 9012 3456)"
          value={cardNumber}
          onChange={handleCardNumberChange}
          required
        />
        <input
          type="text"
          placeholder="MM/YY"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />
        <button type="submit">Save Payment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreditCard;

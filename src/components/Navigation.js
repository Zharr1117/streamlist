// src/components/Navigation.js
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStream,
  faFilm,
  faShoppingCart,
  faInfoCircle,
  faSearch,
  faSignOutAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("✅ Logged out successfully!");
        navigate("/login");
      })
      .catch((error) => {
        alert("❌ Logout error: " + error.message);
      });
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        <FontAwesomeIcon icon={faStream} /> StreamList
      </NavLink>
      <NavLink to="/movies" className={({ isActive }) => (isActive ? "active" : "")}>
        <FontAwesomeIcon icon={faFilm} /> Movies
      </NavLink>
      <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>
        <FontAwesomeIcon icon={faShoppingCart} /> Cart
      </NavLink>
      <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
        <FontAwesomeIcon icon={faInfoCircle} /> About
      </NavLink>
      <NavLink to="/search" className={({ isActive }) => (isActive ? "active" : "")}>
        <FontAwesomeIcon icon={faSearch} /> Search Movies
      </NavLink>
      <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
        <FontAwesomeIcon icon={faUserPlus} /> Register
      </NavLink>
      <button onClick={handleLogout} className="logout-btn">
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </button>
    </nav>
  );
};

export default Navigation;

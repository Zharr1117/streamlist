// src/components/Navigation.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css"; // Import styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStream, faFilm, faShoppingCart, faInfoCircle, faSearch } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
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
    </nav>
  );
};

export default Navigation;

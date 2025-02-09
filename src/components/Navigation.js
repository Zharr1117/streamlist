// src/components/Navigation.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" exact activeClassName="active">
        <i className="fas fa-stream"></i> StreamList
      </NavLink>
      <NavLink to="/movies" activeClassName="active">
        <i className="fas fa-film"></i> Movies
      </NavLink>
      <NavLink to="/cart" activeClassName="active">
        <i className="fas fa-shopping-cart"></i> Cart
      </NavLink>
      <NavLink to="/about" activeClassName="active">
        <i className="fas fa-info-circle"></i> About
      </NavLink>
    </nav>
  );
};

export default Navigation;

// src/components/Navigation.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar">
      <h1>StreamList</h1>
      <ul>
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            StreamList
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={({ isActive }) => (isActive ? "active" : "")}>
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>
            Cart
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

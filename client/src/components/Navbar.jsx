import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="container nav-wrapper">
        <Link to="/">
          <h2 className="logo">BookStore</h2>
        </Link>

        <div className="logo-actions">
          <div className="cart">
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="cart-value">+3</span>
          </div>
          <button>Login</button>
        </div>
      </div>
    </div>
  );
}

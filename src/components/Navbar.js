import React from "react";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Product Comparison</h1>
      </div>
      <div className="navbar-menu">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/compare">Compare</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

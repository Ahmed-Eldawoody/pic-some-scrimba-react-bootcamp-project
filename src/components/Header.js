import React, { useContext } from "react";
import "../styles.css";
import { Link } from "react-router-dom";
import { Context } from "../Context/Context";

function Header() {
  const { cartItem } = useContext(Context);

  // change the cartIcon class to change shape when it has imges on it
  const cartIconClass =
    cartItem.length > 0 ? "ri-shopping-cart-fill" : "ri-shopping-cart-line";

  return (
    <header>
      <Link to="/">
        <h2>Pic Some</h2>
      </Link>
      <Link to="/cart">
        <i className={`${cartIconClass} ri-fw ri-2x`}></i>
      </Link>
    </header>
  );
}

export default Header;

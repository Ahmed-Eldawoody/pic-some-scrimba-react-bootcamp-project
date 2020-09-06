import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../Context/Context";
import "../styles.css";

//we could use props as a parameter to our function component
//but this is betteer practice
function Image({ className, img }) {
  //initial state for showing the heart & add to cart icons
  const [hovered, setHovered] = useState(false);

  //works as context.Consumer => this one is a hook
  const { toggleFavorite, addToCart, cartItem, removeFromCart } = useContext(
    Context
  );

  //change icon if favorite
  const heartIcon = () => {
    if (img.isFavorite) {
      return (
        <i
          className="ri-heart-fill favorite"
          onClick={() => toggleFavorite(img.id)}
        ></i>
      );
    } else if (hovered) {
      return (
        <i
          className="ri-heart-line favorite"
          onClick={() => toggleFavorite(img.id)}
        ></i>
      );
    }
  };

  //see if the img is on the card array and change the icon
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
  //The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.
  // https://stackoverflow.com/a/8217584
  // How to determine if Javascript array contains an object with an attribute that equals a given value?
  const cartIcon = () => {
    //if the img we hovered on is on the card array display this icon
    //this icon have event listiner that remove the img from the card
    if (cartItem.some((e) => e.id === img.id)) {
      return (
        <i
          className="ri-shopping-cart-fill cart"
          onClick={() => removeFromCart(img.id)}
        ></i>
      );
    } else if (hovered) {
      //if it's not => display this icon
      //this icon have event listiner that add the img from the card
      return (
        <i
          className="ri-add-circle-line cart"
          onClick={() => addToCart(img)}
        ></i>
      );
    }
  };

  return (
    <div
      className={`${className} image-container`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={img.url} className="image-grid" alt="" />
      {heartIcon()} {/* heartIcon is a function */}
      {cartIcon()} {/* cartIcon is a function */}
    </div>
  );
}

// Spacify the props types
Image.propTypes = {
  className: PropTypes.string,

  // An object taking on a particular shape(img)
  img: PropTypes.shape({
    url: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool
  })
};

export default Image;

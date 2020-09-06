import React, { useContext, useState } from "react";
import { Context } from "../Context/Context";
import CartItem from "../components/CartItem";

function Cart() {
  const [placeOrder, setPlaceOrder] = useState("Place Order");
  const { cartItem, emptyCart } = useContext(Context);
  const cartItemElements = cartItem.map((item) => (
    <CartItem key={item.id} item={item} />
  ));

  function makeOrder() {
    setPlaceOrder("Ordering...");
    setTimeout(() => {
      console.log("Ordered!");
      setPlaceOrder("Place Order");
      emptyCart();
    }, 3000);
  }

  function orderButton() {
    if (cartItem.length > 0) {
      return <button onClick={() => makeOrder()}>{placeOrder}</button>;
    } else {
      return <p>You have no items in your cart.</p>;
    }
  }

  return (
    <main className="cart-page">
      <h1>Check out</h1>
      {cartItemElements}
      <p className="total-cost">
        Total:{" "}
        {(5.99 * cartItem.length).toLocaleString("en-US", {
          style: "currency",
          currency: "USD"
        })}
        {/* The toLocaleString() method returns a string with
                 a language-sensitive representation of this number.
                https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString */}
      </p>
      <div className="order-button">{orderButton()}</div>
    </main>
  );
}

export default Cart;

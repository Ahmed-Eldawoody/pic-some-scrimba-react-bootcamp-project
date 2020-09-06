import React, { useState, useEffect } from "react";

const Context = React.createContext();

function ContextProvider({ children }) {
  //initial state
  const [allPhotos, setAllPhotos] = useState([]);
  const [cartItem, setCartItem] = useState([]);

  //photos source
  const url =
    "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json";

  //Fetching photos
  useEffect(() => {
    fetch(url)
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Request failed!");
        },
        (networkError) => console.log(networkError.message)
      )
      .then((jsonResponse) => {
        setAllPhotos(jsonResponse);
      });
  }, []);

  //Add photo to Favorites
  function toggleFavorite(id) {
    const updatedArr = allPhotos.map((photo) => {
      if (photo.id === id) {
        return { ...photo, isFavorite: !photo.isFavorite };
      }
      return photo;
    });

    setAllPhotos(updatedArr);
  }

  //add image to the card array(we used the spread operator because we can't modify state directly)
  function addToCart(imageObject) {
    setCartItem([...cartItem, imageObject]);
  }

  //remove images from the card
  //filter make a new array of all the current cart array exept the one you removed
  function removeFromCart(id) {
    setCartItem(cartItem.filter((item) => item.id !== id));
  }

  //Empty the cart
  function emptyCart() {
    setCartItem([]);
  }

  return (
    <Context.Provider
      value={{
        allPhotos,
        cartItem,
        toggleFavorite,
        addToCart,
        removeFromCart,
        emptyCart
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };

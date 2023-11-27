import React, { useContext, useState } from "react";
import AppRouter from "../AppRouter";

// Create a Context for sharing state across components
const Context = React.createContext();

const ContextProvider = () => {
  // State for the length of the cart
  const [cartLength, setCartLength] = useState(0);

  // State for products selected for checkout
  const [productsToCheckout, setProductsToCheckout] = useState([]);

  // State for managing the local cart items
  const [localCart, setLocalCart] = useState([]);

  return (
    // Providing context values to be consumed by child components
    <Context.Provider
      value={{
        cartLength,
        setCartLength,
        productsToCheckout,
        setProductsToCheckout,
        localCart,
        setLocalCart,
      }}
    >
      <AppRouter />
    </Context.Provider>
  );
};

// Custom hook for consuming context easily in components
const useContextSelector = () => {
  return useContext(Context);
};

// Exporting ContextProvider and useContextSelector for use in other components
export { ContextProvider, useContextSelector };
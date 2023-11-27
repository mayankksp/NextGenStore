import { Button, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import CartItem from "../components/CartItem";
import emptyCart from "../assets/empty-cart.svg";
import { useSelector } from "react-redux";
import { useAction } from "../state/actions/index.action";
import EmptyContainer from "../components/EmptyContainer";
import { Box } from "@mui/system";
import { useContextSelector } from "../context/context";
import { useNavigate } from "react-router-dom";
import { store } from "../state/store.state";
import axios from "axios";
import GridView from "../components/Gridview";
import Footer from "../components/Footer";

function Cart() {
  // Action for fetching cart items
  const { getCartItems } = useAction();
  
  // Accessing authentication state and cart items from Redux store
  const { auth } = store.getState();
  const products = useSelector((state) => state.cart?.cartItems);

  // State for recommended and unique recommended products
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [uniqueRecommendedProducts, setUniqueRecommendedProducts] = useState([]);

  // Context selectors and navigation
  const { setProductsToCheckout, localCart, setLocalCart } = useContextSelector();
  const navigate = useNavigate();

  // Function to filter out unique recommended products
  const getunique = () => {
    const names = recommendedProducts.map((o) => o.name);
    let unique = recommendedProducts.filter(({ name }, index) => {
      return !names.includes(name, index + 1);
    });

    setUniqueRecommendedProducts(() => unique);
  };

  // Function to get product recommendations
  const getRecommendation = async () => {
    if (auth?.user?._id === undefined) return;
    try {
      const res = await axios.post(`http://127.0.0.1:6050/recommend/${auth?.user?._id}`);
      setRecommendedProducts(() => res?.data);
      getunique();
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  // Effect for initializing component state
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (auth?.user) getCartItems();
  }, []);

  // Effect for setting local cart and getting recommendations
  React.useEffect(() => {
    setLocalCart(() => products);
    getRecommendation();
  }, [products, auth]);

  return (
    <>
      <Container sx={{ paddingTop: "10vh", width: "42vw" }}>
        <Stack sx={{ width: "90%", margin: "0 auto" }}>
          {/* Rendering Cart Items or Empty Container based on cart content */}
          {Object.keys(products).length > 0 ? (
            Object.values(products)?.map((product, index) => (
              <CartItem product={product} key={index} />
            ))
          ) : (
            <EmptyContainer
              img={emptyCart}
              typographies={{
                message: "Your cart is empty.",
                buttonText: "Go shopping.",
              }}
            />
          )}
        </Stack>
      </Container>

      {/* Displaying Recommended Products */}
      {auth.authenticated && uniqueRecommendedProducts.length > 0 ? (
        <Container
          sx={{
            mt: "10vh",
            width: "80%",
            textAlign: "center",
            color: "#071c29",
            fontSize: "1.2rem",
          }}
        >
          Recommended for you
        </Container>
      ) : null}
      <GridView products={uniqueRecommendedProducts} />
      <Footer/>

      {/* Checkout Button */}
      {Object.keys(products).length > 1 ? (
        <Box
          sx={{
            height: "10vh",
            width: "100vw",
            position: "fixed",
            bottom: "0",
            boxShadow: "0 0 10px #3333",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            background: "#ffffff",
          }}
        >
          <Button
            className="cartitem__button"
            variant="contained"
            sx={{
              textTransform: "none",
              background: "#071c29",
              height: "fit-content",
              padding: "0.7rem 2rem",
              position: "relative",
              mr: "30px",
            }}
            onClick={() => {
              // Preparing products for checkout
              const prods = [];
              Object.values(localCart).forEach((p) => prods.push(p));
              setProductsToCheckout(() => prods);
              navigate("/payments");
            }}
          >
            Place All
          </Button>
        </Box>
      ) : null}
    </>
  );
}

export default Cart;
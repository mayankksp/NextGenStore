import React from "react";
import { Alert, Box, IconButton, Snackbar, Stack } from "@mui/material";
import { AddShoppingCartTwoTone } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import { useAction } from "../state/actions/index.action";
import { store } from "../state/store.state";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useContextSelector } from "../context/context";

// Component for displaying a single product card
function Card({ product }) {
  // State and hooks initialization
  const { auth } = store.getState();
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const { image, name, desc, price } = product;
  const { addToCart, getCartItems } = useAction();
  const cart = useSelector((state) => state.cart?.cartItems);
  const { cartLength, setCartLength } = useContextSelector();

  // Handler for adding product to cart
  const addToCartHandler = () => {
    if (!auth.authenticated) {
      navigate("/signin");
    } else {
      if (cart.hasOwnProperty(product._id)) {
        setMessage("Already in cart");
        setSeverity("error");
        setOpen(true);

        setTimeout(() => {
          setOpen(false);
        }, 1000);

        return;
      }

      setMessage("Added to cart");
      setSeverity("success");
      setOpen(true);

      addToCart(product);
      setCartLength(cartLength + 1);

      setTimeout(() => {
        setOpen(false);
      }, 1000);
    }
  };

  // Effect for fetching cart items if authenticated
  React.useEffect(() => {
    if (auth.authenticated) {
      getCartItems();
      // Uncomment below to set cart length based on items in cart
      // setCartLength(Object.keys(cart).length);
    }

    // eslint-disable-next-line
  }, []);

  // JSX for rendering the product card
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={2000}
      >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Grid item sm={2} md={4}>
        <Box
          sx={{
            minHeight: "350px",
            placeContent: "center",
            boxShadow: "0 0 10px #eee",
            borderRadius: "5px",
            margin: "10px 18px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Stack
            direction="column"
            sx={{
              height: "100%",
            }}
            className="gridview__card"
          >
            <span
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <img
                style={{
                  width: "60%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                src={image}
                alt="product"
              />
            </span>

            <span
              style={{
                flex: 0.4,
                textAlign: "center",
                color: "#071c29",
                fontWeight: "bold",
                fontSize: "0.9rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </span>
            <span
              style={{
                flex: 0.4,
                textAlign: "center",
                color: "gray",
                fontSize: "0.9rem",
                marginBottom: "10px",
              }}
            >
              {desc}
            </span>
            <span
              style={{
                width: "100%",
                background: "#071c29e6",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                position: "absolute",
                bottom: "0",
                left: "0",
                right: "0",
                height: "18%",
              }}
            >
              <span
                style={{
                  flex: 0.8,
                  color: "#ffffff",
                  fontSize: "1.3rem",
                }}
              >
                ₹ {price}
              </span>
              <Tooltip title="Add to cart" placement="bottom">
                <IconButton
                  style={{ color: "#ffffff", textAlign: "right" }}
                  onClick={addToCartHandler}
                  className="card__addToCartButton"
                >
                  <AddShoppingCartTwoTone />
                </IconButton>
              </Tooltip>
            </span>
          </Stack>
        </Box>
      </Grid>
    </>
  );
}

export default Card;
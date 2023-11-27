import React, { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Container, Snackbar, Stack } from "@mui/material";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import StripeCheckout from "react-stripe-checkout";
import FakeCard from "../components/FakeCard";
import { useAction } from "../state/actions/index.action";
import { useContextSelector } from "../context/context";

// Main Payments component
function Payments() {
  // State hooks for various functionalities
  const [value, setValue] = useState("CARD");
  const [isCOD, setIsCOD] = useState(true);
  const navigate = useNavigate();
  const [message, setmessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");

  // Custom hooks for actions and context
  const { addToOrders, removeCartItem } = useAction();
  const { productsToCheckout, setProductsToCheckout } = useContextSelector();

  // Calculating the total sum of products
  var sum = 0;
  if (productsToCheckout.length > 0) {
    productsToCheckout.forEach(({ qty, price }) => {
      sum += qty * price;
    });
  }

  // Form for selecting payment method
  function RadioForm() {
    // Styling for the form control label
    const StyledFormControlLabel = styled((props) => (
      <FormControlLabel {...props} />
    ))(({ theme, checked }) => ({
      ".MuiFormControlLabel-label": checked && {
        color: theme.palette.primary.main,
      },
    }));

    // Custom form control label component
    function MyFormControlLabel(props) {
      const radioGroup = useRadioGroup();
      let checked = false;
      if (radioGroup) {
        checked = radioGroup.value === props.value;
      }
      return <StyledFormControlLabel checked={checked} {...props} />;
    }

    MyFormControlLabel.propTypes = {
      value: PropTypes.any, // Value of the component
    };

    // Radio group component
    function UseRadioGroup() {
      return (
        <RadioGroup
          name="use-radio-group"
          defaultValue="CARD"
          onChange={(e) => setValue(() => e.target.value)}
        >
          <hr />
          <MyFormControlLabel
            value="CARD"
            label="Card"
            className="payments__formlabel"
            control={<Radio />}
          />
          <MyFormControlLabel
            value="COD"
            className="payments__formlabel"
            label="Cash On Delivery"
            control={<Radio />}
          />
        </RadioGroup>
      );
    }

    return UseRadioGroup();
  }

  // Stripe payment class
  class Stripe {
    static CHCEKOUT_KEY = `${process.env.REACT_APP_STRIPE_API_KEY}`;

    // Handling token after Stripe checkout
    static handleToken = (token) => {
      if (token) {
        console.log("Stripe Token Received: ", token); // Improved log message
        addToOrders(productsToCheckout);

        // Removing each product from the cart after adding to orders
        productsToCheckout?.forEach((product) => {
          removeCartItem(product._id);
        });

        // Redirecting to orders page after checkout
        setTimeout(() => {
          setProductsToCheckout(() => []);
          navigate("/orders");
        }, 1000);
      }
    };

    // Stripe checkout component
    static Component = (price) => {
      return (
        <StripeCheckout
          stripeKey={this.CHCEKOUT_KEY}
          name={"NextGenStore"}
          amount={+price * 100} // converting price to cents
          currency="INR"
          billingAddress // automatically fills billing address
          shippingAddress // automatically fills shipping address
          token={this.handleToken}
        />
      );
    };
  }

  // Main render method
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

      <Container sx={{ paddingTop: "10vh", minHeight: "100vh", width: "40vw" }}>
        {isCOD ? (
          // Displaying payment options
          <Stack
            sx={{
              background: "#ffffff",
              boxShadow: "0 0 10px #3333",
              padding: "0.9rem 2rem",
              borderRadius: "10px",
              minHeight: "180px",
            }}
            spacing={4}
          >
            <RadioForm />

            <Button
              className="cartitem__button"
              variant="contained"
              sx={{
                textTransform: "none",
                background: "#071c29",
              }}
              onClick={() => {
                // Handling payment process
                if (value === "COD") {
                  setmessage(() => "Order placed successfully");
                  setSeverity(() => "success");
                  setOpen(() => true);

                  addToOrders(productsToCheckout);

                  productsToCheckout?.forEach((product) => {
                    removeCartItem(product._id);
                  });

                  setTimeout(() => {
                    setOpen(() => false);
                    setProductsToCheckout(() => []);
                    navigate("/orders");
                  }, 2000);
                } else {
                  setIsCOD(() => false);
                }
              }}
            >
              Proceed
            </Button>
          </Stack>
        ) : (
          // Displaying Stripe component for card payments
          <Stack
            sx={{
              minWidth: "10vw",
              pt: "6rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {Stripe.Component(sum)}
            <FakeCard />
          </Stack>
        )}
      </Container>
    </>
  );
}

export default Payments;
import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// This component displays a container with an image, a message, and a button.
// It's typically used when a list or collection is empty (e.g., a shopping cart).
function EmptyContainer({ img, typographies: { message, buttonText } }) {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "fit-content",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "gray",
        overflow: "hidden",
        marginBottom: "30px",
        fontSize: "1.5rem",
      }}
    >
      {/* Image displayed at the top of the container */}
      <img src={img} alt={`${img}`} width="300" height="300" />

      {/* Message displayed below the image */}
      <Typography>{message}</Typography>

      {/* Button at the bottom of the container, typically used for navigation */}
      <Button
        variant="contained"
        className="cart__button"
        sx={{
          background: "#071c29e6",
          mt: "30px",
          textTransform: "none",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "#ffffff" }}>
          {buttonText}
        </Link>
      </Button>
    </Stack>
  );
}

export default EmptyContainer;
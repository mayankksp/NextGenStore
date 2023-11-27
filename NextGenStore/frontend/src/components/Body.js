import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Item component: A styled Box component for display
function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        p: 1,
        borderRadius: 1,
        textAlign: "center",
        fontSize: "1rem",
        fontWeight: "700",
        ...sx, // Allows for custom styling
      }}
      {...other}
    />
  );
}

// PropTypes for Item component for validation
Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

// Body component: Main component rendering the page content
function Body() {
  const auth = useSelector((state) => state.auth); // Redux state selector

  return (
    <div className="body">
      <Box
        sx={{
          display: "flex",
          height: "40vh",
          background: "url('https://t4.ftcdn.net/jpg/04/14/22/55/360_F_414225555_k4FE9n2fjaBen0QlOW1kSjaQBWfjfCjF.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50%",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.4)",
            marginTop: "35px"
          }}
          className="body__banner"
        >
          <div style={{ width: "60%" }}>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "normal",
                textAlign: "center",
                color: "#fff",
              }}
            >
              Gadgets that Define Tomorrow.
            </h1>
            <Divider sx={{ borderColor: "#fff" }} />

            {/* Conditionally rendering the Sign In/Sign Up buttons based on authentication status */}
            {!auth.authenticated ? (
              <Box
                sx={{
                  width: "20%",
                  margin: "10px auto 0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                className="body__bannerbox"
              >
                <Link to="/signin" style={{ textDecoration: "none" }}>
                  <Button
                    style={{
                      border: "1px solid #fff",
                      color: "#fff",
                      minWidth: "90px",
                      marginTop: "15px",
                    }}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Button 
                    variant="contained"
                    style={{
                      marginLeft: "20px",
                      marginTop: "15px",
                      minHeight: "41px",
                      minWidth: "100px",
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </Box>
            ) : null}
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default Body;
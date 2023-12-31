import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import {
  Home,
  LoginRounded,
  LogoutRounded,
  ShoppingBag,
} from "@mui/icons-material";
import { useAction } from "../state/actions/index.action";
import { Link, useNavigate } from "react-router-dom";
import { useContextSelector } from "../context/context";
import { Tooltip } from "@mui/material";
import FloatingProfile from "./FloatingProfile";

export default function NavBar({ toggleDrawer, drawerState }) {
  const auth = useSelector((state) => state?.auth);
  const { getCartItems, signout } = useAction();
  const navigate = useNavigate();
  const { cartLength, setCartLength } = useContextSelector();
  const cart = useSelector((state) => state.cart?.cartItems);

  React.useEffect(() => {
    if (auth.authenticated) {
      getCartItems();
    }
  }, []);

  React.useEffect(() => {
    setCartLength(() => Object.keys(cart).length);
  }, [cart, auth]);

  return (
    <Box sx={{ flexGrow: 1 }} className="navbar">
      <AppBar
        position="fixed"
        style={{ backgroundColor: "#071c29", padding: "0 6rem" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer("left", !drawerState.left)}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ textDecoration: "none", color: "#ffffff" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              className="navbar__brand"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              NextGenStore
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Tooltip title="Home" placement="bottom">
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                style={{ margin: "0 10px" }}
                onClick={() => {
                  navigate("/");
                }}
              >
                <Home />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cart" placement="bottom">
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                style={{ margin: "0 10px" }}
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <Badge color="info" badgeContent={cartLength}>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Bag" placement="bottom">
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                style={{ margin: "0 10px" }}
                onClick={() => {
                  navigate("/orders");
                }}
              >
                <ShoppingBag />
              </IconButton>
            </Tooltip>

            {auth.authenticated ? (
              <IconButton
                size="large"
                edge="end"
                className="navbar__profileiconbutton"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                style={{ margin: "0 10px" }}
              >
                <AccountCircle />
                <FloatingProfile />
              </IconButton>
            ) : (
              <Tooltip title="Profile" placement="bottom">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                  style={{ margin: "0 10px" }}
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            )}
            {auth.authenticated ? (
              <Tooltip title="Logout" placement="bottom">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={signout}
                  style={{ margin: "0 10px" }}
                >
                  <LogoutRounded />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Login" placement="bottom">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => navigate("/signin")}
                  style={{ margin: "0 10px" }}
                >
                  <LoginRounded />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
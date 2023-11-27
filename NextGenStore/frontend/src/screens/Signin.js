import * as React from "react";

// Material-UI components
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, Snackbar } from "@mui/material";

// Icons
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// Custom components and hooks
import { theme } from "../Theme/ThemeProvider";
import { ThemeProvider } from "@mui/material/styles";
import Footer from "../components/Footer";
import { useAction } from "../state/actions/index.action";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const { signin } = useAction();
  const auth = useSelector((state) => state.auth);

  // State variables for managing UI messages and status
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");

  // Ref to check if component is mounted
  let isMounted = React.useRef(true);

  // Effect for authentication check
  React.useEffect(() => {
    const effect = () => {
      isMounted.current = false;
      if (auth.authenticated) {
        // Navigate to home if authenticated
        navigate("/");
      }
    };
    return effect();
  }, [auth.authenticated, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };

    // Validation for email and password
    if (!user.email || !user.password) {
      setMessage("Invalid input. Please enter both email and password.");
      setOpen(true);
      setSeverity("error");
      setTimeout(() => {
        setOpen(false);
      }, 2000);
      return;
    }

    // Attempt to sign in
    signin(user).then(() => {
      if (!auth.token) {
        setMessage(auth.message || "Authentication failed.");
        setOpen(true);
        setSeverity("error");
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={1000}
      >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>

      <Container component="main" maxWidth="xs" style={{ marginBottom: "8vh" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: "15vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ color: "#071c29" }}>
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              style={{ background: "#071c29" }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
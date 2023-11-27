import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  ThemeProvider,
  Alert,
  Snackbar
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { theme } from "../Theme/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAction } from "../state/actions/index.action";
import Footer from "../components/Footer";

export default function SignUp() {
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { signup } = useAction();

  // Redirects to home if authenticated
  React.useEffect(() => {
    if (auth.authenticated) navigate("/");
  }, [auth.authenticated, navigate]);

  // Handles the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");

    // Validation for empty fields
    if (!firstName || !lastName || !email || !password) {
      setOpen(true);
      setMessage("Required fields are blank.");
      setTimeout(() => {
        setOpen(false);
      }, 2000);
      return;
    }

    const user = { firstName, lastName, email, password };
    signup(user)
      .then(() => {
        if (auth.token === null) {
          setSeverity("error");
          setMessage(auth.message);
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
          }, 2000);
        }
      })
      .catch((err) => {
        // Log error for debugging
        console.error("Signup error:", err);
      });
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={1000}
      >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>

      <ThemeProvider theme={theme}>
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
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                {/* Form fields for user input */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              {/* Link to Sign In page */}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <Footer />
    </>
  );
}
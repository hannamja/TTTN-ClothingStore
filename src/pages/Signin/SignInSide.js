import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login } from "../../redux/userReducer";
import { addKH } from "../../redux/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { useFormik } from "formik";
import {
  validateEmail,
  validateNotNull,
  validatePassword,
} from "../../utilities/validation";
import { useEffect } from "react";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000">
        Hukistore
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignInSide() {
  const [params] = useSearchParams();
  const next = params.get("next")

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  const validate = (values) => {
    const returnErrors = {};
    validateNotNull(returnErrors, values.email, "email");
    if (!returnErrors.email) {
      validateEmail(returnErrors, values.email);
    }
    validateNotNull(returnErrors, values.password, "password");
    if (!returnErrors.password) {
      validatePassword(returnErrors, values.password);
    }
    return returnErrors;
  };

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      dispatch(
        login({
          email: values.email,
          password: values.password,
        })
      )
        .unwrap((data) => data.json())
        .then((data) => {

        })
        .catch(() => setOpen1(true));
    },
  });

  const [open1, setOpen1] = React.useState(false);

  const handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen1(false);
  };
  useEffect(() => {
    if (Object.keys(user).length) {
      if (user.info.khachhang != null)
        dispatch(addKH({ idKH: user.info.khachhang.makh }))
      if (next) {
        navigate(next);
      } else {
        navigate(-1);
      }
    }
  }, [user, navigate, next])
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form
              onSubmit={loginFormik.handleSubmit}
              style={{ marginTop: "8px" }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                {...loginFormik.getFieldProps("email")}
                error={
                  loginFormik.touched.email && Boolean(loginFormik.errors.email)
                }
                helperText={
                  loginFormik.touched.email && loginFormik.errors.email
                }
              />
              <TextField
                margin="normal"
                fullWidth
                id="password"
                name="password"
                label="Password"
                {...loginFormik.getFieldProps("password")}
                error={
                  loginFormik.touched.password &&
                  Boolean(loginFormik.errors.password)
                }
                helperText={
                  loginFormik.touched.password && loginFormik.errors.password
                }
                type="password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </form>
          </Box>
        </Grid>
      </Grid>

      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="warning" sx={{ width: "100%" }}>
          Sai thông tin!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

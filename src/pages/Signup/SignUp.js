import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userReducer";
import {
  validateCmnd,
  validateEmail,
  validateNotNull,
  validatePassword,
  validatePhone,
} from "../../utilities/validation";

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
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const initialErrors = {
  ten: "",
  gt: "",
  ngaysinh: "",
  sdt: "",
  dc: "",
  email: "",
  cmnd: "",
  mk: "",
  mk1: "",
};

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const [inputErrors, setInputErrors] = useState(initialErrors);
  const [errorMessage, setErrorMessage] = useState("");

  const [ten, setTen] = useState("");
  const [dc, setDc] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSdt] = useState("");
  const [mk, setMK] = useState("");
  const [mk1, setMK1] = useState("");
  const [ngaysinh, setNgaysinh] = useState("");
  const [cmnd, setCmnd] = useState("");

  const [gt, setGT] = useState("nam");
  const dispatch = useDispatch();

  const validate = () => {
    const errors = {};
    validateNotNull(errors, ten, "ten");
    validateNotNull(errors, email, "email");
    if (!errors.email) {
      validateEmail(errors, email);
    }
    validateNotNull(errors, sdt, "sdt");
    if (!errors.sdt) {
      validatePhone(errors, sdt);
    }
    validateNotNull(errors, mk, "mk");
    if (!errors.mk) {
      validatePassword(errors, mk, "mk");
    }
    validateNotNull(errors, mk1, "mk1");
    if (!errors.mk1) {
      validatePassword(errors, mk1, "mk1");
    } else if (mk1 !== mk) {
      errors.mk1 = "Mật khẩu xác nhận không khớp!";
    }
    validateNotNull(errors, ngaysinh, "ngaysinh");
    if (cmnd) {
      validateCmnd(errors, cmnd, "cmnd");
    }
    return errors;
  };

  const removeError = (fieldName) => {
    setInputErrors((e) => ({
      ...e,
      [fieldName]: "",
    }));
  };

  const handleCloseErrorMessage = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMessage("");
  };

  const handleAdd = () => {
    const returnErrors = validate();
    if (Object.keys(returnErrors).length > 0) {
      setInputErrors(returnErrors);
      setErrorMessage("Thông tin không hợp lệ!");
    } else {
      setInputErrors(initialErrors);
      const kh = {
        hotenkh: ten,
        gioitinh: gt,
        ngaysinh: ngaysinh,
        sdt: sdt,
        diachi: dc,
        email: email,
        cmnd: cmnd,
      };

      fetch("http://localhost:8081/api/khachhang-signup/" + mk, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(kh),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 404) {
            console.log(data);
            setOpen404(true);
            return;
          }
          setOpen(true);
          dispatch(
            login({
              email: email,
              password: mk,
            })
          );
        });
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const [open1, setOpen1] = React.useState(false);

  const handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen1(false);
  };

  const [open404, setOpen404] = React.useState(false);

  const handleClose404 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen404(false);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  error={!!inputErrors.ten}
                  helperText={inputErrors.ten}
                  id="ten"
                  name="ten"
                  label="Họ và tên"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={ten}
                  onChange={(e) => {
                    setTen(e.target.value);
                    removeError(e.target.name);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={!!inputErrors.email}
                  helperText={inputErrors.email}
                  id="city"
                  name="email"
                  label="Email"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    removeError(e.target.name);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={!!inputErrors.mk}
                  helperText={inputErrors.mk}
                  id="city"
                  name="mk"
                  label="Mật khẩu"
                  type="password"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  value={mk}
                  onChange={(e) => {
                    setMK(e.target.value);
                    removeError(e.target.name);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={!!inputErrors.mk1}
                  helperText={inputErrors.mk1}
                  id="city"
                  name="mk1"
                  label="Nhập lại mật khẩu"
                  type="password"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  value={mk1}
                  onChange={(e) => {
                    setMK1(e.target.value);
                    removeError(e.target.name);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: 300 }}>
                  <InputLabel id="add-clothes-status-select-label">
                    Giới tính
                  </InputLabel>
                  <Select
                    labelId="add-clothes-status-select-label"
                    id="add-clothes-status-select"
                    value={gt}
                    name="gt"
                    label="Giới tính"
                    onChange={(event) => {
                      setGT(event.target.value);
                    }}
                  >
                    {["nam", "nu"].map((e, i) => {
                      return (
                        <MenuItem key={i} value={e}>
                          {e}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <p>Ngày sinh *</p>
                <TextField
                  required
                  error={!!inputErrors.ngaysinh}
                  helperText={inputErrors.ngaysinh}
                  name="ngaysinh"
                  // label="Ngày sinh"
                  fullWidth
                  variant="standard"
                  type="date"
                  value={ngaysinh}
                  onChange={(e) => {
                    setNgaysinh(e.target.value);
                    removeError(e.target.name);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!inputErrors.dc}
                  helperText={inputErrors.dc}
                  id="address2"
                  name="address2"
                  label="Địa chỉ"
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                  value={dc}
                  onChange={(e) => setDc(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  error={!!inputErrors.sdt}
                  helperText={inputErrors.sdt}
                  id="city"
                  name="sdt"
                  label="SDT"
                  inputProps={{ maxLength: 11 }}
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  value={sdt}
                  onChange={(e) => {
                    setSdt(e.target.value);
                    removeError(e.target.name);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!inputErrors.cmnd}
                  helperText={inputErrors.cmnd}
                  id="state"
                  name="cmnd"
                  label="CMND"
                  inputProps={{ maxLength: 12 }}
                  fullWidth
                  variant="standard"
                  value={cmnd}
                  onChange={(e) => {
                    setCmnd(e.target.value);
                    removeError(e.target.name);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleAdd}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="../signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Đăng kí thành công!
        </Alert>
      </Snackbar>
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="warning" sx={{ width: "100%" }}>
          Mật khẩu không khớp!
        </Alert>
      </Snackbar>
      <Snackbar open={open404} autoHideDuration={6000} onClose={handleClose404}>
        <Alert onClose={handleClose404} severity="error" sx={{ width: "100%" }}>
          Email tồn tại!
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseErrorMessage}
      >
        <Alert
          onClose={handleCloseErrorMessage}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

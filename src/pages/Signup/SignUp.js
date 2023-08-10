import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Alert, Autocomplete, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/userReducer';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const [ten, setTen] = useState('')
  const [dc, setDc] = useState('')
  const [email, setEmaol] = useState('')
  const [sdt, setSdt] = useState('')
  const [mk, setMK] = useState("")
  const [mk1, setMK1] = useState("")
  const [ngaysinh, setNgaysinh] = useState('')
  const [cmnd, setCmnd] = useState("")

  const [gt, setGT] = useState("nam")
  const [gtInput, setGtInput] = useState("")
  const dispatch = useDispatch()
  const handleAdd = () => {
    if (mk !== mk1) {
      setOpen1(1)
      return
    }
    const kh = {
      "hotenkh": ten,
      "gioitinh": gt,
      "ngaysinh": ngaysinh,
      "sdt": sdt,
      "diachi": dc,
      "email": email,
      "cmnd": cmnd
    }

    fetch('http://localhost:8081/api/khachhang-signup/' + mk, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(kh)
    }).then(res => res.json()).then(data => {
      if (data.status === 404) {
        console.log(data)
        setOpen404(true)
        return
      }
      setOpen(true)
      dispatch(login({
        email: email,
        password: mk,
      }))
    })
  }

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const [open1, setOpen1] = React.useState(false);

  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
  };

  const [open404, setOpen404] = React.useState(false);

  const handleClose404 = (event, reason) => {
    if (reason === 'clickaway') {
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="Họ và tên"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={ten}
                  onChange={(e) => setTen(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="Email"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  value={email}
                  onChange={e => setEmaol(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="Mật khẩu"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  value={mk}
                  onChange={e => setMK(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="Nhập lại mật khẩu"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  value={mk1}
                  onChange={e => setMK1(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  value={gt}
                  onChange={(event, newValue) => {
                    setGT(newValue);
                  }}
                  inputValue={gtInput}
                  onInputChange={(event, newInputValue) => {
                    setGtInput(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={['nam', 'nu']}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Giới tính" />}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address1"
                  name="address1"
                  label="Ngày sinh"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                  type='date'
                  value={ngaysinh}
                  onChange={e => setNgaysinh(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address2"
                  name="address2"
                  label="Địa chỉ"
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                  value={dc}
                  onChange={e => setDc(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="SDT"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  value={sdt}
                  onChange={e => setSdt(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="state"
                  name="state"
                  label="CMND"
                  fullWidth
                  variant="standard"
                  value={cmnd}
                  onChange={e => setCmnd(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
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
                <Link href='../signin' variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Đăng kí thành công!
        </Alert>
      </Snackbar>
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="warning" sx={{ width: '100%' }}>
          Mật khẩu không khớp!
        </Alert>
      </Snackbar>
      <Snackbar open={open404} autoHideDuration={6000} onClose={handleClose404}>
        <Alert onClose={handleClose404} severity="error" sx={{ width: '100%' }}>
          Email tồn tại!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

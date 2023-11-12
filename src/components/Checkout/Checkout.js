import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, resetCart } from "../../redux/cartReducer";
import { Navigate } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step, setIsPaid, setAddr, addr) {
  switch (step) {
    case 0:
      return <AddressForm setAddr={setAddr} addr={addr} />;
    case 1:
      return <PaymentForm setIsPaid={setIsPaid} />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isPaid, setIsPaid] = React.useState(false)
  const user = useSelector((state) => state.user)
  const cart = useSelector((state) => state.cart.carts);
  const userCart = Object.keys(user).length == 0 || user.info.khachhang == null ? cart.find(i => i.id == '') : cart.find(i => i.id == user.info.khachhang.makh)
  // const userCart = Object.keys(user) == 0 || user.info.khachhang == null ? cart.find(i => i.id == '') : cart.find(i => i.id == user.info.khachhang.makh)
  const [addr, setAddr] = React.useState(user.info.khachhang.diachi)
  const dispatch = useDispatch()

  const handleNext = () => {
    if (activeStep == 0) {
      if (addr == '') {
        alert("Vui lòng nhập địa chỉ!")
        return
      }
    }
    if (activeStep === steps.length - 1) {
      handleCheckout()
    }
    else setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleCheckout = async () => {
    const khachhang = {
      "makh": user.info.khachhang.makh,
      "hotenkh": user.info.khachhang.hotenkh,
      "gioitinh": null,
      "ngaysinh": null,
      "sdt": null,
      "email": user.info.khachhang.email,
      "diachi": null,
      "cmnd": null
    }

    const defaultTT = {
      "hoadonDTO": {
        "khachhang": null,
        "nhanvien": null,
        "ngaytao": null,
        "tongtien": null,
        "chitietTrangThaiDTO": null,
        "chitietHoadonDTO": null
      },
      "trangthai": {
        "matthd": isPaid ? 2 : 1,
      },
      "ngaytao": new Date().toISOString().slice(0, 10)
    }

    const productsList = []
    userCart.products.forEach(element => {
      let ele = { "hoadonDTO": element.hoadonDTO, "chitietMathangDTO": element.chitietMathangDTO, "soluong": element.quantity, "gia": element.quantity * element.price }
      productsList.push(ele)
    });
    const cart = {
      "khachhang": khachhang,
      "nhanvien": null,
      "shipper": null,
      "diachi": addr,
      "ngaytao": new Date().toISOString().slice(0, 10),
      "tongtien": userCart.products.reduce((total, cur) => total + cur.price * cur.quantity, 0),
      "chitietTrangThaiDTO": defaultTT,
      "chitietHoadonDTO": productsList
    }
    fetch('http://localhost:8081/api/hoadon', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      body: JSON.stringify(cart)
    })
      .then(res => res.json())
      .then(data => {
        if (data.mahd == null) {
          alert("Số lượng tồn không đủ")
          return
        }
        dispatch(resetCart({ idU: Object.keys(user) == 0 ? '' : user.info.khachhang.makh }))
        setActiveStep(activeStep + 1);
      })
  }


  return (
    
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: 'relative',
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Company name
            </Typography>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, setIsPaid, setAddr, addr)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
          <Copyright />
        </Container>
      </ThemeProvider>
  );
}

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function AddressForm({ setAddr, addr }) {
  const user = useSelector((state) => state.user)
  const cart = useSelector((state) => state.cart.carts);
  const userCart = Object.keys(user).length == 0 || user.info.khachhang == null ? cart.find(i => i.id == '') : cart.find(i => i.id == user.info.khachhang.makh)
  return (
    Object.keys(user).length == 0 || userCart.products.length == 0 ? <Navigate to={'/'} /> :
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
            />
          </Grid>

        </Grid>
      </React.Fragment>
  );
}

import React from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Input } from '@mui/material';
import './User.scss'
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
const User = ({ type }) => {
    const { id } = useParams()
    const { data, loading, error } = useFetch(`/khachhang/${id}`);
    return (loading ? ('loading') :
        <React.Fragment>
            <Grid container spacing={3} style={{ margin: '50px', alignItems: 'center' }}>
                <Grid xs={12} sm={12}>
                    <img
                        className="catImg"
                        src="https://images.pexels.com/photos/7679456/pexels-photo-7679456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt=""
                    />
                </Grid>
                <Grid xs={12} sm={12}>
                    <h1>Thông tin user</h1>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="Họ & tên khách"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={data.hotenkh}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="DoB"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        value={data.ngaysinh}
                        type='date'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="CMND"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        value={data.cmnd}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="Email"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        value={data.email}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="Số điện thoại"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        value={data.sdt}
                    />
                </Grid>
                {
                    type === 'mod' ? <Grid item xs={12}>
                        <Button variant="contained">
                            Save
                        </Button>
                    </Grid> : <></>
                }
            </Grid>
        </React.Fragment>
    )
}

export default User
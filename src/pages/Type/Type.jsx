import React from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Input } from '@mui/material';
import './Type.scss'
const Type = ({ type }) => {
    return (
        <React.Fragment>
            <Grid container spacing={3} style={{ margin: '50px', alignItems: 'center' }}>
                <Grid xs={12} sm={12}>
                    <img
                        className="catImg"
                        src="https://images.pexels.com/photos/7679740/pexels-photo-7679740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt=""
                    />
                </Grid>
                <Grid xs={12} sm={12}>
                    <h1>Thông tin loại</h1>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                    />
                </Grid>
                
                
                {
                    type === 'detail' ? <></> :

                        <Grid item xs={12}>
                            <Button variant="contained">
                                Save
                            </Button>
                        </Grid>
                }
            </Grid>
        </React.Fragment>
    )
}

export default Type
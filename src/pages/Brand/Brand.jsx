import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Alert, Button, Input, Snackbar } from '@mui/material';
import './Brand.scss'
import useFetchAdmin from '../../hooks/useFetchAdmin';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Brand = ({ type }) => {
    const { id } = useParams()
    const { data, loading, error } = useFetchAdmin(`${type === 'add' ? `` : `/nhanhieu/` + id}`);
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
    const handleAdd = () => {
        const nh = {
            "tennh": ten
        }

        fetch('http://localhost:8081/api/nhanhieu', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(nh)
        }).then(res => res.json()).then(()=>{
            setOpen(true)
        })
    }

    const handleMod = () => {
        const nh = {
            "manh": data.manh,
            "tennh": ten
        }

        fetch('http://localhost:8081/api/nhanhieu', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(nh)
        }).then(res => res.json()).then(()=>{
            setOpen1(true)
        })
    }

    const user = useSelector(state => state.user)
    const [ten, setTen] = useState('')
    useEffect(() => {
        if (data) setTen(data.tennh)
    }, [loading])
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
                    <h1>Thông tin thương hiệu</h1>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="Tên nhãn hiệu"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={ten}
                        onChange={(e)=>setTen(e.target.value)}
                    />
                </Grid>
                
                {
                    type === 'detail' ? <></> :

                        <Grid item xs={12}>
                            <Button variant="contained" onClick={type === 'add' ? handleAdd : handleMod}>
                                Save
                            </Button>
                        </Grid>
                }
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Thêm nhãn hiệu thành công!
                </Alert>
            </Snackbar>
            <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
                    Sửa nhãn hiệu thành công!
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}

export default Brand
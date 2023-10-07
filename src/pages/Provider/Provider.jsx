import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Alert, Button, Input, Snackbar } from '@mui/material';
import './Provider.scss'
import { useParams } from 'react-router-dom';
import useFetchAdmin from '../../hooks/useFetchAdmin';
import { useSelector } from 'react-redux';
const Provider = ({ type }) => {
    const { id } = useParams()
    const { data, loading, error } = useFetchAdmin(`${type === 'add' ? `` : `/nhacungcap/` + id}`);
    const user = useSelector(state => state.user)
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const [open1, setOpen1] = useState(false);
    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };
    const handleAdd = () => {
        if (ten == '' || email == '' || dc == '' || sdt == '') {
            alert('Vui lòng nhập đầy đủ thông tin')
            return
        }
        const ncc = {
            "tenncc": ten,
            "email": email,
            "diachi": dc,
            "sodt": sdt
        }

        fetch('http://localhost:8081/api/nhacungcap', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(ncc)
        }).then(res => res.json()).then(() => {
            setOpen(true)
        })
    }

    const handleMod = () => {
        if (ten == '' || email == '' || dc == '' || sdt == '') {
            alert('Vui lòng nhập đầy đủ thông tin')
            return
        }
        const role = {
            "mancc": data.mancc,
            "tenncc": ten,
            "email": email,
            "diachi": dc,
            "sodt": sdt
        }

        fetch('http://localhost:8081/api/nhacungcap', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(role)
        }).then(res => res.json()).then(() => {
            setOpen1(true)
        })
    }
    const [ten, setTen] = useState('')
    const [dc, setDC] = useState('')
    const [email, setEmail] = useState('')
    const [sdt, setSdt] = useState('')
    useEffect(() => {
        if (data) {
            setTen(data.tenncc)
            setDC(data.diachi)
            setEmail(data.email)
            setSdt(data.sodt)
        }
    }, [loading])
    return (
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
                    <h1>Thông tin nhà cung cấp</h1>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Tên nhà cung cấp"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        value={ten}
                        onChange={(e) => setTen(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="SĐT"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={sdt}
                        onChange={(e) => setSdt(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="EMAIL"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Địa chỉ"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        value={dc}
                        onChange={(e) => setDC(e.target.value)}
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
                    Thêm nhà cung cấp thành công!
                </Alert>
            </Snackbar>
            <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
                    Sửa nhà cung cấp công!
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}

export default Provider
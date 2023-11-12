import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Alert, Button, Input, Snackbar } from '@mui/material';
import './Provider.scss'
import { useParams } from 'react-router-dom';
import useFetchAdmin from '../../hooks/useFetchAdmin';
import { useSelector } from 'react-redux';
import AlertMessage from '../../components/AlertMessage';
import {
    validateEmail,
    validatePhone,
} from "../../utilities/validation";
import E404 from '../../components/404/E404';

const initialMessage = {
    content: "",
    type: ""
}
const Provider = ({ type }) => {
    const { id } = useParams()
    const { data, loading, error } = useFetchAdmin(`${type === 'add' ? `` : `/nhacungcap/` + id}`);
    const user = useSelector(state => state.user)
    const [message, setMessage] = useState(initialMessage);

    const handleAdd = () => {
        if (ten == '' || email == '' || dc == '' || sdt == '') {
            alert('Vui lòng nhập đầy đủ thông tin')
            return
        }

        const errors = {};
        validateEmail(errors, email);
        validatePhone(errors, sdt);
        if (Object.keys(errors).length > 0) {
            alert(errors?.sdt || errors?.email)
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
        }).then(res => res.json()).then((data) => {
            console.log(data)
            if (data.status != 201) {
                setMessage({ content: data.message, type: "error" })
                return
            }
            setMessage({ content: "Thêm nhà cung cấp thành công!", type: "success" })
            setTen('')
            setEmail('')
            setDC('')
            setSdt('')
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
        }).then(res => res.json()).then((data) => {
            if (data.status != 201) {
                setMessage({ content: data.message, type: "error" })
                return
            }
            setMessage({ content: "Sửa nhà cung cấp thành công!", type: "success" })
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
    return data?.status == 404 ?
        <E404 /> : (
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
                <AlertMessage message={message} setMessage={setMessage} />
            </React.Fragment>
        )
}

export default Provider
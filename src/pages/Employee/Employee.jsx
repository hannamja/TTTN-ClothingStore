import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Alert, Button, Input, Snackbar } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import './Empolyee.scss'
import { useParams } from 'react-router-dom';
import useFetchAdmin from '../../hooks/useFetchAdmin';
import { useSelector } from 'react-redux';
import { ClearOutlined } from '@mui/icons-material';
import { dateToString } from '../../utilities/helpers';
import E404 from '../../components/404/E404';
const Employee = ({ type }) => {
    const user = useSelector(state => state.user)
    const { id } = useParams()
    const { data, loading, error } = useFetchAdmin(`${type === 'add' ? `` : `/nhanvien/` + id}`);
    const q = useFetchAdmin(`/role`)
    const [ctqRows, setCtqRows] = useState([]);
    const [ten, setTen] = useState('')
    const [dc, setDc] = useState('')
    const [email, setEmaol] = useState('')
    const [sdt, setSdt] = useState('')
    const [tt, setTT] = useState("0")
    const [ttInput, setTTInput] = useState('')
    const [ngaysinh, setNgaysinh] = useState('2000-01-01')
    const [cmnd, setCmnd] = useState('')

    const [gt, setGT] = useState("nam")
    const [gtInput, setGtInput] = useState('')

    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [ngayend, setNgayend] = useState(new Date().toISOString().slice(0, 10))
    useEffect(() => {
        if (data) {
            if (type !== 'add' && data?.status != 404) {
                setTen(data.tennv)
                setDc(data.diachi)
                setEmaol(data.email)
                setSdt(data.sdt)
                setGT(data.gioitinh)
                setNgaysinh(dateToString(data.ngaysinh))
                setCmnd(data.cmnd)
                fetch('http://localhost:8081/api/ctquyen/' + data.email, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.token
                    },
                }).then(data => data.json()).then(data => {
                    setCtqRows(data)
                })
            }
        }
    }, [loading])

    const handleAdd = () => {
        if (ten == '' || gt == '' || ngaysinh == '' || sdt == '' || email == '' || cmnd == '') {
            alert('Vui lòng nhập đầy đủ thông tin')
            return
        }
        const nhanvien = {
            "tennv": ten,
            "gioitinh": gt,
            "ngaysinh": ngaysinh,
            "sdt": sdt,
            "diachi": dc,
            "email": email,
            "cmnd": cmnd,
            "trangthai": tt

        }

        fetch('http://localhost:8081/api/nhanvien', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(nhanvien)
        }).then(res => res.json()).then(data => {
            if (data.status == 404) {
                setOpen404(true)
                return
            }
            fetch('http://localhost:8081/api/ctquyen/' + email, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                },
                body: JSON.stringify(ctqRows)
            }).then(res => res.json()).then(data => {
                setOpen(true)
            })
        })


    }
    const handleMod = () => {
        if (ten == '' || gt == '' || ngaysinh == '' || sdt == '' || email == '' || cmnd == '') {
            alert('Vui lòng nhập đầy đủ thông tin')
            return
        }
        const nhanvien = {
            "manv": data.manv,
            "tennv": ten,
            "gioitinh": gt,
            "ngaysinh": ngaysinh,
            "sdt": sdt,
            "diachi": dc,
            "email": email,
            "cmnd": cmnd,
            "trangthai": tt

        }

        fetch('http://localhost:8081/api/nhanvien/mod', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(nhanvien)
        }).then(res => res.json()).then(data => {
            fetch('http://localhost:8081/api/ctquyen/' + email, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                },
                body: JSON.stringify(ctqRows)
            }).then(res => res.json()).then(data => {
                setOpen1(true)
            })
        })



    }

    const handleDelCtmh = (i) => {
        const filtered = ctqRows.filter(item => item.id.maquyen !== i.id.maquyen)
        setCtqRows(filtered)
    }
    const handleAddCtmh = (i) => {
        let filtered = ctqRows.filter(item => item.id.maquyen === i.id.maquyen)
        if (filtered.length > 0) {
            filtered[0].ngayend = i.ngayend
            setCtqRows([...ctqRows.filter(item => item.id.maquyen !== i.id.maquyen), filtered[0]])
        }
        else {
            setCtqRows([...ctqRows, i])
        }
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
        data?.status == 404 ? <E404 /> :
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
                        <h1>Thông tin nhân viên</h1>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="Tên nhân viên"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            value={ten}
                            onChange={(e) => setTen(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
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
                    <Grid item xs={12} sm={4}>
                        <Autocomplete
                            value={tt}
                            onChange={(event, newValue) => {
                                setTT(newValue);
                            }}
                            inputValue={ttInput}
                            onInputChange={(event, newInputValue) => {
                                setTTInput(newInputValue);
                            }}
                            id="controllable-states-demo"
                            options={['0', '1']}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Trạng thái" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={12}>
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
                            disabled={type !== 'add'}
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
                        <h5>Danh sách quyền</h5>
                        <TableContainer component={Paper} sx={{ height: 400, overflow: 'scroll', marginTop: 5 }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: 'yellow' }}>
                                    <TableRow>
                                        <TableCell>Mã quyền</TableCell>
                                        <TableCell align="right">Tên quyền</TableCell>
                                        <TableCell align="right">Ngày kết thúc</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ctqRows?.map((row) => (
                                        <TableRow
                                            key={row.id.maquyen}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.id.maquyen}
                                            </TableCell>
                                            <TableCell align="right">{row.quyen.tenquyen}</TableCell>
                                            <TableCell align="right">{dateToString(row.ngayend)}</TableCell>
                                            <TableCell><ClearOutlined onClick={
                                                () => handleDelCtmh(row)
                                            } sx={{ color: 'red' }} /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid item xs={4}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);

                            }}

                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            options={q.data === null ? { lable: 'none' } : q.data}
                            getOptionLabel={option => q.data === null ? option.lable : option.tenquyen}
                            sx={{ width: 300 }}

                            renderInput={(params) => <TextField {...params} label="Quyền" />}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField value={ngayend} id="outlined-basic" label="Ngày kết thúc" variant="outlined" type='date' onChange={e => setNgayend(e.target.value)} />
                    </Grid>


                    <Grid item xs={12}>
                        <Button variant="outlined" onClick={() => { handleAddCtmh({ id: { ngaystart: new Date(), maquyen: value.maquyen, matk: null }, quyen: value, taikhoan: { matk: null }, ngayend: ngayend }); setValue(null); setNgayend(null); }}>
                            Thêm quyền
                        </Button>
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
                        Thêm nhân viên thành công!
                    </Alert>
                </Snackbar>
                <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                    <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
                        Sửa nhân viên thành công!
                    </Alert>
                </Snackbar>
                <Snackbar open={open404} autoHideDuration={6000} onClose={handleClose404}>
                    <Alert onClose={handleClose404} severity="error" sx={{ width: '100%' }}>
                        Email tồn tại!
                    </Alert>
                </Snackbar>
            </React.Fragment>
    )
}

export default Employee
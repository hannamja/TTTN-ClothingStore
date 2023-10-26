import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, Box, Button, Snackbar } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import './OrderVoucher.scss'
import { useSelector } from 'react-redux';
import useFetchAdmin from '../../hooks/useFetchAdmin';
import { useParams } from 'react-router-dom';
import { ClearOutlined } from '@mui/icons-material';


const OrderVoucher = ({ type }) => {
    const { id } = useParams()
    const { data, loading, error } = useFetchAdmin(`${type === 'add' ? `` : `/phieudat/` + id}`);

    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');

    const [sl, setSl] = React.useState(null);
    const [gia, setGia] = React.useState(null);
    const [rows, setRows] = useState([])
    const user = useSelector(state => state.user)

    const [ctmh, setCtmh] = useState([])
    const ncc = useFetchAdmin(`/nhacungcap`)

    const [nccValue, setNccValue] = useState(null)
    const [nccInputValue, setNccInputValue] = useState('')

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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:8081/api/ctmathang', {
                    headers: {
                        'Authorization': 'Bearer ' + user.token,
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                const data = await res.json()
                setCtmh(data)
            } catch (err) {

            }
        };
        fetchData();
    }, [])


    useEffect(() => {
        if (data) {
            setNccValue(data.nhacungcapDTO)
            setRows(data.ctPhieudatDTOs)
        }
    }, [loading])


    const handleAdd = () => {
        if (nccValue == null) {
            alert('Vui lòng cho biết nhà cung cấp')
            return
        }
        if (rows.length == 0) {
            alert('Vui lòng cho biết sản phẩm cần nhập')
            return
        }
        const defaultNV = {
            "manv": user.info.nhanvien.manv,
            "tennv": null,
            "gioitinh": null,
            "ngaysinh": null,
            "sdt": null,
            "diachi": null,
            "email": null,
            "cmnd": null,
            "trangthai": null
        }

        const phieudat = {
            "nhacungcapDTO": nccValue,
            "nhanvienDTO": defaultNV,
            "ngaydat": new Date(),
            "ctPhieudatDTOs": rows

        }

        fetch('http://localhost:8081/api/phieudat', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(phieudat)
        }).then(res => res.json()).then(data => {
            setOpen(true)
        }
        )
    }

    const handleMod = () => {
        if (nccValue == null) {
            alert('Vui lòng cho biết nhà cung cấp')
            return
        }
        if (rows.length == 0) {
            alert('Vui lòng cho biết sản phẩm cần nhập')
            return
        }
        const defaultNV = {
            "manv": user.info.nhanvien.manv,
            "tennv": null,
            "gioitinh": null,
            "ngaysinh": null,
            "sdt": null,
            "diachi": null,
            "email": null,
            "cmnd": null,
            "trangthai": null
        }

        const phieudat = {
            "mapd": data.mapd,
            "nhacungcapDTO": nccValue,
            "nhanvienDTO": defaultNV,
            "ngaydat": new Date(),
            "ctPhieudatDTOs": rows

        }

        fetch('http://localhost:8081/api/phieudat', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(phieudat)
        }).then(res => res.json()).then(data => {
            setOpen1(true)
        }
        )
    }


    const handleDelCtmh = (i) => {
        const filtered = rows.filter(item => item.ctMathangDTOs.id !== i.ctMathangDTOs.id)
        setRows(filtered)
    }
    const handleAddCtmh = (i) => {
        let filtered = rows.filter(item => item.ctMathangDTOs.id === i.ctMathangDTOs.id)

        if (filtered.length > 0) {
            filtered[0].soluong = parseInt(filtered[0].soluong) + parseInt(i.soluong)
            filtered[0].dongia = parseInt(filtered[0].dongia) + parseInt(i.dongia)
            setRows([...rows.filter(item => item.ctMathangDTOs.id !== i.ctMathangDTOs.id), filtered[0]])
        }
        else {
            setRows([...rows, i])
        }
    }
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
                    <h1>Thông tin phiếu đặt</h1>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <h5>Nhân viên lập</h5>
                    <TextField
                        id="firstName"
                        name="firstName"
                        label={user.info.nhanvien.tennv}
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        disabled
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <h5>Mã số nhân viên</h5>
                    <TextField
                        id="lastName"
                        name="lastName"
                        label={user.info.nhanvien.manv}
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        value={nccValue}
                        onChange={(event, newValue) => {
                            setNccValue(newValue);

                        }}

                        inputValue={nccInputValue}
                        onInputChange={(event, newInputValue) => {
                            setNccInputValue(newInputValue);
                        }}
                        options={ncc.data === null ? { lable: 'none' } : ncc.data}
                        getOptionLabel={option => ncc.data === null ? option.lable : option.tenncc + ' ' + `(mancc: ${option.mancc})`}
                        sx={{ width: 300 }}

                        renderInput={(params) => <TextField {...params} label="Nhà cung cấp" />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <h5>Danh sách sản phẩm được đặt</h5>
                    <TableContainer component={Paper} sx={{ height: 400, overflow: 'scroll', marginTop: 5 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: 'yellow' }}>
                                <TableRow>
                                    <TableCell>Mã sản phẩm</TableCell>
                                    <TableCell align="right">Tên sản phẩm</TableCell>
                                    <TableCell align="right">Màu sắc</TableCell>
                                    <TableCell align="right">Kích cỡ</TableCell>
                                    <TableCell align="right">Số lượng</TableCell>
                                    <TableCell align="right">Đơn giá</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.ctMathangDTOs.mathangDTO.mamh}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.ctMathangDTOs.mathangDTO.mamh}
                                        </TableCell>
                                        <TableCell align="right">{row.ctMathangDTOs.mathangDTO.tenmh}</TableCell>
                                        <TableCell align="right">{row.ctMathangDTOs.color}</TableCell>
                                        <TableCell align="right">{row.ctMathangDTOs.size}</TableCell>
                                        <TableCell align="right">{row.soluong}</TableCell>
                                        <TableCell align="right">{row.dongia}</TableCell>
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
                        options={ctmh === null ? { lable: 'none' } : ctmh}
                        getOptionLabel={option => ctmh === null ? option.lable : option.mathangDTO.tenmh + ' [-' + option.colorDTO.tencolor + '-] [--' + option.sizeDTO.tensize + '--] ' + `(mamh: ${option.mathangDTO.mamh})`}
                        sx={{ width: 300 }}

                        renderInput={(params) => <TextField {...params} label="Sản phẩm" key={params.id}/>}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField value={sl || ''} id="outlined-basic" label="Số lượng" variant="outlined" type='number' onChange={e => setSl(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <TextField value={gia || ''} id="outlined-basic" label="Đơn giá" variant="outlined" type='number' onChange={e => setGia(e.target.value)} />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="outlined" onClick={() => {
                        if (value == null || gia == null || sl == null) {
                            alert('Vui lòng nhập đầy đủ thông tin')
                            return
                        }
                        handleAddCtmh({ ctMathangDTOs: value, soluong: sl, dongia: gia }); setValue(null); setGia(null); setSl(null)
                    }}>
                        Thêm sản phẩm
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
                    Thêm phiếu đặt thành công!
                </Alert>
            </Snackbar>
            <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
                    Sửa phiếu đặt thành công!
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}

export default OrderVoucher
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
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import './Import.scss'
import { useSelector } from 'react-redux';
import useFetchAdmin from '../../hooks/useFetchAdmin';
import { useParams } from 'react-router-dom';
import { ClearOutlined } from '@mui/icons-material';


const Import = ({ type }) => {
    const { id } = useParams()
    const { data, loading, error } = useFetchAdmin(`${type === 'add' ? `` : `/phieunhap/` + id}`);

    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');

    const [sl, setSl] = React.useState(null);
    const [gia, setGia] = React.useState(null);
    const [rows, setRows] = useState([])
    const user = useSelector(state => state.user)

    const [ctmh, setCtmh] = useState([])
    const pd = useFetchAdmin(`/phieudat`)

    const [pdValue, setPdValue] = useState(null)
    const [pdInputValue, setPdInputValue] = useState('')

    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
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
            setPdValue(data.phieudatDTO)
            setRows(data.ctPhieunhapDTOs)
        }
    }, [loading])


    const handleAdd = () => {
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

        const phieunhap = {
            "phieudatDTO": pdValue,
            "nhanvienDTO": defaultNV,
            "ngaynhap": new Date(),
            "ctPhieunhapDTOs": rows

        }

        fetch('http://localhost:8081/api/phieunhap', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(phieunhap)
        }).then(res => res.json()).then(data => {
            console.log(data)
        }
        )
    }

    const handleMod = () => {
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

        const phieunhap = {
            "mapn": data.mapn,
            "phieudatDTO": pdValue,
            "nhanvienDTO": defaultNV,
            "ngaynhap": new Date(),
            "ctPhieunhapDTOs": rows
        }

        fetch('http://localhost:8081/api/phieunhap', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(phieunhap)
        }).then(res => res.json()).then(data => {
            console.log(data)
        }
        )
    }
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

    const handleDelCtmh = (i) => {
        const filtered = rows.filter(item => item.ctMathangDTO.id !== i.ctMathangDTO.id)
        setRows(filtered)
    }
    const handleAddCtmh = (i) => {
        let filtered = rows.filter(item => item.ctMathangDTO.id === i.ctMathangDTO.id)

        if (filtered.length > 0) {
            filtered[0].soluong = parseInt(filtered[0].soluong) + parseInt(i.soluong)
            filtered[0].dongia = parseInt(filtered[0].dongia) + parseInt(i.dongia)
            setRows([...rows.filter(item => item.ctMathangDTO.id !== i.ctMathangDTO.id), filtered[0]])
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
                    <h1>Thông tin phiếu nhập</h1>
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
                        value={pdValue}
                        onChange={(event, newValue) => {
                            setPdValue(newValue);

                        }}

                        inputValue={pdInputValue}
                        onInputChange={(event, newInputValue) => {
                            setPdInputValue(newInputValue);
                        }}
                        options={pd.data === null ? { lable: 'none' } : pd.data.filter(i => i.phieunhapDTOs.length === 0)}
                        getOptionLabel={option => pd.data === null ? option.lable : option.mapd + ' ' + `(Ngày đặt: ${option.ngaydat} )`}
                        sx={{ width: 300 }}

                        renderInput={(params) => <TextField {...params} label="Phiếu đặt" />}
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
                                    <TableCell align="right">Số lượng</TableCell>
                                    <TableCell align="right">Đơn giá</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.ctMathangDTO.mathangDTO.mamh}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.ctMathangDTO.mathangDTO.mamh}
                                        </TableCell>
                                        <TableCell align="right">{row.ctMathangDTO.mathangDTO.tenmh}</TableCell>
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
                        getOptionLabel={option => ctmh === null ? option.lable : option.mathangDTO.tenmh + ' [-' + option.color + '-] [--' + option.size + '--] ' + `(mamh: ${option.mathangDTO.mamh})`}
                        sx={{ width: 300 }}

                        renderInput={(params) => <TextField {...params} label="Sản phẩm" />}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField value={sl || ''} id="outlined-basic" label="Số lượng" variant="outlined" type='number' onChange={e => setSl(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <TextField value={gia || ''} id="outlined-basic" label="Đơn giá" variant="outlined" type='number' onChange={e => setGia(e.target.value)} />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="outlined" onClick={() => {  handleAddCtmh({ ctMathangDTO: value, soluong: sl, dongia: gia }); setValue(null); setGia(null); setSl(null) }}>
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
        </React.Fragment>
    )
}

export default Import
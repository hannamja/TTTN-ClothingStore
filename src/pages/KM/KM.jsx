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
import Autocomplete from '@mui/material/Autocomplete';
import { Alert, Button, Input, Snackbar } from '@mui/material';
import './KM.scss'
import { useParams } from 'react-router-dom';
import useFetchAdmin from '../../hooks/useFetchAdmin';
import { useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import { ClearOutlined } from '@mui/icons-material';
const KM = ({ type }) => {
    const { id } = useParams()
    const { data, loading, error } = useFetchAdmin(`${type === 'add' ? `/km` : `/km/` + id}`);
    const user = useSelector(state => state.user)
    const mh = useFetch('/mathang')

    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [ctkmRows, setCtkmRows] = useState([])
    const [ld, setLd] = useState('')
    const [bd, setBd] = useState(`${type === 'add' ? new Date().toISOString().slice(0, 10) : ''}`)
    const [kt, setKt] = useState('')
    const [mucgiam, setMucgiam] = useState('')
    const [mucgiamInput, setMucgiamInput] = useState('')

    useEffect(() => {
        if (data) {
            if (type !== 'add') {
                setBd(data.ctKhuyenmais.ngaybd)
                setKt(data.ctKhuyenmais.ngaykt)
                setLd(data.lydo)
                setCtkmRows(data.ctKhuyenmais)
            }
        }
    }, [loading])

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
        if (ld == '') {
            alert('Vui lòng nhập đầy đủ thông tin')
            return
        }
        const km = {
            "lydo": ld,
            "nhanvien": { 'manv': user.info.nhanvien.manv },
            "ctKhuyenmais": ctkmRows
        }
        fetch('http://localhost:8081/api/km', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(km)
        }).then(res => res.json()).then(data => { setOpen(true) })
    }

    const handleMod = () => {
        if (ld == '') {
            alert('Vui lòng nhập đầy đủ thông tin')
            return
        }
        const km = {
            "makm": data.makm,
            "lydo": ld,
            "nhanvien": { 'manv': user.info.nhanvien.manv },
            "ctKhuyenmais": ctkmRows
        }

        fetch('http://localhost:8081/api/km', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(km)
        }).then(res => res.json()).then(data => setOpen1(true))
    }


    const handleDelCtmh = (i) => {
        const filtered = ctkmRows.filter(item => item.id.mamh !== i.id.mamh)
        setCtkmRows(filtered)
    }
    const handleAddCtmh = (i) => {
        let filtered = ctkmRows.filter(item => item.id.mamh === i.id.mamh)

        if (filtered.length > 0) {
            setCtkmRows([...ctkmRows.filter(item => item.id.mamh !== i.id.mamh), i])
        }
        else {
            setCtkmRows([...ctkmRows, i])
        }
    }


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
                    <h1>Thông tin khuyến mãi</h1>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="Lý do"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={ld}
                        onChange={(e) => setLd(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <h5>Chi tiết khuyến mãi</h5>
                    <TableContainer component={Paper} sx={{ height: 400, overflow: 'scroll', marginTop: 5 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: 'yellow' }}>
                                <TableRow>
                                    <TableCell>Mã sản phẩm</TableCell>
                                    <TableCell align="right">Mức giảm</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ctkmRows.map((row) => (
                                    <TableRow
                                        key={row.id.mamh}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id.mamh}
                                        </TableCell>
                                        <TableCell align="right">{row.mucgiam}</TableCell>
                                        <TableCell><ClearOutlined onClick={
                                            () => handleDelCtmh(row)
                                        } sx={{ color: 'red' }} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12}>
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
                        options={mh.data === null ? { lable: 'none' } : mh.data}
                        getOptionLabel={option => mh.data === null ? option.lable : option.tenmh + ' ' + `(mamh: ${option.mamh})`}
                        sx={{ width: 300 }}

                        renderInput={(params) => <TextField {...params} label="Sản phẩm" />}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Ngày bắt đầu"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        type='date'
                        value={bd}
                        onChange={(e) => setBd(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="Ngày kết thúc"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        type='date'
                        value={kt}
                        onChange={(e) => setKt(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        value={mucgiam}
                        onChange={(event, newValue) => {
                            setMucgiam(newValue);

                        }}

                        inputValue={mucgiamInput}
                        onInputChange={(event, newInputValue) => {
                            setMucgiamInput(newInputValue);
                        }}
                        options={['10%', '20%', '30%', '40%', '50%', '70%', '80%']}
                        sx={{ width: 300 }}

                        renderInput={(params) => <TextField {...params} label="Mức giảm" />}
                    />
                </Grid>


                <Grid item xs={12}>
                    <Button variant="outlined" onClick={() => {

                        if (bd == '' || kt == '' || value == null || mucgiam == '') {
                            alert('Vui lòng nhập đủ thông tin sản phẩm, mức giảm, ngày bắt đầu và kết thúc')
                            return
                        }
                        handleAddCtmh({
                            id: {
                                "mamh": value.mamh
                            }, ngaybd: new Date(bd), ngaykt: new Date(kt), mucgiam: mucgiam
                        });
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
                    Thêm khuyến mãi thành công!
                </Alert>
            </Snackbar>
            <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
                    Sửa khuyến mãi thành công!
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}

export default KM
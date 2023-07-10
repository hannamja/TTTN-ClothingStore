import React, { useState } from 'react'
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

const options = ['Option 1', 'Option 2'];
const Import = () => {
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');

    const [rows, setRows] = useState([])
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
                        label="Nguyễn Văn A"
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
                        label="EMP01"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    <h5>Phiếu đặt</h5>
                    <TextField
                        id="address1"
                        name="address1"
                        label='PD01'
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    <h5>Danh sách sản phẩm được nhập</h5>
                    <TableContainer component={Paper} sx={{ height: 400, overflow: 'scroll', marginTop: 5 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead sx={{position: 'sticky', top: 0, backgroundColor: 'yellow'}}>
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
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="right">{row.ten}</TableCell>
                                        <TableCell align="right">{row.sl}</TableCell>
                                        <TableCell align="right">{row.gia}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={options}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Sản phẩm" />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" onClick={() => setRows([...rows, { id: '01', ten: 'Name', sl: 10, gia: 10000 }])}>
                        Thêm sản phẩm
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained">
                        Save
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Import
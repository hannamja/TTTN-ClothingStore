import React from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Autocomplete, Button, Input } from '@mui/material';
import './Clothes.scss'
import useFetch from '../../hooks/useFetch';
const Clothes = ({ type }) => {
    const clData = useFetch(`/chatlieu`);
    const brandData = useFetch(`/nhanhieu`);
    const typeData = useFetch(`/loaimh`);

    const [value, setValue] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');
    const [rows, setRows] = React.useState([])
    return (clData.loading || brandData.loading || typeData.loading ? ('loading...') :
        <React.Fragment>
            <Grid container spacing={3} style={{ margin: '50px', alignItems: 'center' }}>
                <Grid xs={12} sm={12}>
                    <img
                        className="catImg"
                        src="https://images.pexels.com/photos/6347533/pexels-photo-6347533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt=""
                    />
                </Grid>
                <Grid xs={12} sm={12}>
                    <h1>Thông tin quần áo</h1>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="Tên quần áo"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Trạng thái"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        type=''
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Giá"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        type='number'
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Cách làm"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
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
                        options={brandData.data.reduce((reduce, i) => [...reduce, i.manh + '-' + i.tennh], [])}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Chọn thương hiệu" />}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
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
                        options={typeData.data.reduce((reduce, i) => [...reduce, i.maloaimh + '-' + i.tenloadimh], [])}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Chọn loại" />}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
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
                        options={clData.data.reduce((reduce, i) => [...reduce, i.macl + '-' + i.tenvai], [])}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Chọn chất liệu" />}
                    />
                </Grid>

                <Grid container item xs={12} sm={6}>
                    <h5>Chi tiết kích thước sản phẩm</h5>
                    <TableContainer component={Paper} sx={{ height: 400, overflow: 'scroll', marginTop: 1 }}>
                        <Table aria-label="simple table">
                            <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: 'yellow' }}>
                                <TableRow>
                                    <TableCell align='center'>Kích thước</TableCell>
                                    <TableCell align="center">Số lượng</TableCell>
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
                    {
                        type === 'detail' ? <></> : <>
                            <Grid xs={12} sm={5}>
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
                                    options={clData.data.reduce((reduce, i) => [...reduce, i.macl + '-' + i.tenvai], [])}
                                    sx={{ marginTop: 1 }}
                                    renderInput={(params) => <TextField {...params} label="Sản phẩm" />}
                                />
                            </Grid>
                            <Grid xs={12} sm={2}>

                            </Grid>
                            <Grid xs={12} sm={5}>
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
                                    options={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                                    sx={{ marginTop: 1 }}
                                    renderInput={(params) => <TextField {...params} label="Số lượng" type='number' />}
                                />
                            </Grid>
                        </>
                    }
                </Grid>

                <Grid container item xs={12} sm={6}>
                    <h5>Hình ảnh sản phẩm</h5>
                    <TableContainer component={Paper} sx={{ height: 400, overflow: 'scroll', marginTop: 1 }}>
                        <Table aria-label="simple table">
                            <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: 'Highlight' }}>
                                <TableRow>
                                    <TableCell align='center'>Số thứ tự</TableCell>
                                    <TableCell align="center">Đường dẫn</TableCell>
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
                    {
                        type === 'detail' ? <></> : <>
                            <Grid xs={12} sm={5}>
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
                                    options={clData.data.reduce((reduce, i) => [...reduce, i.macl + '-' + i.tenvai], [])}
                                    sx={{ marginTop: 1 }}
                                    renderInput={(params) => <TextField {...params} label="Sản phẩm" />}
                                />
                            </Grid>
                            <Grid xs={12} sm={2}>

                            </Grid>
                            <Grid xs={12} sm={5}>
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
                                    options={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                                    sx={{ marginTop: 1 }}
                                    renderInput={(params) => <TextField {...params} label="Số lượng" type='number' />}
                                />
                            </Grid>
                        </>
                    }
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

export default Clothes
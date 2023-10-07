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
import { Autocomplete, Button, Input } from '@mui/material';
import './Clothes.scss'
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import useFetchAdmin from '../../hooks/useFetchAdmin';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { ClearOutlined } from '@mui/icons-material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ttOpt = [{ tt: "0", ttName: 'Có sẵn' }, { tt: "1", ttName: 'Không có sẵn' }]
const Clothes = ({ type }) => {
    const { id } = useParams()
    const { data, loading, error } = useFetch(`${type === 'add' ? `/mathang` : `/mathang/` + id}`);

    const clData = useFetchAdmin(`/chatlieu`);
    const brandData = useFetchAdmin(`/nhanhieu`);
    const typeData = useFetchAdmin(`/loaimh`);

    const [name, setName] = useState('default name')
    const [price, setPrice] = useState()
    const [cachlam, setCachlam] = useState('')
    const [cachlamInput, setCachlamInput] = useState('')

    const [tt, setTT] = useState(ttOpt[0])
    const [ttInput, setTTInput] = useState()


    const [sizeValue, setSizeValue] = React.useState(null);
    const [colorValue, setColorValue] = React.useState('');

    const [manh, setMamh] = useState()
    const [cl, setCl] = useState()
    const [brand, setBrand] = useState()
    const [loai, setLoai] = useState()
    const [pl, setPl] = useState(null)
    const [clInput, setClInput] = useState()
    const [brandInput, setBrandInput] = useState()
    const [loaiInput, setLoaiInput] = useState()

    const [size, setSize] = useState('')
    const [sl, setSl] = useState(0)


    const [color, setColor] = React.useState('');


    const [url, setUrl] = useState('')

    const [ctmhRows, setCtmhRows] = React.useState([])
    const [haRows, setHaRows] = React.useState([])

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleAdd = () => {
        if (cl == '' || loai == '' || brand == '' || name == '' || tt == null || price == null) {
            alert('Vui lòng nhập đầy đủ thông tin')
            return
        }
        const sp = {
            "chatlieuDTO": cl,
            "loaimhDTO": loai,
            "nhanhieuDTO": brand,
            "tenmh": name,
            "mota": "KO",
            "trangthai": tt.tt,
            "cachlam": cachlam,
            "phanloai": pl,
            "gia": price,
            "hinhanhDTOs": haRows,
            "ctMathangs": ctmhRows
        }

        fetch('http://localhost:8081/api/mathang', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sp)
        }).then(res => res.json()).then(data => setOpen(true))
    }

    const handleMod = () => {
        if (cl == '' || loai == '' || brand == '' || name == '' || tt == null || price == null) {
            alert('Vui lòng nhập đầy đủ thông tin')
            return
        }
        const sp = {
            "mamh": manh,
            "chatlieuDTO": cl,
            "loaimhDTO": loai,
            "nhanhieuDTO": brand,
            "tenmh": name,
            "mota": "KO",
            "trangthai": tt.tt,
            "cachlam": cachlam,
            "phanloai": pl,
            "gia": price,
            "hinhanhDTOs": haRows,
            "ctMathangs": ctmhRows
        }

        fetch('http://localhost:8081/api/mathang', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sp)
        }).then(res => res.json()).then(data => setOpen(true))
    }
    useEffect(() => {
        if (data) {
            setMamh(data.mamh)
            setLoai(data.loaimhDTO)
            setName(data.tenmh)
            setBrand(data.nhanhieuDTO)
            setCachlam(data.cachlam)
            setCl(data.chatlieuDTO)
            setTT(ttOpt[parseInt(data.trangthai)])
            setPrice(data.gia)
            setPl(data.phanloai)
            if (type !== 'add') {
                console.log(data.ctMathangs)
                setCtmhRows(data.ctMathangs)
                setHaRows(data.hinhanhDTOs)
            }
        }
    }, [loading])

    const handleDelCtmh = (i) => {
        const filtered = ctmhRows.filter(item => item.color !== i.color && item.size !== i.size)
        setCtmhRows(filtered)
    }
    const handleAddCtmh = (i) => {
        let filtered = ctmhRows.filter(item => item.color === i.color && item.size === i.size)

        if (filtered.length > 0) {
            filtered[0].currentNumbeer = parseInt(filtered[0].currentNumbeer) + parseInt(i.currentNumbeer)
            setCtmhRows([...ctmhRows.filter(item => item.color !== i.color && item.size !== i.size), filtered[0]])
        }
        else {
            setCtmhRows([...ctmhRows, i])
        }
    }
    return (clData.loading || brandData.loading || typeData.loading ? ('loading...') :
        <React.Fragment>
            <Grid container spacing={3} style={{ margin: '50px', alignItems: 'center' }}>
                <Grid item xs={12} sm={12}>
                    <img
                        className="catImg"
                        src="https://images.pexels.com/photos/6347533/pexels-photo-6347533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt=""
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                        options={ttOpt}
                        getOptionLabel={(option) => option.ttName}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Trạng thái" />}
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
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Autocomplete
                        value={cachlam}
                        onChange={(event, newValue) => {
                            setCachlam(newValue);
                        }}
                        inputValue={cachlamInput}
                        onInputChange={(event, newInputValue) => {
                            setCachlamInput(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={['HAND', 'MACHINE']}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Chọn cách làm" />}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Autocomplete
                        value={brand}
                        onChange={(event, newValue) => {
                            setBrand(newValue);
                        }}
                        inputValue={brandInput}
                        onInputChange={(event, newInputValue) => {
                            setBrandInput(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={brandData.data}
                        getOptionLabel={(option) => option.tennh}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Chọn thương hiệu" />}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Autocomplete
                        value={loai}
                        onChange={(event, newValue) => {
                            setLoai(newValue);
                        }}
                        inputValue={loaiInput}
                        onInputChange={(event, newInputValue) => {
                            setLoaiInput(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={typeData.data}
                        getOptionLabel={(option) => option.tenloadimh}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Chọn loại" />}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Autocomplete
                        value={cl}
                        onChange={(event, newValue) => {
                            setCl(newValue);
                        }}
                        inputValue={clInput}
                        onInputChange={(event, newInputValue) => {
                            setClInput(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={clData.data}
                        getOptionLabel={(option) => option.tenvai}
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
                                    <TableCell>Màu sắc</TableCell>
                                    <TableCell>Kích thước</TableCell>
                                    <TableCell>Số lượng</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ctmhRows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{row.color}</TableCell>
                                        <TableCell>{row.size}</TableCell>
                                        <TableCell>{row.currentNumbeer}</TableCell>
                                        <TableCell><ClearOutlined onClick={
                                            () => handleDelCtmh(row)
                                        } sx={{ color: 'red' }} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Grid item xs={12} sm={4}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            value={color}
                            onChange={(event, newValue) => {
                                setColor(newValue);

                            }}

                            inputValue={colorValue}
                            onInputChange={(event, newInputValue) => {
                                setColorValue(newInputValue);
                            }}
                            options={['BLUE', 'YELLOW', 'WHITE', 'RED', 'BLACK', 'GRAY']}
                            sx={{ marginTop: 1 }}
                            renderInput={(params) => <TextField {...params} label="Màu sắc" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            value={size}
                            onChange={(event, newValue) => {
                                setSize(newValue);
                            }}

                            inputValue={sizeValue}
                            onInputChange={(event, newInputValue) => {
                                setSizeValue(newInputValue);
                            }}
                            options={['L', 'S', 'M', 'XL', 'XL', 'XXL']}
                            sx={{ marginTop: 1 }}
                            renderInput={(params) => <TextField {...params} label="Kích cỡ" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField sx={{ marginTop: 1 }} value={sl} id="outlined-basic" label="Số lượng" variant="outlined" type='number' onChange={e => setSl(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button sx={{ marginTop: 1 }} variant="outlined" onClick={() => { handleAddCtmh({ color: color, size: size, currentNumbeer: sl }); setColor(null); setSize(null); setSl(0) }}>
                            Thêm chi tiết sản phẩm
                        </Button>
                    </Grid>
                </Grid>


                <Grid container item xs={12} sm={6}>
                    <h5>Hình ảnh sản phẩm</h5>
                    <TableContainer component={Paper} sx={{ height: 400, overflow: 'scroll', marginTop: 1 }}>
                        <Table aria-label="simple table">
                            <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: 'Highlight' }}>
                                <TableRow>
                                    <TableCell>Số thứ tự</TableCell>
                                    <TableCell>Đường dẫn</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {haRows.map((row, idx) => (
                                    <TableRow
                                        key={idx}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{idx}</TableCell>
                                        <TableCell>{row.duongdan}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {
                        type === 'detail' ? <></> : <>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    required
                                    id="firstName"
                                    name="firstName"
                                    label="URL"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="outlined"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    sx={{ marginTop: 1 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={7}>

                            </Grid>
                            <Grid item xs={12}>
                                <Button disabled={url === '' ? true : false} variant="outlined" onClick={() => { setHaRows([...haRows, { "duongdan": url }]); setUrl('') }} sx={{ marginTop: 1 }}>
                                    Thêm đường dẫn
                                </Button>
                            </Grid>
                        </>
                    }
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
                {
                    type === 'add' ? <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Thêm quần áo thành công!
                    </Alert> :
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Sửa quần áo thành công!
                        </Alert>
                }
            </Snackbar>
        </React.Fragment >
    )
}

export default Clothes
import { useEffect, useState } from 'react'
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
import { Button } from '@mui/material';
import './KM.scss'
import { useParams } from 'react-router-dom';
import useFetchAdmin from '../../hooks/useFetchAdmin';
import { useSelector } from 'react-redux';
import { ClearOutlined } from '@mui/icons-material';
import AlertMessage from "../../components/AlertMessage";
import { dateToString } from '../../utilities/helpers';
import E404 from '../../components/404/E404';

const initialMessage = {
    content: "",
    type: "",
};

const KM = ({ type }) => {
    const { id } = useParams()
    const { data, loading, error } = useFetchAdmin(`${type === 'add' ? `/km` : `/km/` + id}`);
    const currentDate = new Date().toISOString().slice(0, 10);

    const user = useSelector(state => state.user)
    const mh = useFetchAdmin('/mathangAd')

    const [message, setMessage] = useState(initialMessage);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [ctkmRows, setCtkmRows] = useState([]);
    const [ld, setLd] = useState("");
    const [bd, setBd] = useState(currentDate);
    const [kt, setKt] = useState(currentDate);
    const [mucgiam, setMucgiam] = useState(null);
    const [mucgiamInput, setMucgiamInput] = useState(null);

    useEffect(() => {
        console.log(data)
        if (data) {
            if (type !== 'add' && data?.status != 404) {
                setBd(dateToString(parseInt(data?.ngaybd)))
                setKt(dateToString(parseInt(data?.ngaykt)))
                setLd(data.lydo)
                setCtkmRows(data.ctKhuyenmais)
            }
        }
    }, [loading])

    const handleAdd = () => {
        if (!ld.trim()) {
            setMessage({ content: "Vui lòng nhập lý do!", type: "warning" })
            return;
        }
        if (!bd) {
            setMessage({ content: "Vui lòng chọn ngày bắt đầu!", type: "warning" })
            return;
        }
        if (!kt) {
            setMessage({ content: "Vui lòng chọn ngày kết thúc!", type: "warning" })
            return;
        }
        console.log(new Date(bd).getDate())
        if (new Date(bd).getDate() < new Date().getDate()) {

            setMessage({ content: "Ngày bắt đầu phải bằng hoặc lớn hơn ngày hiện tại!", type: "warning" })
            return;
        }
        if (new Date(kt).getDate() < new Date().getDate()) {
            setMessage({ content: "Ngày kết thúc phải bằng hoặc lớn hơn ngày hiện tại!", type: "warning" })
            return;
        }
        if (new Date(bd).getDate() > new Date(kt).getDate()) {
            setMessage({ content: "Ngày bắt đầu phải bằng hoặc lớn hơn ngày kết thúc!", type: "warning" })
            return;
        }
        const km = {
            "lydo": ld,
            "nhanvien": { 'manv': user.info.nhanvien.manv },
            ngaybd: bd,
            ngaykt: kt,
            "ctKhuyenmais": ctkmRows
        }
        fetch("http://localhost:8081/api/km", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
            body: JSON.stringify(km),
        })
            .then((res) => res.json())
            .then((data) => {
                setLd("");
                setBd(`${type === "add" ? currentDate : ""}`);
                setKt(currentDate);
                setCtkmRows([])
                setMessage({
                    content: "Thêm khuyến mãi thành công!",
                    type: "success",
                });
            })
            .catch(() => {
                setMessage({
                    content: "Thêm khuyến mãi thất bại!",
                    type: "error",
                });
            })
    }

    const handleMod = () => {
        if (!ld.trim()) {
            setMessage({ content: "Vui lòng nhập lý do!", type: "warning" })
            return;
        }
        const km = {
            "makm": data.makm,
            "lydo": ld,
            "nhanvien": { 'manv': user.info.nhanvien.manv },
            ngaybd: bd,
            ngaykt: kt,
            "ctKhuyenmais": ctkmRows
        }

        fetch("http://localhost:8081/api/km", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
            body: JSON.stringify(km),
        })
            .then((res) => res.json())
            .then((data) => {
                setMessage({
                    content: "Sửa khuyến mãi thành công!",
                    type: "success",
                });
            })
            .catch(() => {
                setMessage({
                    content: "Sửa khuyến mãi thất bại!",
                    type: "error",
                });
            })
    }


    const handleDelCtmh = (i) => {
        const filtered = ctkmRows.filter(item => item.id.mamh !== i.id.mamh)
        setCtkmRows(filtered)
    }
    const handleAddCtmh = (i) => {
        console.log(i);
        let filtered = ctkmRows.filter(item => item.id.mamh === i.id.mamh)

        if (filtered.length > 0) {
            setCtkmRows([...ctkmRows.filter(item => item.id.mamh !== i.id.mamh), i])
        }
        else {
            setCtkmRows([...ctkmRows, i])
        }
        setValue(null);
        setMucgiam(null);
    }
    return (data?.status == 404 ? <E404 /> :
        <>
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
                        inputProps={{ maxLength: 45 }}
                        variant="standard"
                        value={ld}
                        onChange={(e) => setLd(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <span>Ngày bắt đầu</span>
                    <TextField
                        required
                        disabled={type === "add" ? false : true}
                        id="lastName"
                        name="lastName"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        type='date'
                        inputProps={{
                            min: type === "add" ? new Date().toISOString().slice(0, 10) : "inherit"
                        }}
                        value={bd}
                        onChange={(e) => {
                            const dateValue = e.target.value;
                            if (dateValue) {
                                if (new Date(dateValue).getTime() > new Date(kt).getTime()) {
                                    setKt("");
                                }
                            } else {
                                setKt("");
                            }
                            setBd(dateValue)
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <span>Ngày kết thúc</span>
                    <TextField
                        required
                        disabled={!bd || type === "add" ? false : true}
                        id="firstName"
                        name="firstName"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        type='date'
                        inputProps={{
                            min: bd ? new Date(bd).toISOString().slice(0, 10) : ""
                        }}
                        value={kt}
                        onChange={(e) => setKt(e.target.value)}
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
                <Grid item xs={12} sm={6}>
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
                        if (!value) {
                            setMessage({ content: "vui lòng chọn sản phẩm!", type: "warning" })
                            return
                        }
                        if (!mucgiam) {
                            setMessage({ content: "Vui lòng chọn mức giảm!", type: "warning" })
                            return;
                        }
                        handleAddCtmh({
                            id: {
                                "mamh": value.mamh
                            },
                            mucgiam: mucgiam
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
            <AlertMessage message={message} setMessage={setMessage} />
        </>
    )
}

export default KM
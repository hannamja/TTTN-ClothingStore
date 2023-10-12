import React, { useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import HistoryList from '../HistoryList/HistoryList';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import './OrderBillList.scss'
import { Alert, Box, Snackbar, Typography } from '@mui/material';
import useFetchAdmin from '../../hooks/useFetchAdmin';
import { useSelector } from 'react-redux';
import { CheckOutlined, DeliveryDiningOutlined } from '@mui/icons-material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
    '&:last-child': {
        '.btns': {
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            '.info': {
                display: 'flex',
                alignItems: 'center',
                color: 'lime',
                cursor: 'pointer'
            }
        }
    }

}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type()': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
    marginBottom: 10,
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
}));
const BackspaceIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '80%',
        [theme.breakpoints.up('sm')]: {
            width: '30ch',
            '&:focus': {
                width: '40ch',
                borderBottom: '1px solid black'
            },
        },
    },
}));
const OrderBillList = () => {
    const [open, setOpen] = React.useState('');
    const handleOpen = (e) => setOpen(e);
    const handleClose = (e) => setOpen(e);

    const [input, setInput] = useState('')
    const handldeChange = (e) => {
        setInput(e)
    }
    const { data, loading, error } = useFetchAdmin(`/hoadon`);
    const user = useSelector(state => state.user)

    const [open1, setOpen1] = React.useState(false);

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };

    const [open10, setOpen10] = React.useState(false);

    const handleClose10 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen10(false);
    };

    const [open01, setOpen01] = React.useState(false);

    const handleClose01 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen01(false);
    };

    const [open100, setOpen100] = React.useState(false);

    const handleClose100 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen100(false);
    };
    const handleConfirm = (hd) => {
        hd.nhanvien.manv = user.info.nhanvien.manv
        console.log(hd)
        fetch('http://localhost:8081/api/hoadon/confirm', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(hd)
        }).then(res => res.json()).then(data => {
            setOpen1(true)
            handleClose('')
            window.location.reload()
        })
    }
    const handleComplete = (hd) => {
        fetch('http://localhost:8081/api/hoadon/complete', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(hd)
        }).then(res => res.json()).then(data => {
            setOpen01(true)
            handleClose('')
            window.location.reload()
        })
    }
    const handleCancle = (hd) => {
        if (window.confirm('Bạn có muốn hủy hóa đơn có id: ' + hd.mahd + '?'))
            fetch('http://localhost:8081/api/hoadon/cancel', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                },
                body: JSON.stringify(hd)
            }).then(res => res.json()).then(data => {
                setOpen10(true)
                handleClose('')
                window.location.reload()
            })
        else return
    }

    const handleProcessing = (hd) => {
        fetch('http://localhost:8081/api/hoadon/processing', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(hd)
        }).then(res => res.json()).then(data => {
            setOpen100(true)
            handleClose('')
            window.location.reload()
        })
    }

    return (
        loading ? 'loading...' :
            <div className='orderBillList'>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon onClick={() => setInput('search')} />
                    </SearchIconWrapper>

                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => { handldeChange(e.value) }}
                        value={input}
                    />
                    <BackspaceIconWrapper onClick={() => { setInput('') }}>
                        <BackspaceOutlinedIcon />
                    </BackspaceIconWrapper>
                </Search>

                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Mã số khách hàng</StyledTableCell>
                                <StyledTableCell align='center'>Mã đơn</StyledTableCell>
                                <StyledTableCell align="right">Ngày đặt</StyledTableCell>
                                <StyledTableCell align="center">Trạng thái duyệt</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <StyledTableRow key={row.mahd}>
                                    <StyledTableCell align="center">{row.khachhang.makh}</StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        <Link className='link' to='/'>{row.mahd}</Link>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.ngaytao}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <div className='btns'>
                                            <div className='info' onClick={() => handleOpen(row.mahd)}>
                                                <InfoOutlinedIcon />
                                            </div>
                                            <Modal
                                                open={open == row.mahd}
                                                onClose={() => handleClose('')}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <Typography id="modal-modal-title" variant="h6" component="div">
                                                        <HistoryList data={row} type='admin' />
                                                    </Typography>
                                                    {
                                                        row.chitietTrangThaiDTO.trangthai.matthd < 3 && row.chitietTrangThaiDTO.trangthai.matthd !== 6 ? <div style={{ display: 'flex', gap: 5, justifyContent: 'end' }}>
                                                            <CheckOutlined style={{ color: 'lime' }} onClick={() => handleConfirm(row)} />
                                                            <ClearOutlinedIcon style={{ color: 'red' }} onClick={() => handleCancle(row)} />
                                                        </div>
                                                            : row.chitietTrangThaiDTO.trangthai.matthd === 4 ?
                                                                <div style={{ display: 'flex', gap: 5, justifyContent: 'end', alignItems: 'center' }}>
                                                                    <CheckOutlined color='success' onClick={() => handleComplete(row)} /> Xác nhận hoàn thành
                                                                </div>
                                                                : row.chitietTrangThaiDTO.trangthai.matthd === 3 ?
                                                                    <div style={{ display: 'flex', gap: 5, justifyContent: 'end', alignItems: 'center' }}>
                                                                        <DeliveryDiningOutlined color='success' onClick={() => handleProcessing(row)} /> Xác nhận đang giao
                                                                    </div> : <></>
                                                    }

                                                </Box>
                                            </Modal>
                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>

                    <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
                        Đã xác nhận đơn!
                    </Alert>

                </Snackbar>
                <Snackbar open={open100} autoHideDuration={6000} onClose={handleClose100}>

                    <Alert onClose={handleClose100} severity="success" sx={{ width: '100%' }}>
                        Đã xác nhận đơn đang được giao!
                    </Alert>

                </Snackbar>
                <Snackbar open={open01} autoHideDuration={6000} onClose={handleClose01}>

                    <Alert onClose={handleClose01} severity="info" sx={{ width: '100%' }}>
                        Đã xác nhận hoàn thành đơn đơn!
                    </Alert>

                </Snackbar>
                <Snackbar open={open10} autoHideDuration={6000} onClose={handleClose10}>

                    <Alert onClose={handleClose10} severity="error" sx={{ width: '100%' }}>
                        Đã hủy đơn!
                    </Alert>

                </Snackbar>
            </div>
    )
}

export default OrderBillList

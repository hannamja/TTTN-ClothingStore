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
import { Link } from 'react-router-dom';
import './ImportVoucher.scss'
import { InfoOutlined } from '@mui/icons-material';
import useFetchAdmin from '../../hooks/useFetchAdmin';
import { Alert, Snackbar } from '@mui/material';
import { useSelector } from 'react-redux';

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
            '.modify': {
                display: 'flex',
                alignItems: 'center',
                color: 'lime',
                cursor: 'pointer'
            },
            '.del': {
                display: 'flex',
                alignItems: 'center',
                color: 'red',
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

const ImportVoucherList = () => {
    const [input, setInput] = useState('')
    const handldeChange = (e) => {
        setInput(e)
    }

    const [open1, setOpen1] = React.useState(false);
    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };
    const user = useSelector(state => state.user)
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleDel = (id) => {
        fetch('http://localhost:8081/api/phieunhap/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
        }).then(res => res.json()).then(data => {
            console.log(data)
            if (data.status == 404) setOpen1(true)
            else setOpen(true)
        }
        )
    }
    const { data, loading, error } = useFetchAdmin(`/phieunhap`);
    return (
        loading ? 'loading...' :
            <div className='ivList'>
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
                                <StyledTableCell align="center">Mã phiếu nhập</StyledTableCell>
                                <StyledTableCell align="right">Nhân viên lập</StyledTableCell>
                                <StyledTableCell align="right">Ngày lập</StyledTableCell>
                                <StyledTableCell align="center">Thao tác</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <StyledTableRow key={row.mapn}>
                                    <StyledTableCell align="center">{row.mapn}</StyledTableCell>
                                    <StyledTableCell align="right">{row.nhanvienDTO.manv}</StyledTableCell>
                                    <StyledTableCell align="right">{row.ngaynhap}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <div className='btns'>
                                            {/* <Link className='del'>
                                                <ClearOutlinedIcon onClick={() => handleDel(row.mapn)} />
                                            </Link> */}
                                            <Link to={`/admin/importManagement/modifyImport/${row.mapn}`} className='modify'>
                                                <BorderColorOutlinedIcon />
                                            </Link>
                                            <Link to={`/admin/importManagement/detailImport/${row.mapn}`} className='detail'>
                                                <InfoOutlined />
                                            </Link>
                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="btns">
                    <div className="add">
                        <AddCircleOutlineOutlinedIcon style={{ width: 30, height: 30, color: 'lime' }} />
                        <Link className='link' to='/admin/importManagement/add'><span>Thêm mới</span></Link>
                    </div>
                </div>

                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Xóa phiếu nhập thành công!
                    </Alert>
                </Snackbar>

                <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                    <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
                        Lỗi!
                    </Alert>
                </Snackbar>
            </div>
    )
}

export default ImportVoucherList
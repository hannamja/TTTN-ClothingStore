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
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import './EmployeeList.scss'
import { CheckBox, InfoOutlined, LockPersonOutlined } from '@mui/icons-material';
import { Alert, Box, Checkbox, FormControl, FormControlLabel, FormGroup, Snackbar } from '@mui/material';
import useFetchAdmin from '../../hooks/useFetchAdmin';
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
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
const EmployeeList = () => {
    const [open1, setOpen1] = React.useState(false);
    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const [input, setInput] = useState('')
    const handldeChange = (e) => {
        setInput(e)
    }
    const user = useSelector(state => state.user)
    const handleDel = (id) => {
        if (window.confirm('Bạn có muốn xóa nhân viên có id: ' + id + '?'))
            fetch('http://localhost:8081/api/nhanvien/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                },
            }).then(res => res.json()).then(data => {
                if (data.status == 404) setOpen1(true)
                else setOpen(true)
            }
            )
        else return
    }
    const { data, loading, error } = useFetchAdmin(`/nhanvien`);
    return (
        loading ? 'loading...' : <div className='empList'>
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
                            <StyledTableCell align='center'>Mã nhân viên</StyledTableCell>
                            <StyledTableCell>Họ tên</StyledTableCell>
                            <StyledTableCell align="right">SĐT</StyledTableCell>
                            <StyledTableCell align="center">Thao tác</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <StyledTableRow key={row.manv}>
                                <StyledTableCell align="center">{row.manv}</StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.tennv}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.sdt}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <div className='btns'>
                                        {
                                            row.trangthai != '1' ?
                                                <>
                                                    <Link className='del'>
                                                        <ClearOutlinedIcon onClick={() => handleDel(row.manv)} />
                                                    </Link>
                                                    <Link to={`/admin/empManagement/modifyEmp/${row.manv}`} className='modify'>
                                                        <BorderColorOutlinedIcon />
                                                    </Link>
                                                </>
                                                : <></>
                                        }

                                        <Link to={`/admin/empManagement/detailEmp/${row.manv}`} className='detail'>
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
                    <Link className='link' to='/admin/empManagement/add'><span>Thêm mới</span></Link>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Xóa nhân viên thành công!
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

export default EmployeeList
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
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';

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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
const topStyle = {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    borderBottom: '1px solid #999',
    padding: 10,
    img: {
        width: 30,
        height: 30,
        cursor: 'pointer'
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
    }

}

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
    const [open, setOpen] = React.useState('');
    const handleOpen = (e) => setOpen(e);
    const handleClose = (e) => setOpen(e);

    const [input, setInput] = useState('')
    const handldeChange = (e) => {
        setInput(e)
    }
    return (
        <div className='empList'>
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
                            <StyledTableCell align='center'>Ảnh</StyledTableCell>
                            <StyledTableCell>Họ</StyledTableCell>
                            <StyledTableCell align="right">Tên</StyledTableCell>
                            <StyledTableCell align="right">SĐT</StyledTableCell>
                            <StyledTableCell align="center">Thao tác</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell align="center"><img src='img/admin.png' alt='Admin'></img></StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    <Link className='link' to='/'>{row.name}</Link>
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <div className='btns'>
                                        <Link className='del'>
                                            <ClearOutlinedIcon />
                                        </Link>
                                        <Link to='/admin/empManagement/modifyEmp/1' className='modify'>
                                            <BorderColorOutlinedIcon />
                                        </Link>
                                        <Link to='/admin/empManagement/detailEmp/1' className='detail'>
                                            <InfoOutlined />
                                        </Link>
                                        <div className='access'>
                                            <LockPersonOutlined onClick={() => handleOpen(row.name)} />
                                            <Modal
                                                open={open == row.name}
                                                onClose={() => handleClose('')}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <div className='top' style={topStyle}>
                                                        <img src='/img/admin.png' alt='Admin' style={topStyle.img}></img>
                                                        <div className="userInfo" style={topStyle.userInfo}>
                                                            <span className='name'>Nguyễn Văn A</span>
                                                            <span className='role'>Admin</span>
                                                        </div>
                                                    </div>
                                                    <div className="center">
                                                        <span>Các quyền của tài khoản</span>
                                                        <div className='option'>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Checkbox />} label='SA' />
                                                                <FormControlLabel control={<Checkbox />} label='Nhân viên duyệt đơn' />
                                                                <FormControlLabel control={<Checkbox />} label='Nhân viên kho' />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className="bottom">

                                                    </div>
                                                </Box>
                                            </Modal>
                                        </div>
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
        </div>
    )
}

export default EmployeeList
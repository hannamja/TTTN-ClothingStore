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
import './PriceManagementList.scss'
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
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
const PriceManagementList = () => {
    const [input, setInput] = useState('')
    const handldeChange = (e) => {
        setInput(e)
    }
    const { data, loading, error } = useFetch(`/mathang`);
    return (
        <div className='pm'>
            {
                loading ? ('loading...') :
                    (<>
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

                        <TableContainer component={Paper} sx={{ height: '80vh', overflow: 'scroll' }}>
                            <Table aria-label="customized table" sx={{ minWidth: 650 }}>
                                <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: 'black' }}>
                                    <TableRow>
                                        <StyledTableCell align='center'>Ảnh</StyledTableCell>
                                        <StyledTableCell>Tên mặt hàng</StyledTableCell>
                                        <StyledTableCell align='right'>Giá</StyledTableCell>
                                        <StyledTableCell align='center'>Thao tác</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        data.map((row) => (
                                            <StyledTableRow key={row.manh}>
                                                <StyledTableCell align="center"><img src={row.hinhanhDTOs[0].duongdan} alt='Goods' style={{ width: 60, height: 60 }}></img></StyledTableCell>
                                                <StyledTableCell component="th" scope="row">
                                                    <Link className='link' to='/'>{row.tenmh}</Link>
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{row.gia}</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <div className='btns'>
                                                        <Link className='del'>
                                                            <ClearOutlinedIcon />
                                                        </Link>
                                                        <Link to='/admin/priceManagement/modifyPrice/1' className='modify'>
                                                            <BorderColorOutlinedIcon />
                                                        </Link>
                                                        <Link to='/admin/priceManagement/detailPrice/1' className='detail'>
                                                            <InfoOutlinedIcon />
                                                        </Link>
                                                    </div>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div className="btns">
                            <div className="add">
                                <AddCircleOutlineOutlinedIcon style={{ width: 30, height: 30, color: 'lime' }} />
                                <Link className='link' to='/admin/priceManagement/add'><span>Thêm mới</span></Link>
                            </div>
                        </div>
                    </>
                    )}
        </div>
    )
}

export default PriceManagementList
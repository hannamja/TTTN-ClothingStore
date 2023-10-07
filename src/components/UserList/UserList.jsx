import React, { useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { Link } from 'react-router-dom';
import './UserList.scss'
import { InfoOutlined } from '@mui/icons-material';
import useFetch from '../../hooks/useFetch';
import useSearch from '../../hooks/useSearch';
import useFetchAdmin from '../../hooks/useFetchAdmin';

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
const UserList = () => {
    const [input, setInput] = useState('')
    const [url, setUrl] = useState(`/khachhang`)
    const handldeChange = (e) => {
        setInput(e)
    }
    const handleSearch = () => {
        if (input !== '') {
            setUrl(`/khachhang/search/${input}`)
        }
        else {
            setUrl(`/khachhang`)
        }
    }
    const { data, loading, error } = useFetchAdmin(url);
    
    return (
        <div className='userList'>
            {
                loading ? ('loading...') :
                    (<>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon onClick={handleSearch} />
                            </SearchIconWrapper>

                            <StyledInputBase
                                placeholder="Tìm theo tên khách…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => { handldeChange(e.target.value) }}
                                value={input}
                            />
                            <BackspaceIconWrapper onClick={() => { handldeChange(''); setUrl('/khachhang')}}>
                                <BackspaceOutlinedIcon />
                            </BackspaceIconWrapper>
                        </Search>
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align='center'>CMND</StyledTableCell>
                                        <StyledTableCell>Họ tên</StyledTableCell>
                                        <StyledTableCell align="right">SĐT</StyledTableCell>
                                        <StyledTableCell align="right">Email</StyledTableCell>
                                        <StyledTableCell align="center">Thao tác</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {error ? ('Something wrong!') : data.map((row) => (
                                        <StyledTableRow key={row.makh}>
                                            <StyledTableCell align="center">{row.cmnd}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                <Link className='link' to='/'>{row.hotenkh}</Link>
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.sdt}</StyledTableCell>
                                            <StyledTableCell align="right">{row.email}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <div className='btns'>
                                                    <Link to='/admin/userManagement/detailUser/1' className='detail'>
                                                        <InfoOutlined />
                                                    </Link>
                                                </div>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                    )}
        </div>
    )
}
export default UserList
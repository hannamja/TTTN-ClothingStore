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
import './KMList.scss'
import { Link } from 'react-router-dom';
import useFetchAdmin from '../../hooks/useFetchAdmin';
import { useSelector } from 'react-redux';
import AlertMessage from '../AlertMessage';

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

const initialMessage = {
    content: "",
    type: "",
};

const KMList = () => {
    const [message, setMessage] = useState(initialMessage);
    const [input, setInput] = useState('')

    const handldeChange = (e) => {
        setInput(e)
    }
    const { data, loading, error } = useFetchAdmin(`/km`);
    const user = useSelector(state => state.user)
    const handleDel = (id) => {
        if (window.confirm('Bạn có muốn xóa khuyến mãi có id: ' + id + '?')) {
            fetch('http://localhost:8081/api/km/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                },
            }).then(res => res.json()).then(data => {
                console.log(data);
                if (data.status == 404) 
                    setMessage({content: data.message, type: "error"})
                else {
                    setMessage({content: "Xóa khuyến mãi thành công!", type: "success"})
                    window.location.reload()
                }
            }
            )
        }
        else return
    }

    return (loading ? ('loading...') :
        <>
            <div className='kmList'>
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
                                <StyledTableCell align='center'>Mã khuyến mãi</StyledTableCell>
                                <StyledTableCell align='right'>Lý do</StyledTableCell>
                                <StyledTableCell align='center'>Thao tác</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <StyledTableRow key={row.makm}>

                                    <StyledTableCell align='center' scope="row">
                                        {row.makm}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.lydo}</StyledTableCell>

                                    <StyledTableCell align="right">
                                        <div className='btns'>
                                            <Link className='del'>
                                                <ClearOutlinedIcon onClick={() => handleDel(row.makm)} />
                                            </Link>
                                            <Link to={`/admin/kmManagement/modifyKM/${row.makm}`} className='modify'>
                                                <BorderColorOutlinedIcon />
                                            </Link>
                                            <Link to={`/admin/kmManagement/detailKM/${row.makm}`} className='detail'>
                                                <InfoOutlinedIcon />
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
                        <Link className='link' to='/admin/kmManagement/add'><span>Thêm mới</span></Link>
                    </div>
                </div>
                <AlertMessage message={message} setMessage={setMessage} />
            </div>
        </>
    )
}

export default KMList
import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
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
import { Link } from 'react-router-dom';
import './RoleList.scss'
import { InfoOutlined } from '@mui/icons-material';
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


const RoleList = () => {
    const [input, setInput] = useState('')
    const handldeChange = (e) => {
        setInput(e)
    }
    const { data, loading, error } = useFetchAdmin(`/role`);
    return (
        loading ? 'loading...' :
            <div className='roleList'>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center'>Mã Role</StyledTableCell>
                                <StyledTableCell>Tên Role</StyledTableCell>
                                <StyledTableCell align="center">Thao tác</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <StyledTableRow key={row.maquyen}>
                                    <StyledTableCell align="center">{row.maquyen}</StyledTableCell>
                                    <StyledTableCell>{row.tenquyen}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <div className='btns'>
                                            <Link className='del'>
                                                <ClearOutlinedIcon />
                                            </Link>
                                            <Link to={`/admin/roleManagement/modifyRole/${row.maquyen}`} className='modify'>
                                                <BorderColorOutlinedIcon />
                                            </Link>
                                            <Link to={`/admin/roleManagement/detailRole/${row.maquyen}`} className='detail'>
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
                        <Link className='link' to='/admin/roleManagement/add'><span>Thêm mới</span></Link>
                    </div>
                </div>
            </div>
    )
}

export default RoleList
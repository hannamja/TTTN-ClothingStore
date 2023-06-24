import React, { useEffect, useState } from 'react'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Link } from 'react-router-dom'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Fab from '@mui/material/Fab';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';
import './AdminSideBar.scss'

const AdminSideBar = ({ isOpen }) => {
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(!open)
    }
    return (
        <>
            <Fab color="inherit" aria-label="add" sx={open ? {
                position: 'absolute',
                bottom: 16,
                right: 16,
            } : { display: 'none' }} onClick={handleClose}>
                <MenuOutlinedIcon />
            </Fab >
            <div className='adminSideBar' style={open ? { display: "none" } : { display: 'block' }}>
                <div className="close" onClick={handleClose}>
                    <CloseOutlinedIcon />
                </div>

                <div className='top'>
                    <div className='user'>
                        <img src='img/admin.png' alt='Admin'></img>
                        <div className="userInfo">
                            <span className='name'>Nguyễn Văn A</span>
                            <span className='role'>Admin</span>
                        </div>
                    </div>

                    <div className='logout'>
                        <ExitToAppOutlinedIcon style={{ color: "red" }} />
                    </div>
                </div>
                <div className="bottom">
                    <div className="item">
                        <WarehouseOutlinedIcon />
                        <Link className='link' to='/admin'>Quản lí kho</Link>
                        <ArrowRightOutlinedIcon />
                    </div>
                    <div className="item">
                        <FileCopyOutlinedIcon />
                        <Link className='link' to='/admin'>Đơn nhập</Link>
                        <ArrowRightOutlinedIcon />
                    </div>
                    <div className="item">
                        <BadgeOutlinedIcon />
                        <Link className='link' to='/admin'>Quản lí nhân viên</Link>
                        <ArrowRightOutlinedIcon />
                    </div>
                    <div className="item">
                        <StackedLineChartOutlinedIcon />
                        <Link className='link' to='/admin'>Thống kê</Link>
                        <ArrowRightOutlinedIcon />
                    </div>
                </div>
            </div>
        </>

    )
}

export default AdminSideBar
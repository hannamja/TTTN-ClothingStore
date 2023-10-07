import React, { useEffect, useState } from 'react'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Link, useNavigate } from 'react-router-dom'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Fab from '@mui/material/Fab';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import './AdminSideBar.scss'
import { ArrowLeftOutlined, HomeOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userReducer.js'

const AdminSideBar = ({ isOpen }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(!open)
    }
    const handleLogout = (event) => {
        event.preventDefault()
        dispatch(logout())
        navigate('/')
    }
    return (
        <>
            <Fab color="inherit" aria-label="add" sx={open ? {
                position: 'fixed',
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
                        <img src='/img/admin.png' alt='Admin'></img>
                        <div className="userInfo">
                            <span className='name'>Nguyễn Văn A</span>
                            <span className='role'>Admin</span>
                        </div>
                    </div>

                    <div className='logout' onClick={handleLogout}>
                        <ExitToAppOutlinedIcon style={{ color: "red" }} />
                    </div>
                </div>
                <div className="bottom">
                    <div className="item">
                        <HomeOutlined />
                        <Link className='link' to='/'>Back to homepage</Link>
                        <ArrowLeftOutlined />
                    </div>
                    <div className="item">
                        <WarehouseOutlinedIcon />
                        <Link className='link' to='/admin'>Quản lí kho</Link>
                        <ArrowRightOutlinedIcon />
                    </div>
                    <div className="item">
                        <DiscountOutlinedIcon />
                        <Link className='link' to='/admin/kmManagement'>Quản lí khuyến mãi</Link>
                        <ArrowRightOutlinedIcon />
                    </div>
                    <div className="item">
                        <SupportAgentOutlinedIcon />
                        <Link className='link' to='/admin/providerManagement'>Quản lí nhà cung cấp</Link>
                        <ArrowRightOutlinedIcon />
                    </div>
                    <div className="item">
                        <ReceiptOutlinedIcon />
                        <Link className='link' to='/admin/orderBill'>Quản lí đơn khách</Link>
                        <ArrowRightOutlinedIcon />
                    </div>
                    <div className="item">
                        <FileCopyOutlinedIcon />
                        <Link className='link' to='/admin/importManagement'>Đơn nhập</Link>
                        <ArrowRightOutlinedIcon />
                    </div>
                    <div className="item">
                        <DescriptionOutlinedIcon />
                        <Link className='link' to='/admin/orderManagement'>Đơn đặt</Link>
                        <ArrowRightOutlinedIcon />
                    </div>
                    <div className="item">
                        <SentimentSatisfiedAltOutlinedIcon />
                        <Link className='link' to='/admin/userManagement'>Quản lí khách</Link>
                        <ArrowRightOutlinedIcon />
                    </div>
                    <div className="item">
                        <BadgeOutlinedIcon />
                        <Link className='link' to='/admin/empManagement'>Quản lí nhân viên</Link>
                        <ArrowRightOutlinedIcon />
                    </div>
                    <div className="item">
                        <LockPersonOutlinedIcon />
                        <Link className='link' to='/admin/roleManagement'>Quản lí quyền</Link>
                        <ArrowRightOutlinedIcon />
                    </div>
                    <div className="item">
                        <StackedLineChartOutlinedIcon />
                        <Link className='link' to='/admin/reports'>Thống kê</Link>
                        <ArrowRightOutlinedIcon />
                    </div>
                </div>
            </div>
        </>

    )
}

export default AdminSideBar
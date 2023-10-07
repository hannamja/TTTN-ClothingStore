import React from 'react'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Link, useNavigate } from 'react-router-dom'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Fab from '@mui/material/Fab';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import './UserSideBar.scss'
import { ArrowLeftOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userReducer.js'
const UserSideBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)
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
            <div className='userSideBar' style={open ? { display: "none" } : { display: 'block' }}>
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
                        <HomeOutlinedIcon />
                        <Link className='link' to='/'>Back to homepage</Link>
                        <ArrowLeftOutlined />
                    </div>
                    <div className="item">
                        <InfoOutlinedIcon />
                        <Link className='link' to='/user/setting'>Thông tin chung</Link>
                        <ArrowRightOutlinedIcon />
                    </div>

                    <div className="item">
                        <SecurityOutlinedIcon />
                        <Link className='link' to='/admin'>Bảo mật</Link>
                        <ArrowRightOutlinedIcon />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserSideBar
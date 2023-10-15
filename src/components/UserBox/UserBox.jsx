import React from 'react'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Popover from '@mui/material/Popover';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { Link } from 'react-router-dom';
import './UserBox.scss'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userReducer.js'
const UserBox = () => {
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = (event) => {
        event.preventDefault()
        dispatch(logout())
    }
    const openUserBox = Boolean(anchorEl);
    const id = openUserBox ? 'simple-popover' : undefined;
    const user = useSelector(state => state.user)
    return (
        <>
            <PersonOutlineOutlinedIcon aria-describedby={id} variant="contained" onClick={handleClick} />
            <Popover
                id={id}
                open={openUserBox}
                anchorEl={anchorEl}
                onClose={handleClose}

                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <div className='userBox'>
                    {
                        Object.keys(user).length == 0 ? (
                            <>
                                <div className='bottom'>
                                    <div className="item">
                                        <ExitToAppOutlinedIcon />
                                        <Link className='link' to='/signin'>Login</Link>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {
                                    user.info.role[user.info.role.length-1] !== 3 ? (
                                        <div className='top'>
                                            <AdminPanelSettingsOutlinedIcon />
                                            <Link className='link' to='/admin'>Quản lí</Link>
                                        </div>
                                    ) : <></>
                                }
                                <div className='bottom'>

                                    {
                                        user.info.role[user.info.role.length-1] === 3 ? <>
                                            <div className="item">
                                                <ReceiptLongOutlinedIcon />
                                                <Link className='link' to='/user/purchase'>Quản lí đơn hàng</Link>
                                            </div>
                                        </> : <></>
                                    }
                                    <div className="item">
                                        <SettingsOutlinedIcon />
                                        <Link className='link' to='/user/setting'>Cài đặt</Link>
                                    </div>
                                    <div className="item">
                                        <ExitToAppOutlinedIcon />
                                        <Link className='link' onClick={handleLogout}>Logout</Link>
                                    </div>
                                </div>
                            </>
                        )}
                </div>
            </Popover >
        </>
    )
}

export default UserBox
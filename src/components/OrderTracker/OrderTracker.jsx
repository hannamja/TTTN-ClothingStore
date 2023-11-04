import React from 'react'
import './OrderTracker.scss'
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Cancel } from '@mui/icons-material';
const OrderTracker = ({ data }) => {
    return (
        <div className='orderTracker'>
            {
                data.chitietTrangThaiDTO.trangthai.matthd == 6 ?
                    <div className={`step ${data.chitietTrangThaiDTO.trangthai.matthd == 6 ? 'canceled' : ''}`}>
                        <div className="step-icon-wrap">
                            <div className="step-icon">
                                <Cancel />
                            </div>
                        </div>
                        <span className='step-title'>Canceled</span>
                    </div> :
                    <>
                        <div className={`step ${data.chitietTrangThaiDTO.trangthai.matthd >= 3 ? 'completed' : ''}`}>
                            <div className="step-icon-wrap">
                                <div className="step-icon">
                                    <PlaylistAddCheckOutlinedIcon />
                                </div>
                            </div>
                            <span className='step-title'>Order Confirmed</span>
                        </div>
                        <div className={`step ${data.chitietTrangThaiDTO.trangthai.matthd >= 4 ? 'completed' : ''}`}>
                            <div className="step-icon-wrap">
                                <div className="step-icon">
                                    <LocalShippingOutlinedIcon />
                                </div>
                            </div>
                            <span className='step-title'>Order Dispatched</span>
                        </div>
                        <div className={`step ${data.chitietTrangThaiDTO.trangthai.matthd === 5 ? 'completed' : ''}`}>
                            <div className="step-icon-wrap">
                                <div className="step-icon">
                                    <TaskAltOutlinedIcon />
                                </div>
                            </div>
                            <span className='step-title'>Order Delivered</span>
                        </div>
                    </>
            }
        </div>
    )
}

export default OrderTracker
import React from 'react'
import './OrderTracker.scss'
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
const OrderTracker = () => {
    return (
        <div className='orderTracker'>
            <div className="step completed">
                <div className="step-icon-wrap">
                    <div className="step-icon">
                        <PlaylistAddCheckOutlinedIcon />
                    </div>
                </div>
                <span className='step-title'>Order Confirmed</span>
            </div>
            <div className="step completed">
                <div className="step-icon-wrap">
                    <div className="step-icon">
                        <HourglassTopOutlinedIcon />
                    </div>
                </div>
                <span className='step-title'>Processing Order</span>
            </div>
            <div className="step">
                <div className="step-icon-wrap">
                    <div className="step-icon">
                        <VerifiedOutlinedIcon />
                    </div>
                </div>
                <span className='step-title'>Quality checked</span>
            </div>
            <div className="step">
                <div className="step-icon-wrap">
                    <div className="step-icon">
                        <LocalShippingOutlinedIcon />
                    </div>
                </div>
                <span className='step-title'>Order Dispatched</span>
            </div>
            <div className="step">
                <div className="step-icon-wrap">
                    <div className="step-icon">
                        <TaskAltOutlinedIcon />
                    </div>
                </div>
                <span className='step-title'>Order Delivered</span>
            </div>


        </div>
    )
}

export default OrderTracker
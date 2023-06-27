import React from 'react'
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Button } from '@mui/material';
import HistoryCard from '../HistoryCard/HistoryCard';
import './HistoryList.scss'
const HistoryList = () => {
    return (
        <div className='historyList'>
            <div className="top">
                <LocalShippingOutlinedIcon />
                <span className='step'>Đơn hàng đã được giao thành công</span>
                <span> | </span>
                <span className='status'>HOÀN THÀNH</span>
            </div>
            <div className="center">
                <HistoryCard />
                <HistoryCard />
                <HistoryCard />
                <HistoryCard />
            </div>
            <div className="bottom">
                <span className='rating'>Không có đánh giá</span>
                <Button variant="contained">Mua lại</Button>
            </div>
        </div>
    )
}

export default HistoryList
import React from 'react'
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Button } from '@mui/material';
import HistoryCard from '../HistoryCard/HistoryCard';
import './HistoryList.scss'
const HistoryList = ({ data }) => {
    return (
        <div className='historyList'>
            <div className="top">
                <LocalShippingOutlinedIcon />

                <span className='step'>
                    {data.chitietTrangThaiDTO.trangthai.matthd < 3 ? 'Đang đợi duyệt' : ''}
                    {data.chitietTrangThaiDTO.trangthai.matthd === 3 ? 'Đã duyệt' : ''}
                    {data.chitietTrangThaiDTO.trangthai.matthd === 4 ? 'Đang giao' : ''}
                    {data.chitietTrangThaiDTO.trangthai.matthd === 5 ? 'Đã giao' : ''}
                </span>
                {
                    data.chitietTrangThaiDTO.trangthai.matthd === 5 ?
                        <><span> | </span>
                            <span className='status'>HOÀN THÀNH</span></>
                        : <></>
                }
            </div>
            <div className="center">
                {
                    data.chitietHoadonDTO.map(i => <HistoryCard data={i} />)
                }
            </div>
            <div className="bottom">
                <Button variant="contained">Mua lại</Button>
            </div>
        </div >
    )
}

export default HistoryList
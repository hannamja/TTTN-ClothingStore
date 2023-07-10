import { VerifiedOutlined } from '@mui/icons-material'
import { Rating } from '@mui/material'
import React from 'react'
import './RatingComment.scss'
const RatingComment = () => {
    return (
        <div className='rtComment'>
            <div className="top">
                <span className='name'>Nguyễn Văn A</span>
                <div className="verification"><VerifiedOutlined style={{ color: 'lime' }}></VerifiedOutlined> Đã mua tại @Hukistore</div>
            </div>
            <div className="center">
                <Rating value={5} readOnly></Rating>
            </div>
            <div className="bottom">
                <span className='comment'>
                    Rất đẹp!
                </span>
            </div>
        </div>
    )
}

export default RatingComment
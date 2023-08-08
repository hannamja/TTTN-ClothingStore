import { VerifiedOutlined } from '@mui/icons-material'
import { Rating } from '@mui/material'
import React from 'react'
import './RatingComment.scss'
const RatingComment = ({comment}) => {
    return (
        <div className='rtComment'>
            <div className="top">
                <span className='name'>{comment.taikhoanDTO.email}</span>
                <div className="verification">{comment.ngaybl}</div>
            </div>
            <div className="bottom">
                <span className='comment'>
                    {
                        comment.noidung
                    }
                </span>
            </div>
        </div>
    )
}

export default RatingComment
import React from 'react'
import RatingComment from '../RatingComment/RatingComment'
import './RatingSection.scss'
import { Button } from '@mui/material'
const RatingSection = () => {
    return (
        <div className='rating'>
            <h1>Đánh giá quần áo</h1>
            <div className="comments">
                <RatingComment></RatingComment>
                <RatingComment></RatingComment>
                <RatingComment></RatingComment>
                <RatingComment></RatingComment>
            </div>
            <div className="btns">
                <Button>Xem tất cả</Button>
                <Button>Viết đánh giá</Button>
            </div>
        </div>
    )
}

export default RatingSection
import React, { useState } from 'react'
import RatingComment from '../RatingComment/RatingComment'
import './RatingSection.scss'
import { Button, Rating, TextField } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NOT_FULL_FIELD = 'Mời bạn nhập bình luận!'
const NOT_CHOOSE_RATING = 'Mời bạn chọn đánh giá!'
const RatingSection = ({ data, isBuy }) => {
    const [isNotLogined, setIsNotLogined] = useState(false)
    const [open, setOpen] = useState(false)
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)
    const [notFullField, setNotFullField] = useState(false)
    const [notChooseRating, setNotChooseRating] = useState(false)
    const user = useSelector(state => state.user)
    const handleComment = () => {
        if (Object.keys(user).length === 0) setIsNotLogined(true)
        setOpen(!open)
    }

    const handlePost = () => {
        if (comment == '') {
            setNotFullField(true)
            return
        }
        else {
            setNotFullField(false)
        }
        const commentPost = {
            'ngaybl': new Date(),
            'mathangDTO': {
                'mamh': data.mamh
            },
            'taikhoanDTO': {
                'matk': user.matk
            },
            'noidung': comment
        }
        fetch('http://localhost:8081/api/binhluan', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(commentPost)
        }).then(data => data.json()).then(data => console.log(data))
    }
    const handleRating = () => {
        if (rating == 0) {
            setNotChooseRating(true)
            return
        }
        else {
            setNotChooseRating(false)
        }
        const commentPost = {
            'ngaybl': new Date(),
            'mathangDTO': {
                'mamh': data.mamh
            },
            'taikhoanDTO': {
                'matk': user.matk
            },
            'number': rating
        }
        fetch('http://localhost:8081/api/danhgia', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(commentPost)
        }).then(data => data.json()).then(data => console.log(data))
    }
    return (
        <div className='rating'>
            {
                data.danhgias === null ? <></> : <Rating value={data.danhgias.reduce((total, cur) => total + cur.number, 0) / data.danhgias.length} readOnly></Rating>
            }
            <div>
                {

                    data.danhgias.filter(i => i.taikhoanDTO.matk === user.matk).length === 0 ? isBuy ?
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span>Mời bạn đánh giá: </span>
                            {notChooseRating ? NOT_CHOOSE_RATING : ''}
                            <Rating onChange={(e) => setRating(e.target.value)} value={rating}></Rating>
                            {
                                rating > 0 ? <Button onClick={handleRating} variant='outlined'>Đánh giá</Button> : <></>
                            }
                        </div>
                        :
                        <></> :
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span>Bạn đã đánh giá: </span>
                            <Rating value={data.danhgias.filter(i => i.taikhoanDTO.matk === user.matk)[0].number} readOnly></Rating>
                        </div>


                }
            </div>
            <h1>Bình luận</h1>
            <div className="comments">
                {
                    data.binhluans === null ? <></>
                        : data.binhluans.map(i => <RatingComment comment={i}></RatingComment>)

                }
            </div>
            <div className="btns">
                <Button>Xem tất cả</Button>
                <Button onClick={handleComment}>Viết đánh giá</Button>
                {
                    isNotLogined ? <Navigate to={'/signin'}></Navigate> : <></>
                }

            </div>
            <div>
                {
                    open ?
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            {notFullField ? NOT_FULL_FIELD : ''}
                            <TextField id="outlined-basic" label="Nhập bình luận của bạn" variant="outlined" onChange={(e) => setComment(e.target.value)} />
                            <Button onClick={handlePost} variant='outlined'>Bình luận</Button>
                        </div>
                        : <></>
                }
            </div>
        </div>
    )
}

export default RatingSection
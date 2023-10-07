import React from 'react'
import './HistoryCard.scss'
const HistoryCard = ({ data }) => {
  return (
    <div className='historyCard'>
      <div className="item">
        <div className='itemImg'>
          <img src={data.chitietMathangDTO.mathangDTO.hinhanhDTOs.length === 0 ? '' : data.chitietMathangDTO.mathangDTO.hinhanhDTOs[0].duongdan}></img>
        </div>
        <div className="itemDetail">
          <span className='itemName'>{data.chitietMathangDTO.mathangDTO.tenmh}</span>
          <span className='itemSize'>{data.chitietMathangDTO.color} - {data.chitietMathangDTO.size}</span>
          <span className='total'>x{data.soluong}</span>
        </div>
      </div>
      <div className="price">
        <span className='itemPrice'>{data.gia*data.soluong}</span>
      </div>
    </div>
  )
}

export default HistoryCard
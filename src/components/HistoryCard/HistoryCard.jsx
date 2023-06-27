import React from 'react'
import './HistoryCard.scss'
const HistoryCard = () => {
  return (
    <div className='historyCard'>
      <div className="item">
        <div className='itemImg'>
          <img src='https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></img>
        </div>
        <div className="itemDetail">
          <span className='itemName'>Name</span>
          <span className='itemSize'>S</span>
          <span className='total'>x1</span>
        </div>
      </div>
      <div className="price">
        <span className='itemPrice'>199.000</span>
      </div>
    </div>
  )
}

export default HistoryCard
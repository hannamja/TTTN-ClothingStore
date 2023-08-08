import React, { useEffect, useState } from 'react'
import OrderTracker from '../../components/OrderTracker/OrderTracker'
import './OrderDetail.scss'
import { json, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HistoryList from '../../components/HistoryList/HistoryList'
import HistoryCard from '../../components/HistoryCard/HistoryCard'
import { Button } from '@mui/material'
const OrderDetails = () => {
  const user = useSelector(state => state.user)
  const { id } = useParams()

  const [hoadon, setHoadon] = useState(null)
  const handelCancel = async () => {
    const res = await fetch('http://localhost:8081/api/hoadon/cancel', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + user.token
      },
      body: JSON.stringify(hoadon)
    })
    const data = await res.json()
  }
  useEffect(() => {

    const fetchData = async () => {
      const res = await fetch('http://localhost:8081/api/hoadon/' + id, {
        headers: {
          'Authorization': 'Bearer ' + user.token
        }
      })
      const data = await res.json()
      setHoadon(data)
    }
    fetchData()
  }, [])
  return (
    <div className='orderDetails'>

      {
        hoadon === null ? <></> : <>
          <OrderTracker data={hoadon} />
          {
            hoadon.chitietHoadonDTO.map(i => <HistoryCard data={i} />)
          }
        </>
      }
      {
        hoadon === null ? <></> : hoadon.chitietTrangThaiDTO.trangthai.matthd < 3 ?
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 5 }}>
            <Button onClick={handelCancel} variant="outlined" color="error">
              Hủy đơn
            </Button>
          </div>
          : <></>
      }
    </div>
  )
}

export default OrderDetails
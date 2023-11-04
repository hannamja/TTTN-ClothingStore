import React, { useEffect, useState } from 'react'
import OrderTracker from '../../components/OrderTracker/OrderTracker'
import './OrderDetail.scss'
import { json, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HistoryCard from '../../components/HistoryCard/HistoryCard'
import { Button } from '@mui/material'
import AlertMessage from '../../components/AlertMessage'

const initialMessage = {
  content: "",
  type: "",
};
const OrderDetails = () => {
  const user = useSelector(state => state.user)
  const { id } = useParams()

  const [hoadon, setHoadon] = useState(null)
  const [message, setMessage] = useState(initialMessage);
  const handelCancel = async () => {
    if (window.confirm('Bạn có muốn hủy hóa đơn ?')) {
      const res = await fetch('http://localhost:8081/api/hoadon/cancel', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + user.token
        },
        body: JSON.stringify(hoadon)
      })
      const data = await res.json()
      if (data.errCode == 'BILL_CANCELED_SUCCESS') {
        setMessage({ content: "Hủy đơn thành công!", type: "success" })
        window.location.reload()
      }
      else {
        setMessage({ content: "Lỗi!", type: "error" })
      }
    }

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
      <AlertMessage message={message} setMessage={setMessage} />
    </div>
  )
}

export default OrderDetails
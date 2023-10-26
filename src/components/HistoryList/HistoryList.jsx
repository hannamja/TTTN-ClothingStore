import React from 'react'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { Button } from '@mui/material';
import HistoryCard from '../HistoryCard/HistoryCard';
import './HistoryList.scss'
import { toVND } from '../../utilities/helpers';
const HistoryList = ({ data, type }) => {
    console.log(data);
    const customer = data.khachhang || {};
    return (
      <div className="historyList">
            <div className="top">
                <LocalShippingOutlinedIcon />

                <span className="step">
                    {data.chitietTrangThaiDTO.trangthai.matthd < 3
                        ? "Đang đợi duyệt"
                        : ""}
                    {data.chitietTrangThaiDTO.trangthai.matthd === 3 ? "Đã duyệt" : ""}
                    {data.chitietTrangThaiDTO.trangthai.matthd === 4 ? "Đang giao" : ""}
                    {data.chitietTrangThaiDTO.trangthai.matthd === 5 ? "Đã giao" : ""}
                    {data.chitietTrangThaiDTO.trangthai.matthd === 6 ? "Đã hủy" : ""}
                </span>
                {data.chitietTrangThaiDTO.trangthai.matthd === 5 ? (
                    <>
                        <span> | </span>
                        <span className="status">HOÀN THÀNH</span>
                    </>
                ) : (
                    <></>
                )}
            </div>
            <div className='info'>
                <div>
                    <span>Khách hàng: </span>
                    <span>{customer.hotenkh || "Không tìm thấy họ tên!"}</span>
                </div>
                <div>
                    <span>Số điện thoại: </span>
                    <span>{customer.sdt || "Không tìm thấy số điện thoại!"}</span>
                </div>
                <div>
                    <span>Địa chỉ: </span>
                    <span>{data.diachi || "Không tìm thấy địa chỉ!"}</span>
                </div>
                <div>
                    <span>Thanh toán bằng: </span>
                    <span>{data.chitietTrangThaiDTO.trangthai?.matthd === 2 ? "Chuyển khoản" : "Tiền mặt"}</span>
                </div>
            </div>
        <div className="center">
          {data.chitietHoadonDTO.map((e, i) => (
            <HistoryCard key={i} data={e} />
          ))}
        </div>
        <div className='bottom'>
            <div>
                <span>Tổng tiền: </span>
                <span>{toVND(data?.tongtien || 0)}</span>
            </div>
            <div>
                <span>Ngày đặt: </span>
                <span>{data?.ngaytao}</span>
            </div>
        </div>
        {type !== "admin" ? (
          <div className="action">
            <Button variant="contained">Mua lại</Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
}

export default HistoryList
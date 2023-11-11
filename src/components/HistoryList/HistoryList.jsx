import React from 'react'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { Button } from '@mui/material';
import HistoryCard from '../HistoryCard/HistoryCard';
import './HistoryList.scss'
import { Link, useNavigate } from "react-router-dom";
import { toVND } from '../../utilities/helpers';
import { addToCart } from '../../redux/cartReducer';
import { useDispatch, useSelector } from 'react-redux';
const HistoryList = ({ data, type }) => {
    const customer = data.khachhang || {};
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()

    const handleClick = () => {
        let isEnough = true
        let isActive = true
        data.chitietHoadonDTO.forEach(element => {
            if (parseInt(element.chitietMathangDTO.currentNumbeer) < parseInt(element.soluong)) {
                alert(`Mặt hàng có tên ${element.chitietMathangDTO.mathangDTO.tenmh} không còn đủ số lượng`)
                isEnough = false
                return
            }
            if (parseInt(element.chitietMathangDTO.mathangDTO.trangthai) == 1) {
                alert(`Mặt hàng có tên ${element.chitietMathangDTO.mathangDTO.tenmh} không còn kinh doanh`)
                isActive = false
                return
            }
        });
        if (!isEnough || !isActive) return
        data.chitietHoadonDTO.forEach(element => {
            dispatch(addToCart({
                idU: Object.keys(user) == 0 ? '' : user.info.khachhang.makh, item: {
                    id: element.chitietMathangDTO.mathangDTO.mamh,
                    title: element.chitietMathangDTO.mathangDTO.tenmh,
                    desc: element.chitietMathangDTO.mathangDTO.mota,
                    img: element.chitietMathangDTO.mathangDTO.hinhanhDTOs.length === 0 ? '' : element.chitietMathangDTO.mathangDTO.hinhanhDTOs[0].duongdan,
                    "hoadonDTO": {
                        "khachhang": null,
                        "nhanvien": null,
                        "ngaytao": null,
                        "tongtien": null,
                        "chitietTrangThaiDTO": null,
                        "chitietHoadonDTO": null
                    },
                    "chitietMathangDTO": element.chitietMathangDTO,
                    quantity: element.soluong,
                    price: element.chitietMathangDTO.mathangDTO.chitietKhuyenmaiDTO === null ? element.gia : (element.gia - element.gia * 0.01 * parseFloat(element.chitietMathangDTO.mathangDTO.chitietKhuyenmaiDTO?.mucgiam.slice(0, element.chitietMathangDTO.mathangDTO.chitietKhuyenmaiDTO?.length))) * element.soluong,
                }
            }))
        });
        navigate('/checkout')
    }
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
            {type === "admin" && <div className='info'>
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
            </div>}
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
            {user.info.khachhang && <div className="action">
                <Link className="link" to={`/user/purchase/order/${data.mahd}`}>
                    <Button variant="outlined">Xem chi tiết</Button>
                </Link>
            </div>}
            {type !== "admin" ? data.chitietTrangThaiDTO.trangthai.matthd === 5 ? (
                <div className="action">
                    <Button variant="contained" onClick={handleClick}>Mua lại</Button>
                </div>
            ) : <></> : (
                <></>
            )}
        </div>
    );
}

export default HistoryList
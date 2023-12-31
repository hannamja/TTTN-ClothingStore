import React, { useEffect, useState } from "react";
import "./Card.scss";
import { Link } from "react-router-dom";
import { handleMoney } from "../../utilities/handleMoney";
const Card = ({ item }) => {
  const [km, setKm] = useState(0)
  useEffect(() => {
    if (item.chitietKhuyenmaiDTO) {
      if (item.chitietKhuyenmaiDTO.mucgiam == '10%') setKm(0.1)
      if (item.chitietKhuyenmaiDTO.mucgiam == '20%') setKm(0.2)
      if (item.chitietKhuyenmaiDTO.mucgiam == '30%') setKm(0.3)
      if (item.chitietKhuyenmaiDTO.mucgiam == '40%') setKm(0.4)
      if (item.chitietKhuyenmaiDTO.mucgiam == '50%') setKm(0.5)
      if (item.chitietKhuyenmaiDTO.mucgiam == '60%') setKm(0.6)
      if (item.chitietKhuyenmaiDTO.mucgiam == '70%') setKm(0.7)
      if (item.chitietKhuyenmaiDTO.mucgiam == '80%') setKm(0.8)
    }

  }, [])
  return (
    <Link className="link" to={`/product/${item.mamh}`}>
      <div className="card">
        <div className="image">
          <span>New Season</span>
          <img
            src={
              item?.hinhanhDTOs.length === 0 ? '' : item?.hinhanhDTOs[0]["duongdan"]
            }
            alt=""
            className="mainImg"
            onError={(e)=>{
              e.target.src = "/img/no-product.webp"
            }}
          />
          <img
            src={
              item?.hinhanhDTOs.length === 0 ? '' : item?.hinhanhDTOs[0]["duongdan"]
            }
            alt=""
            className="secondImg"
            onError={(e)=>{
              e.target.src = "/img/no-product.webp"
            }}
          />
        </div>
        <h2>{item?.tenmh}</h2>
        <div className="prices">
          <h3 className="km" style={{ display: item?.chitietKhuyenmaiDTO === null ? 'none' : 'inline' }}>{item?.chitietKhuyenmaiDTO === null ? '' : `$${item.gia}`}</h3>
          <h3>{handleMoney(item?.gia - item.gia * km)} VND</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;

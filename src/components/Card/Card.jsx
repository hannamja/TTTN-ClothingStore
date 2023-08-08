import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

const Card = ({ item }) => {

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
          />
          <img
            src={
              item?.hinhanhDTOs.length === 0 ? '' : item?.hinhanhDTOs[0]["duongdan"]
            }
            alt=""
            className="secondImg"
          />
        </div>
        <h2>{item?.tenmh}</h2>
        <div className="prices">
          <h3>{item?.chitietKhuyenmaiDTO === null ? '' : `$${item.gia - item.gia * 0.1}`}</h3>
          <h3>${item?.gia}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;

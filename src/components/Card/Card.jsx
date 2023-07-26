import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  console.log(item.hinhanhDTOs[0]["duongdan"]);
  return (
    <Link className="link" to={`/product/${item.mamh}`}>
      <div className="card">
        <div className="image">
          <span>New Season</span>
          <img
            src={
              item?.hinhanhDTOs[0]["duongdan"]
            }
            alt=""
            className="mainImg"
          />
          <img
            src={
              item?.hinhanhDTOs[0]["duongdan"]
            }
            alt=""
            className="secondImg"
          />
        </div>
        <h2>{item?.tenmh}</h2>
        <div className="prices">
          <h3>${item?.gia + 1000}</h3>
          <h3>${item?.gia}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;

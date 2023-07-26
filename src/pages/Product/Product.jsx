import React from "react";
import { useState } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import RatingSection from "../../components/RatingSection/RatingSection";

const Product = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const { data, loading, error } = useFetch(`/mathang/${id}`);
  return (
    <div className="product">
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="left">
            <div className="top">
              <div className="images">
                <img
                  src={
                    data?.hinhanhDTOs[0].duongdan
                  }
                  alt=""
                  onClick={(e) => setSelectedImg(0)}
                />
                <img
                  src={
                    data?.hinhanhDTOs[0].duongdan
                  }
                  alt=""
                  onClick={(e) => setSelectedImg(0)}
                />
              </div>
              <div className="mainImg">
                <img
                  src={
                    data?.hinhanhDTOs[selectedImg].duongdan
                  }
                  alt=""
                />

              </div>
            </div>
            <div className="bottom">
              <RatingSection />
            </div>
          </div>
          <div className="right">
            <h1>{data?.tenmh}</h1>
            <span className="price">${data?.gia}</span>
            <p>{data?.mota}</p>
            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              {quantity}
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
            <button
              className="add"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: data.mamh,
                    title: data.tenmh,
                    desc: data.mota,
                    price: data.gia,
                    img: data.hinhanhDTOs[0].duongdan,
                    quantity,
                  })
                )
              }
            >
              <AddShoppingCartIcon /> ADD TO CART
            </button>
            <div className="links">
              <div className="item">
                <FavoriteBorderIcon /> ADD TO WISH LIST
              </div>
              <div className="item">
                <BalanceIcon /> ADD TO COMPARE
              </div>
            </div>
            <div className="info">
              <span>Vendor: Polo</span>
              <span>Product Type: T-Shirt</span>
              <span>Tag: T-Shirt, Women, Top</span>
            </div>
            <hr />
            <div className="info">
              <span>DESCRIPTION</span>
              <hr />
              <span>ADDITIONAL INFORMATION</span>
              <hr />
              <span>FAQ</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;

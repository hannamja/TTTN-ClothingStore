import React, { useEffect } from "react";
import { useState } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import RatingSection from "../../components/RatingSection/RatingSection";

const PRODUCT_NOT_ENOUGH = 'Sản phẩm không đủ'
const BELOW_1_AMOUNT = 'Chọn ít nhất 1 sản phẩm'
const Product = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [idCtmh, setIdCtmh] = React.useState(null);

  const handleChange = (event) => {
    setIdCtmh(event.target.value);
    console.log(event.target.value)
    setQuantity(1);
  };

  const dispatch = useDispatch();
  const { data, loading, error } = useFetch(`/mathang/${id}`);
  const user = useSelector(state => state.user)
  const [hds, setHds] = useState(null)
  const [notEnough, setNotEnough] = useState(false)
  const [below1, setBelow1] = useState(false)
  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      if (user.info.khachhang !== null) {
        fetch('http://localhost:8081/api/hoadonOfUser/' + user.info.khachhang.makh, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + user.token
          }
        }).then(data => data.json()).then(data => { 
          setHds(data)
          console.log(data)
        })
      }
    }
  }, [])
  const [km, setKm] = useState(0)
  useEffect(() => {
    if (data) {
      if (data.chitietKhuyenmaiDTO) {
        setKm(data.chitietKhuyenmaiDTO.mucgiam)
      }

    }
  }, [loading])

  const checkBuy = (item) => {
  
    const filtered = hds.filter(i => i.chitietHoadonDTO.filter(ii => ii.chitietMathangDTO.mathangDTO.mamh === item) !== 0)

    if (filtered.length > 0) {
      if (filtered[0].chitietTrangThaiDTO.trangthai.matthd === 5) return true
    }
    return false
  }
  return (
    <div className="product">
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="left">
            <div className="top">
              <div className="images">
                {
                  data?.hinhanhDTOs.length === 0 ? <></> :
                    data?.hinhanhDTOs.map((ha, idx) => <img
                      src={
                        ha.duongdan
                      }
                      alt=""
                      onClick={(e) => setSelectedImg(idx)}
                    />
                    )
                }

              </div>
              <div className="mainImg">
                <img
                  src={
                    data?.hinhanhDTOs.length === 0 ? '' : data?.hinhanhDTOs[selectedImg].duongdan
                  }
                  alt=""
                />

              </div>
            </div>
            <div className="bottom">
              {
                hds === null ? <RatingSection data={data} isBuy={false}></RatingSection> : <RatingSection data={data} isBuy={checkBuy(id)} />
              }
            </div>
          </div>
          <div className="right">
            <h1>{data?.tenmh}</h1>
            {
              data?.chitietKhuyenmaiDTO === null ? '' : <span className="price-1">{`$${data.gia}`}</span>
            }
            <span className="price">${data?.gia - data.gia * km}</span>
            <p>{data?.mota}</p>
            <Box sx={{ width: 150 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Phân loại đồ</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={idCtmh}
                  label="Phân loại đồ"
                  onChange={handleChange}
                >
                  {
                    data.ctMathangs.map((ct, index) => (
                      <MenuItem value={index}>{ct.colorDTO.tenmau} - {ct.sizeDTO.tensize}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Box>
            {Object.keys(user).length === 0 ? <>
              {notEnough ? PRODUCT_NOT_ENOUGH : ''}
              {below1 ? BELOW_1_AMOUNT : ''}
              <div className="quantity">
                <button
                  onClick={() => {
                    setNotEnough(false)
                    quantity === 1 ? setBelow1(true) :
                      setQuantity((prev) => (prev - 1))
                  }
                  }
                  disabled={idCtmh === null}
                >
                  -
                </button>
                {quantity}
                <button onClick={
                  () => {
                    setBelow1(false)
                    data.ctMathangs[idCtmh].currentNumbeer <= quantity ? setNotEnough(true) : setQuantity((prev) => prev + 1)
                  }
                } disabled={idCtmh === null}>+</button>
              </div>
              {
                data.ctMathangs.length === 0 ?
                  <button
                    disabled={true}
                  >
                    <AddShoppingCartIcon /> OUT OF STOCK
                  </button>
                  : <button
                    className="add"
                    disabled={idCtmh === null}
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: data.mamh,
                          title: data.tenmh,
                          desc: data.mota,
                          img: data.hinhanhDTOs.length === 0 ? '' : data.hinhanhDTOs[0].duongdan,
                          "hoadonDTO": {
                            "khachhang": null,
                            "nhanvien": null,
                            "ngaytao": null,
                            "tongtien": null,
                            "chitietTrangThaiDTO": null,
                            "chitietHoadonDTO": null
                          },
                          "chitietMathangDTO": {
                            ...data.ctMathangs[idCtmh],
                            "mathangDTO": {
                              "mamh": data.mamh,
                              "chatlieuDTO": null,
                              "loaimhDTO": null,
                              "nhanhieuDTO": null,
                              "tenmh": data.tenmh,
                              "mota": null,
                              "trangthai": null,
                              "cachlam": null,
                              "phanloai": null,
                              "gia": null,
                              "hinhanhDTOs": null,
                              "ctMathangs": null
                            }
                          },
                          quantity,
                          price: data.chitietKhuyenmaiDTO === null ? data.gia : (data.gia - data.gia * km) * quantity,
                        })
                      )
                    }
                  >
                    <AddShoppingCartIcon /> ADD TO CART
                  </button>
              }
              <div className="links">
                <div className="item">
                  <FavoriteBorderIcon /> ADD TO WISH LIST
                </div>
                <div className="item">
                  <BalanceIcon /> ADD TO COMPARE
                </div>
              </div>
            </> :
              user.info.role[user.info.role.length - 1] === 'QU004' ?
                <>
                  {notEnough ? PRODUCT_NOT_ENOUGH : ''}
                  {below1 ? BELOW_1_AMOUNT : ''}
                  <div className="quantity">
                    <button
                      onClick={() => {
                        setNotEnough(false)
                        quantity === 1 ? setBelow1(true) :
                          setQuantity((prev) => (prev - 1))
                      }
                      }
                      disabled={idCtmh === null}
                    >
                      -
                    </button>
                    {quantity}
                    <button onClick={
                      () => {
                        console.log(data.ctMathangs[idCtmh])
                        setBelow1(false)
                        data.ctMathangs[idCtmh].currentNumbeer <= quantity ? setNotEnough(true) : setQuantity((prev) => prev + 1)
                      }
                    } disabled={idCtmh === null}>+</button>
                  </div>
                  {
                    data.ctMathangs.length === 0 ?
                      <button
                        disabled={true}
                        className="add"
                      >
                        <AddShoppingCartIcon /> OUT OF STOCK
                      </button>
                      : <button
                        disabled={idCtmh === null}
                        className="add"
                        onClick={() =>
                          dispatch(
                            addToCart({
                              id: data.mamh,
                              title: data.tenmh,
                              desc: data.mota,
                              img: data.hinhanhDTOs.length === 0 ? '' : data.hinhanhDTOs[0].duongdan,
                              "hoadonDTO": {
                                "khachhang": null,
                                "nhanvien": null,
                                "ngaytao": null,
                                "tongtien": null,
                                "chitietTrangThaiDTO": null,
                                "chitietHoadonDTO": null
                              },
                              "chitietMathangDTO": {
                                ...data.ctMathangs[idCtmh],
                                "mathangDTO": {
                                  "mamh": data.mamh,
                                  "chatlieuDTO": null,
                                  "loaimhDTO": null,
                                  "nhanhieuDTO": null,
                                  "tenmh": data.tenmh,
                                  "mota": null,
                                  "trangthai": null,
                                  "cachlam": null,
                                  "phanloai": null,
                                  "gia": null,
                                  "hinhanhDTOs": null,
                                  "ctMathangs": null
                                }
                              },
                              quantity,
                              price: data.chitietKhuyenmaiDTO === null ? data.gia : (data.gia - data.gia * km) * quantity,
                            })
                          )
                        }
                      >
                        <AddShoppingCartIcon /> ADD TO CART
                      </button>
                  }
                  <div className="links">
                    <div className="item">
                      <FavoriteBorderIcon /> ADD TO WISH LIST
                    </div>
                    <div className="item">
                      <BalanceIcon /> ADD TO COMPARE
                    </div>
                  </div>
                </>
                : <></>
            }
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

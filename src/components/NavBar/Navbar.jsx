import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import "./NavBar.scss"
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";
import SearchBox from "../SearchBox/SearchBox";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import UserBox from "../UserBox/UserBox";
const NavBar = () => {
  const [open, setOpen] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const products = useSelector((state) => state.cart.products);
  const user = useSelector(state => state.user)
  return (
    <>
      <div className="navbar">
        <div className="wrapper">
          <div className="left">
            <div className="item">
              <img src="/img/VN.jpg" alt="" width={25} height={20} />
              <KeyboardArrowDownIcon />
            </div>
            <div className="item">
              <span>VND</span>
              <KeyboardArrowDownIcon />
            </div>
            <div className="item">
              <Link className="link" to="/products/2">ÁO SƠ MI</Link>
            </div>
            <div className="item">
              <Link className="link" to="/products/5">QUẦN TÂY</Link>
            </div>
            <div className="item">
              <Link className="link" to="/products/1">ÁO THUN</Link>
            </div>
          </div>
          <div className="center">
            <Link className="link" to="/">HUKISTORE</Link>
          </div>
          <div className="right">
            <div className="item">
              <Link className="link" to="/">Homepage</Link>
            </div>
            <div className="item">
              <Link className="link" to="/">About</Link>
            </div>
            <div className="item">
              <Link className="link" to="/">Contact</Link>
            </div>
            <div className="item">
              <Link className="link" to="/">Stores</Link>
            </div>
            <div className="icons">
              <SearchIcon onClick={() => setOpenSearch(!openSearch)} />
              <div className="userIcon">
                <UserBox />
              </div>

              {
                Object.keys(user).length === 0 ? <>
                  <FavoriteBorderOutlinedIcon />
                  <div className="cartIcon" onClick={() => setOpen(!open)}>
                    <ShoppingCartOutlinedIcon />
                    <span>{products.length}</span>
                  </div>
                </> : user.info.role[user.info.role.length - 1] === 3 ? <>
                  <FavoriteBorderOutlinedIcon />
                  <div className="cartIcon" onClick={() => setOpen(!open)}>
                    <ShoppingCartOutlinedIcon />
                    <span>{products.length}</span>
                  </div>
                </> :
                  <></>
              }
            </div>
          </div>
        </div>
        {open && <Cart />}
      </div>
      {openSearch &&
        <div className="search">
          <SearchBox />
          <ClearOutlinedIcon onClick={() => setOpenSearch(!openSearch)} style={{ cursor: 'pointer' }} />
        </div>
      }

    </>

  );
};

export default NavBar;

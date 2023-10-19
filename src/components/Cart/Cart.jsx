import React from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";
import { removeItem, resetCart, add, minus } from "../../redux/cartReducer";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handleMoney } from "../../utilities/handleMoney";

const Cart = ({ open }) => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };

  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {products?.map((item) => (
        <div className="item" key={item.id}>
          <img src={item.img} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            <p>{item.desc?.substring(0, 100)}</p>
            <div className="price">
              {item.quantity} x ${handleMoney(item.price)}
            </div>
          </div>
          <div className="quantity">
            <button className="quantityBtn"
              onClick={() => dispatch(minus(item))}
            >
              -
            </button>
            {item.quantity}
            <button className="quantityBtn" onClick={() => dispatch(add(item))}>+</button>
            <DeleteOutlinedIcon
              className="delete"
              onClick={() => dispatch(removeItem(item.id))}
            />
          </div>
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>${handleMoney(totalPrice())}</span>
      </div>
      <Link className="link" to={Object.keys(user).length == 0 ? '/signin' : '/checkout'} onClick={() => { open(false) }}>
        <button className="checkoutBtn">PROCEED TO CHECKOUT</button>
      </Link>
      <span className="reset" onClick={() => dispatch(resetCart())}>
        Reset Cart
      </span>
    </div>
  );
};

export default Cart;

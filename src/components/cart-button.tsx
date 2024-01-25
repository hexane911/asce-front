import "./cart-button.css";
import cartIcon from "../assets/img/cart.svg";
import cartWhiteIcon from "../assets/img/cart-white.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TCartItem } from "../types";

const CartButton = () => {
  const cart = useSelector((state : {cart: TCartItem[]}) => state.cart)

  let items = cart.reduce((acc, el) => acc += el.quantity, 0);

  return (
    <Link to="/cart" className="cart-button button-like">
      <img src={cartIcon} alt="cart" className="cart-button__icon"></img>
      <p className="cart-button__title">Корзина</p>
      {!!items && <div className="cart-button__items">{items}</div>}
      <div className="cart-button__mobile">
        <img src={cartWhiteIcon} alt="" className="cart-button__mobile-icon" />
        {!!items && <div className="cart-button__mobile-items" />}
      </div>
    </Link>
  );
};

export default CartButton;

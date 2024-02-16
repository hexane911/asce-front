import "./item.in-cart.css";
import appleIcon from "../assets/img/apple-black.svg";
import colorIcon from "../assets/img/color-icon.svg";
import infoIcon from "../assets/img/info-gray.svg";
import { Link } from "react-router-dom";
import { numToPrice } from "../tools";
import { useState } from "react";
import classNames from "classnames";
import { useGetProductByIdQuery } from "../redux/products.api";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cart.slice";
import { TCartItem, TDevice } from "../types";
import ImageLoader from "./image-loader";

type Props = {
  id: number;
  disabled?: boolean;
  checked?: boolean;
  inOrder?: boolean;
  animationDelay?: number; 
};

const CartItem = ({ id, disabled, checked, inOrder, animationDelay }: Props) => {
  const cart = useSelector((state: { cart: TCartItem[] }) => state.cart);
  const [classname, setClassname] = useState("cart-item spawned")
  const [hidden, setHidden] = useState(true);
  const inCart =
    cart.find((el) => el.id === id)?.quantity || 0;
  const { data: product, isLoading } = useGetProductByIdQuery(id);

  const colorWords = product?.color.split(" ");

  const dispatch = useDispatch();

  if (!product && !isLoading) {
    return null;
  }

  if (product && !product.image_urls) {
    return null;
  }

  if (!inCart || !product) {
    return null;
  }

  let imgs = product?.image_urls || []

  return (
    <div className={classNames(classname, { disabled, inOrder })} style={{animationDelay: `${animationDelay || 0}ms`}} onAnimationEnd={() => setClassname("cart-item")}>
      <div
        className={classNames("cart-item__open", { hidden })}
        onClick={() => setHidden((s) => !s)}
      ></div>
      {!inOrder && (
        <div className="cart-item__tools">
          <DelIcon
            className={classNames("cart-item__delete")}
            onClick={() => {
              dispatch(removeFromCart({ id, deleteAll: true }))
            }}
          ></DelIcon>
        </div>
      )}
      <div className={classNames("cart-item__box", { rounded: hidden })}>
        <div className="cart-item__image-box">
        {imgs && <ImageLoader className="cart-item__image" src={imgs[0]} />}
        </div>
        <div className="cart-item__color">
          <img src={colorIcon} />
          <p className="cart-item__color-text">
            {colorWords && colorWords.length > 1 ? (
              <>
                {colorWords[0]} <b>{colorWords[1]}</b>
              </>
            ) : (
              <b>{product?.color}</b>
            )}
          </p>
        </div>
      </div>
      <div className={classNames("cart-item__content", { hidden })}>
        <div className="cart-item__airpods">
          <img src={appleIcon} />
          {product.device}
        </div>
        <Link to={`/products/${id}`} className="cart-item__title gradi">
          Mythical Case
        </Link>
        <p className="cart-item__delivery">
          <img src={infoIcon} />
          Отправка в течение 7 дней после покупки.
        </p>
        <div
          className={classNames("cart-item__buttons", { disabled, checked })}
        >
          <p className="cart-item__price gradi">
            {numToPrice(product?.price || 0)}
          </p>
          <div className="in-cart cart-item__in-cart">
            {!inOrder && (
              <>
                <div
                  className="in-cart__quan plus"
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: id,
                        price: product?.price,
                      })
                    )
                  }
                ></div>
                <div
                  className="in-cart__quan minus"
                  onClick={() =>
                    dispatch(
                      removeFromCart({
                        id: id
                      })
                    )
                  }
                ></div>
              </>
            )}
            <div className="in-cart__quantity">{inCart}шт.</div>
          </div>
        </div>
        <p className="cart-item__delivery mobile">
          <img src={infoIcon} />
          Отправка в течение 7 дней после покупки.
        </p>
      </div>
    </div>
  );
};

type IconProps = {
  onClick: any,
  className: any
}

const DelIcon = ({className, onClick} : IconProps) => {
  return <svg className={className} onClick={onClick} width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="del">
  <circle id="Ellipse 13" cx="19" cy="19" r="19" fill="#B3B3B3"/>
  <path id="Vector" d="M22.6369 13V11.5C22.6369 10.6727 21.9845 10 21.1823 10H16.8184C16.0162 10 15.3638 10.6727 15.3638 11.5V13H11V14.5H12.1957L13.4343 25.9982C13.5572 27.139 14.4896 28 15.6031 28H22.37C23.4835 28 24.4159 27.1397 24.5381 25.9982L25.7767 14.5H27V13H22.6369ZM16.8184 11.5H21.1823V13H16.8184V11.5ZM21.8783 22.4072L20.8499 23.4678L19.0004 21.5605L17.1508 23.4678L16.1224 22.4072L17.972 20.5L16.1224 18.5927L17.1508 17.5323L19.0004 19.4395L20.8499 17.5323L21.8783 18.5927L20.0288 20.5L21.8783 22.4072Z" fill="white"/>
  </g>
  </svg>
  
}

export default CartItem;

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

type Props = {
  id: number;
  disabled?: boolean;
  checked?: boolean;
  inOrder?: boolean;
};

const CartItem = ({ id, disabled, checked, inOrder }: Props) => {
  const cart = useSelector((state: { cart: TCartItem[] }) => state.cart);
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
    <div className={classNames("cart-item", { disabled, inOrder })}>
      <div
        className={classNames("cart-item__open", { hidden })}
        onClick={() => setHidden((s) => !s)}
      ></div>
      {!inOrder && (
        <div className="cart-item__tools">
          <div
            className={classNames("cart-item__delete")}
            onClick={() => {
              removeFromCart({ id: id, deleteAll: true });
            }}
          ></div>
        </div>
      )}
      <div className={classNames("cart-item__box", { rounded: hidden })}>
        {imgs && <img src={imgs[0]} alt="" className="cart-item__image" />}
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
                        id: id,
                        deleteAll: false,
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

export default CartItem;

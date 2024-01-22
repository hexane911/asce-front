import "./item.in-cart.css";
import appleIcon from "../assets/img/apple-black.svg";
import colorIcon from "../assets/img/color-icon.svg";
import infoIcon from "../assets/img/info-gray.svg";
import { Link } from "react-router-dom";
import { numToPrice } from "../tools";
import { useContext, useState } from "react";
import { FakeCartContext } from "../App";
import classNames from "classnames";
// import { useGetProductByIdQuery } from "../redux/products.api";
import { HARDCODE_PRODUCTS, IMG_PATH } from "../constants";

type Props = {
  id: number;
  // setOrder?: any;
  disabled?: boolean;
  checked?: boolean;
  device: "AirPods 3" | "AirPods Pro";
  inOrder?: boolean;
};

const CartItem = ({ id, disabled, checked, device, inOrder }: Props) => {
  const { cart, setCart } = useContext(FakeCartContext);
  const [hidden, setHidden] = useState(true);
  const inCart =
    cart.find((el) => el.id === id && el.device === device)?.quantity || 0;
  // const { data: product, isLoading } = useGetProductByIdQuery(id);

  const product = HARDCODE_PRODUCTS.find(el => el.id === id)

  const colorWords = product?.color.split(" ");

  const addToCart = () => {
    if (product) {
      setCart((c: any) => {
        let already = c.find(
          (el: any) => device == el.device && product.id === el.id
        );
        if (already) {
          let newOne = { ...already };
          newOne.quantity += 1;
          return [
            newOne,
            ...c.filter(
              (el: any) => device !== el.device || product.id !== el.id
            ),
          ];
        }
        let lastOrder = c.length ? [...c].sort((a, b) => a.order - b.order)[c.length -1].order : 0
        return [...c, { id: product.id, device: device, quantity: 1, order: ++lastOrder}];
      });
    }
  };

  const removeFromCart = (q = 1) => {
    if (product) {
      setCart((c: any) => {
        let already = c.find(
          (el: any) => device === el.device && product.id === el.id
        );
        let wOcurrent = [
          ...c.filter(
            (el: any) => el.device !== device || product.id !== el.id
          ),
        ];
        if (already.quantity) {
          return [{ ...already, quantity: already.quantity - q }, ...wOcurrent];
        }
      });
    }
  };


  if (!product) {
    return null;
  }

  if (product && !product.image_urls) {
    return null;
  }

  if (!inCart) {
    return null;
  }

  let imgs = product?.image_urls?.map((el) => IMG_PATH + el);

  return (
    <div className={classNames("cart-item", { disabled, inOrder })}>
      <div
        className={classNames("cart-item__open", { hidden })}
        onClick={() => setHidden((s) => !s)}
      ></div>
      <div className="cart-item__tools">
        {!inOrder && (
          <div
            className={classNames("cart-item__delete")}
            onClick={() => {
              // setOrder((ord: { id: number; device: string }[]) => {
              //   return ord.filter((el) => el.id != id && el.device !== device);
              // });
              removeFromCart(inCart);
            }}
          ></div>
        )}
      </div>
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
          {device}
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
                <div className="in-cart__quan plus" onClick={addToCart}></div>
                <div
                  className="in-cart__quan minus"
                  onClick={() => removeFromCart()}
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

import { useState } from "react";
import Path from "../path";
import "./cart.page.css";
import CartItem from "../item.in-cart";
import Button from "../button";
import cartIcon from "../../assets/img/cart-white.svg";
import CreateOrder from "../create.order";
import { useSelector } from "react-redux";
import { TCartItem } from "../../types";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: { cart: TCartItem[] }) => state.cart);
  const [step, setStep] = useState(0);

  const sorted = [...cart].sort((a, b) => a.id - b.id);

  const price = cart.reduce((acc, el) => (acc += el.quantity * el.price), 0);

  return (
    <section className="cart">
      <div className="wrapper cart__wrapper">
        <Path />
        {step === 0 ? (
          <div className="cart__list">
            {sorted.map((el, i) => (
              <CartItem key={i} animationDelay={i * 80} id={el.id} />
            ))}
            {!sorted.length && (
              <div className="cart__empty">
                <p className="cart__p-empty gradi">Корзина пуста</p>
                <Button variant="black" onClick={() => navigate("/#goods")}>
                  Добавить товары
                </Button>
              </div>
            )}
          </div>
        ) : (
          <CreateOrder stage={step} setStage={setStep} />
        )}
        {step === 0 && !!sorted.length && (
          <div className="cart__finals">
            <p className="cart__price">
              Итоговая стоимость: <span className="filler" />{" "}
              <span className="price">{price}₽</span>
            </p>
            <Button
              disabled={price === 0}
              className="cart__button"
              variant="black"
              onClick={() => setStep(1)}
            >
              {" "}
              <img src={cartIcon} /> Оформить заказ
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;

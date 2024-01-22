import { useContext, useEffect, useState } from "react";
import Path from "../path";
import "./cart.page.css";
import { FakeCartContext } from "../../App";
import CartItem from "../item.in-cart";
import Button from "../button";
import cartIcon from "../../assets/img/cart-white.svg";
import CreateOrder from "../create.order";
import { HARDCODE_PRODUCTS } from "../../constants";

const CartPage = () => {
  const { cart } = useContext(FakeCartContext);

  const [finalPrice, setFinalPrice] = useState(0);
  const [step, setStep] = useState(0);

  // const { data: products, isLoading } = useGetProductsQuery();

  useEffect(() => {
    if (HARDCODE_PRODUCTS && cart.length) {
      const idsWprices = HARDCODE_PRODUCTS.map((el) => ({ id: el.id, price: el.price }));
      const price = cart.reduce((acc, el) => {
        let price = idsWprices.find((pr) => pr.id === el.id)?.price;
        if (price) {
          return (acc += el.quantity * price);
        }
        return (acc += 0);
      }, 0);
      setFinalPrice(price);
    }

    
  }, [cart, HARDCODE_PRODUCTS]);

  const sorted = [...cart].sort((a, b) => a.order - b.order);

  return (
    <section className="cart">
      <div className="wrapper cart__wrapper">
        <Path />
        {step === 0 ? (
            <div className="cart__list">
              {sorted.map((el) => (
                <CartItem device={el.device} id={el.id} />
              ))}
              {!sorted.length && (
                <div className="cart__empty">Корзина пуста</div>
              )}
            </div>
        ) : <CreateOrder stage={step} setStage={setStep} />}
        {step === 0 && <div className="cart__finals">
          <p className="cart__price">
            Итоговая стоимость: <span className="filler" />{" "}
            <span className="price">{finalPrice}₽</span>
          </p>
          <Button
            disabled={finalPrice === 0}
            className="cart__button"
            variant="black"
            onClick={() => setStep(1)}
          >
            {" "}
            <img src={cartIcon} /> Оформить заказ
          </Button>
        </div>}
      </div>
    </section>
  );
};

export default CartPage;

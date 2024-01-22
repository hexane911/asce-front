import { useContext, useEffect, useState } from "react";
import Path from "../path";
import "./cart.page.css";
import { FakeCartContext } from "../../App";
import CartItem from "../item.in-cart";
import Button from "../button";
import cartIcon from "../../assets/img/cart-white.svg";
import { useGetProductsQuery } from "../../redux/products.api";

const CartPage = () => {
  const { cart, setCart } = useContext(FakeCartContext);
  const [finalPrice, setFinalPrice] = useState(0)

  // const [order, setOrder] = useState<
  //   { id: number; quantity: number; price: number; device: "AirPods 3" | "AirPods Pro" }[]
  // >([]);

  // const finalPrice = order.reduce(
  //   (acc, el) => (acc += el.price * el.quantity),
  //   0
  // );

  const {data: products, isLoading} = useGetProductsQuery()

  useEffect(() => {
    if (products && cart.length) {
      const idsWprices = products.map(el => ({id: el.id, price: el.price}))
      const price = idsWprices.reduce((acc, el) => {
        let itemInCart = cart.find(ci => ci.id === el.id)
        if (itemInCart) {
          return acc += el.price * itemInCart.quantity
        } 
        return acc += 0
      }, 0)
      setFinalPrice(price)
    }

    if (!isLoading && !products) {
      
    }
  }, [cart, products])



  return (
    <section className="cart">
      <div className="wrapper cart__wrapper">
        <Path />
        <div className="cart__list">
          {cart.map((el) => (
            <CartItem
              device={el.device}
              id={el.id}
              // checked={!!order.find((oi) => oi.id === el.id && oi.device === el.device)}
              // disabled={!order.find((oi) => oi.id === el.id && oi.device === el.device)}
              // setOrder={setOrder}
            />
          ))}
          {!cart.length && <div className="cart__empty">Корзина пуста</div>}
        </div>
        <div className="cart__finals">
          <p className="cart__price">
            Итоговая стоимость: <span className="filler" />{" "}
            <span className="price">{finalPrice}₽</span>
          </p>
          <Button
            disabled={finalPrice === 0}
            className="cart__button"
            variant="black"
          >
            {" "}
            <img src={cartIcon} /> Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;

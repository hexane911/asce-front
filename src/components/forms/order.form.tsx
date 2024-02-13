import "./order.form.css";
import "./formcommon.css";
import { TBuyerForm, TCartItem, TDeliveryFinal, TPromoCode } from "../../types";
import { Area } from "./input";
import { useForm } from "react-hook-form";
import Promocode from "./promocode";
import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../redux/products.api";
import classNames from "classnames";
import Button from "../button";
import { formatLessThanRuble, formatTelephone, useGetDeliveryPrice } from "../../tools";
import { useSelector } from "react-redux";
import { useCalculatePriceSdekQuery } from "../../redux/sdek.api";
import { skip } from "node:test";
import Loader from "../loader";

type Props = {
  setStage: (arg: number) => void;
  currentBuyer?: ({ id: number } & TBuyerForm) | null;
  delivery: TDeliveryFinal;
};

const OrderForm = ({ currentBuyer, setStage, delivery }: Props) => {
  const [itemsNprices, setInP] = useState<
    { name: string; price: number; device?: string; quantity: number }[]
  >([]);
  const [discount, setDiscount] = useState<TPromoCode | null>(null);
  const { data: products, isLoading } = useGetProductsQuery();
  const cart = useSelector((state: { cart: TCartItem[] }) => state.cart);
  const { deliveryPrice, isPriceLoading, deliveryPriceStr } = useGetDeliveryPrice(
    delivery,
    itemsNprices.reduce((acc, el) => (acc += el.quantity), 0),
    !cart.length
  );
  useEffect(() => {
    if (products && cart.length) {
      const iNps = cart
        .filter((el) => !!products.find((pi) => pi.id === el.id))
        .map((el) => {
          return {
            name: `Mythical Case ${
              products.find((pi) => pi.id === el.id)?.color
            } (${products.find((pi) => pi.id === el.id)?.device})`,
            price: el.price,
            quantity: el.quantity,
          };
        });

      setInP(iNps);
    }
  }, [cart, products]);

  const productsPrice = cart.reduce(
    (acc, el) => (acc += el.price * el.quantity),
    0
  );

  let finalPrice = productsPrice;
  if (discount) {
    if (discount.absolute_value_discount) {
      finalPrice -= discount.absolute_value_discount;
    }
    if (discount.discount_percentage) {
      finalPrice -= (discount.discount_percentage / 100) * finalPrice;
      finalPrice = Math.floor(finalPrice)
    }
  }

  const totalLoading = isLoading || isPriceLoading;

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();
  return (
    <form onSubmit={handleSubmit(() => {})} className="order-form form">
      <h3 className="form__title gradi">Оформить заказ</h3>
      {totalLoading ? (
        <Loader />
      ) : (
        <>
          <div className="order-form__form">
            <Area
              label="comment"
              labelToShow="Комментарий к заказу"
              register={register}
            />
            <Promocode discount={discount} setDiscount={setDiscount} />
          </div>
          <div className="order-form__summary">
            <p className="order-form__item col">
              <b>ФИО получателя:</b> <span>{currentBuyer?.full_name}</span>
            </p>
            <p className="order-form__item col">
              <b>Номер телефона:</b>{" "}
              <span>{formatTelephone(currentBuyer?.phone_number || "")}</span>
            </p>
            <>
              {itemsNprices.map((el, i) => {
                return (
                  <p className="order-form__item" key={i + el.name}>
                    <p className="order-form__item-beginning">
                      <b className={classNames({ nonfirst: i > 0 })}>Товар:</b>
                      <span>
                        <span className="name">{el.name}</span> <br />{" "}
                        {!!el.quantity && `x${el.quantity}`}
                      </span>
                    </p>
                    <div className="filler"></div>
                    <b>{el.price * el.quantity} руб.</b>
                  </p>
                );
              })}
            </>
            {!!discount && (
              <p className="order-form__item">
                <b className="red">Скидка по промокоду:</b>
                <div className="filler" />
                <b className="red">
                  {!!discount.discount_percentage &&
                    `${discount.discount_percentage}%`}
                  {!!discount.absolute_value_discount &&
                    `${discount.absolute_value_discount} руб.`}
                </b>
              </p>
            )}
            <p className="order-form__item">
              <p className="order-form__item-beginning">
                <b>Способ доставки:</b>
                <span>{delivery?.type}</span>
              </p>
              <div className="filler" />
              <b>{deliveryPriceStr} руб.</b>
            </p>
            <p className="order-form__item col">
              <b>Пункт выдачи:</b>{" "}
              <span>
                {delivery?.type === "Почта России"
                  ? delivery.office?.full_address
                  : delivery?.pvz?.location.address}
              </span>
            </p>

            <p className="order-form__item">
              <b>Итоговая стоимость:</b>
              <div className="filler" />
              <b>{formatLessThanRuble(finalPrice + deliveryPrice)} руб.</b>
            </p>
          </div>
        </>
      )}
      <div className="form__buttons">
        <Button
          variant="black"
          onClick={() => setStage(2)}
          className="form__button"
          disabled={totalLoading}
        >
          Назад
        </Button>
        <Button
          variant="black"
          className="form__button next"
          onClick={() => {}}
          disabled={totalLoading}
        >
          Оформить заказ
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;

import "./order.form.css";
import "./formcommon.css";
import { TBuyerForm, TCartItem, TDeliveryFinal, TPromoCode } from "../../types";
import { Area } from "./input";
import { useForm } from "react-hook-form";
import Promocode from "./promocode";
import { useState } from "react";
import classNames from "classnames";
import Button from "../button";
import {
  formatLessThanRuble,
  formatTelephone,
  useGetDeliveryPrice,
  useGetItemsWithPrices,
} from "../../tools";
import { useSelector } from "react-redux";
import Loader from "../loader";
import { useCreateOrderMutation } from "../../redux/order.api";
import { useNavigate } from "react-router-dom";
import DeliveryErrorModal from "../delivery.error.modal";

type Props = {
  setStage: (arg: number) => void;
  currentBuyer?: ({ id: number } & TBuyerForm) | null;
  delivery: TDeliveryFinal;
};

const OrderForm = ({ currentBuyer, setStage, delivery }: Props) => {
  const [discount, setDiscount] = useState<TPromoCode | null>(null);
  const { itemsNprices, productsLoading } = useGetItemsWithPrices();
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState(false);
  const navigate = useNavigate();
  const cart = useSelector((state: { cart: TCartItem[] }) => state.cart);
  const { deliveryPrice, isPriceLoading, deliveryPriceStr, deliveryError } =
    useGetDeliveryPrice(
      delivery,
      itemsNprices.reduce((acc, el) => (acc += el.quantity), 0),
      !cart.length
    );

  const [createOrder] = useCreateOrderMutation();

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
      finalPrice = Math.floor(finalPrice);
    }
  }

  const totalLoading = productsLoading || isPriceLoading || orderLoading;

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<{ comment?: string }>();

  const onSubmit = ({ comment }: { comment?: string }) => {
    if (delivery && productsPrice && deliveryPrice && currentBuyer) {
      setOrderError(false);
      setOrderLoading(true);
      let point_of_delivery = "";

      switch (delivery.type) {
        case "Почта России":
          if (delivery.office) {
            point_of_delivery = delivery.office.postal_code;
          }
          break;
        case "СДЭК":
          if (delivery.pvz) {
            point_of_delivery = delivery.pvz.code;
          }
          break;
      }

      let productsToSend: number[] = [];

      cart.forEach((el) => {
        productsToSend = productsToSend.concat(Array(el.quantity).fill(el.id));
      });

      createOrder({
        comment: comment || "",
        buyer_id: currentBuyer.id,
        delivery_method_id: delivery.id,
        delivery_price: deliveryPrice,
        full_price: finalPrice,
        point_of_delivery,
        products_price: productsPrice,
        applied_promo_code_id: discount ? discount.id : null,
        product_ids: productsToSend,
      })
        .unwrap()
        .then((res) => {
          setOrderLoading(false);
          navigate("/success");
        })
        .catch((err) => setOrderError(true))
        .finally(() => setOrderLoading(false));
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="order-form form">
      <h3 className="form__title gradi">Оформить заказ</h3>
      <DeliveryErrorModal isOpen={deliveryError} onClick={() => setStage(2)} />
      {totalLoading || deliveryError ? (
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
      {!!orderError && <div className="form__error">Не удалось оформить заказ. Пожалуйста, попробуйте позже.</div>}
    </form>
  );
};

export default OrderForm;

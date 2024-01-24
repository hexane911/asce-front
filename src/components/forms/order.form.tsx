import "./order.form.css";
import "./formcommon.css";
import { TBuyer } from "../../types";
import { Area } from "./input";
import { useForm } from "react-hook-form";
import Promocode from "./promocode";
import { useContext, useEffect, useState } from "react";
import { useGetProductsQuery } from "../../redux/products.api";
import { FakeCartContext } from "../../App";
import classNames from "classnames";
import Button from "../button";
import { formatTelephone } from "../../tools";

type Props = {
  setStage: (arg: number) => void;
  currentBuyer?: TBuyer | null;
};

const OrderForm = ({ currentBuyer, setStage }: Props) => {
  const [itemsNprices, setInP] = useState<
    { name: string; price: number; device?: string; quantity: number }[]
  >([]);

  const { data: products, isLoading } = useGetProductsQuery();
  const { cart } = useContext(FakeCartContext);

  useEffect(() => {
    if (products && cart.length) {
      const mapped = cart.map((el) => ({
        quantity: el.quantity,
        id: el.id,
      }));
      const iNps = mapped
        .filter((el) => !!products.find((pi) => pi.id === el.id))
        .map((el) => {
          return {
            name: `Mythical Case ${
              products.find((pi) => pi.id === el.id)?.color
            }`,
            price: products.find((pi) => pi.id === el.id)?.price || 0,
            device: cart.find((ci) => ci.id === el.id)?.device || "",
            quantity: el.quantity,
          };
        });

      setInP(iNps);
    }
  }, [cart, products]);

  const finalPrice = itemsNprices.length
    ? itemsNprices.reduce((acc, el) => (acc += el.price * el.quantity), 0)
    : 0;

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();
  return (
    <form onSubmit={handleSubmit(() => {})} className="order-form form">
      <h3 className="form__title gradi">Оформить заказ</h3>
      <div className="order-form__form">
        <Area
          label="comment"
          labelToShow="Комментарий к заказу"
          register={register}
        />
        <Promocode />
      </div>
      <div className="order-form__summary">
        <p className="order-form__item col">
          <b>ФИО получателя:</b> <span>{currentBuyer?.full_name}</span>
        </p>
        <p className="order-form__item col">
          <b>Номер телефона:</b> <span>{formatTelephone(currentBuyer?.phone_number || "")}</span>
        </p>
        <>
          {itemsNprices.map((el, i) => {
            return (
              <p className="order-form__item" key={i + el.name}>
                <p className="order-form__item-beginning">
                  <b className={classNames({ nonfirst: i > 0 })}>Товар:</b>
                  <span>
                    <span className="name">{el.name}</span> <br />({el.device}){" "}
                    {!!el.quantity && `x${el.quantity}`}
                  </span>
                </p>
                <div className="filler"></div>
                <b>{el.price * el.quantity} руб.</b>
              </p>
            );
          })}
        </>
        <p className="order-form__item">
          <p className="order-form__item-beginning">
            <b>Способ доставки:</b>
            <span>Почта России</span>
          </p>
          <div className="filler" />
          <b>323 руб.</b>
        </p>
        <p className="order-form__item col">
          <b>Пункт выдачи:</b>{" "}
          <span>ул. Дмитрия Ульянова, 17, корп. 1, Москва</span>
        </p>
        <p className="order-form__item">
          <b>Итоговая стоимость:</b>
          <div className="filler" />
          <b>{finalPrice + 323} руб.</b>
        </p>
      </div>
      <div className="form__buttons">
        <Button
          variant="black"
          onClick={() => setStage(2)}
          className="form__button"
        >
          Назад
        </Button>
        <Button
          variant="black"
          className="form__button next"
          onClick={() => {}}
        >
          Оформить заказ
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;

import { useState } from "react";
import "./create.order.css";
import CartItem from "./item.in-cart";
import classNames from "classnames";
import { TBuyer, TBuyerForm, TCartItem, TDeliveryFinal } from "../types";
import CreateBuyerForm from "./forms/create.buyer";
import DeliveryForm from "./forms/delivery.form";
import OrderForm from "./forms/order.form";
import { useSelector } from "react-redux";

type Props = {
  stage: number;
  setStage: (arg: number) => void;
};

const line = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="order__filler"
    width="321"
    height="2"
    viewBox="0 0 321 2"
    fill="none"
  >
    <path
      d="M1 1H320"
      stroke="url(#paint0_linear_286_480)"
      stroke-linecap="round"
      stroke-dasharray="5 5"
    />
    <defs>
      <linearGradient
        id="paint0_linear_286_480"
        x1="809"
        y1="38.0001"
        x2="-119.5"
        y2="38.0001"
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset="1" stop-color="white" />
      </linearGradient>
    </defs>
  </svg>
);

const CreateOrder = ({ stage, setStage }: Props) => {
  const cart = useSelector((state: {cart : TCartItem[]}) => state.cart)
  const sorted = [...cart].sort((a, b) => a.id - b.id);
  const [buyer, setBuyer] = useState<{id: number}&TBuyerForm | null>(null);
  const [delivery, setDelivery] = useState<TDeliveryFinal | null>(null)
  if (stage === 0 || !cart.length) {
    return null;
  }


  return (
    <div className="order">
      <div className="order__list">
        {sorted.map((el) => (
          <CartItem id={el.id} inOrder/>
        ))}
      </div>
      <div className="order__forms">
        <div className="order__stages">
          <div className={classNames("order__stage", { active: stage === 1 })}>
            <b className={classNames("gradi", { inverse: stage === 1 })}>1</b>
          </div>
          {line}
          <div className={classNames("order__stage", { active: stage === 2 })}>
            <b className={classNames("gradi", { inverse: stage === 2 })}>2</b>
          </div>
          {line}
          <div className={classNames("order__stage", { active: stage === 3 })}>
            <b className={classNames("gradi", { inverse: stage === 3 })}>3</b>
          </div>
        </div>
        {stage === 1 && (
          <CreateBuyerForm
            currentBuyer={buyer}
            setBuyer={setBuyer}
            setStage={setStage}
          />
        )}
        {stage === 2 && <DeliveryForm deliveryFinal={delivery} setDelivery={setDelivery} setStage={setStage} />}
        {stage === 3 && <OrderForm currentBuyer={buyer} setStage={setStage} delivery={delivery} />}
      </div>
    </div>
  );
};

export default CreateOrder;

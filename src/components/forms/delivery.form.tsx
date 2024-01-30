import { ReactNode, useEffect, useState } from "react";
import Button from "../button";
import "./delivery.form.css";
import "./formcommon.css";
import { TDeliveryFinal, TDeliveryMethod } from "../../types";
import { useGetDeliveryMehodsQuery } from "../../redux/delivery.api";
import { DELIVERY_IMGS, DELIVERY_METHODS } from "../../constants";
import classNames from "classnames";
import Loader from "../loader";
import SdekForm from "./cities/sdekForm";

type Props = {
  setStage: (arg: number) => void;
  setDelivery: (arg: TDeliveryFinal) => void;
  deliveryFinal: TDeliveryFinal
};

type MethodProps = {
  method: TDeliveryMethod;
  onClick: () => void;
  active?: boolean;
};

const Method = ({ method, onClick, active }: MethodProps) => {
  return (
    <div className={classNames("method", { active })} onClick={onClick}>
      <div className="method__content">
        <img src={DELIVERY_IMGS[method.name]} className="method__icon" />
        {method.name}
      </div>
      <div className="method__price">от {method.base_price} руб.</div>
    </div>
  );
};

const DeliveryForm = ({ setStage, deliveryFinal, setDelivery }: Props) => {
  const [currentMethod, setCurrentMethod] = useState<DELIVERY_METHODS | null>(
    null
  );


  const { data: methods, isLoading: methodsLoading } =
    useGetDeliveryMehodsQuery();

  const FORMS : {[key: string]: ReactNode} = {
    "СДЕК": <SdekForm final={deliveryFinal} setFinal={setDelivery} />,
    "Почта России": <SdekForm final={deliveryFinal} setFinal={setDelivery} disabled />
  }

  useEffect(() => {
    if (currentMethod && currentMethod !== deliveryFinal?.type) {
      setDelivery({type: currentMethod})
    }
  }, [currentMethod])


  return (
    <div className="delivery form">
      <h3 className="form__title gradi">Доставка</h3>

      {!!currentMethod ? FORMS[currentMethod] : <SdekForm final={deliveryFinal} setFinal={setDelivery} disabled />}

      {methodsLoading && <Loader />}

      {!!methods && (
        <>
        <p className="input__label gradi methods__title">Способ доставки</p>
          <div className="delivery__content delivery__methods">
          {methods.map((el) => (
            <Method
              method={el}
              onClick={() => setCurrentMethod(el.name)}
              active={currentMethod === el.name}
            />
          ))}
        </div>
        </>
      )}

      <div className="form__buttons">
        <Button
          variant="black"
          onClick={() => setStage(1)}
          className="form__button"
        >
          Назад
        </Button>
        <Button
          variant="black"
          className="form__button next"
          onClick={() => setStage(3)}
          disabled={!deliveryFinal?.city || !deliveryFinal?.pvz}
        >
          Далее
        </Button>
      </div>
    </div>
  );
};

export default DeliveryForm;

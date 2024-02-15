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
import PostForm from "./cities/postForm";

type Props = {
  setStage: (arg: number) => void;
  setDelivery: (arg: TDeliveryFinal) => void;
  deliveryFinal: TDeliveryFinal;
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
  const [currentMethod, setCurrentMethod] = useState<{id: number, type: DELIVERY_METHODS} | null>(
    null
  );

  const { data: methods, isLoading: methodsLoading } =
    useGetDeliveryMehodsQuery();

  const FORMS: { [key: string]: ReactNode } = {
    СДЭК: <SdekForm final={deliveryFinal} setFinal={setDelivery} />,
    "Почта России": <PostForm final={deliveryFinal} setFinal={setDelivery} />,
  };

  useEffect(() => {
    if (currentMethod && currentMethod.type !== deliveryFinal?.type) {
      setDelivery({ type: currentMethod.type, id: currentMethod.id });
    }
  }, [currentMethod]);

  return (
    <div className="delivery form">
      <h3 className="form__title gradi">Доставка</h3>

      

      {!!methods && (
        <>
          <p className="input__label gradi methods__title">Способ доставки</p>
          <div className="delivery__content delivery__methods">
            {methods.map((el) => (
              <Method
                method={el}
                onClick={() => setCurrentMethod({id: el.id, type: el.name})}
                active={currentMethod?.type === el.name}
              />
            ))}
          </div>
        </>
      )}

      {methodsLoading && <Loader />}

      {!!currentMethod ? (
        FORMS[currentMethod.type]
      ) : (
        <SdekForm final={deliveryFinal} setFinal={setDelivery} disabled />
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
          disabled={
            !deliveryFinal ||
            (deliveryFinal.type == "СДЭК"
              ? !deliveryFinal.city || !deliveryFinal.pvz
              : !deliveryFinal.office || !deliveryFinal.city)
          }
        >
          Далее
        </Button>
      </div>
    </div>
  );
};

export default DeliveryForm;

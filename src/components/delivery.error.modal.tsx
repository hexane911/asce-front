import img from "../assets/img/error-cloud.svg";
import Button from "./button";
import "./delivery.error.modal.css";

type Props = {
  onClick: () => void;
  isOpen: boolean;
};

const DeliveryErrorModal = ({ isOpen, onClick }: Props) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="delivery-error-modal">
      <div className="delivery-error-modal__box">
        <div className="delivery-error-modal__left">
          <p className="delivery-error-modal__text gradi">
            Извините, не можем доставить по выбранному адресу этим способом
            доставки. Пожалуйста, выберите другой способ доставки или попробуйте
            ещё раз.
          </p>
          <img src={img} className="delivery-error-modal__img mobile" />

          <Button variant="black" onClick={onClick}>
            Назад
          </Button>
        </div>
        <img src={img} className="delivery-error-modal__img" />
      </div>
    </div>
  );
};

export default DeliveryErrorModal;

import Button from "../button";
import "./delivery.form.css";
import "./formcommon.css";

type Props = {
  setStage: (arg: number) => void;
};

const DeliveryForm = ({ setStage }: Props) => {
  return (
    <div className="delivery form">
      <h3 className="form__title gradi">Доставка</h3>

      <p style={{ marginBottom: "20px", textAlign: "center" }}>
        тут пока ничего нет, при работающем бэке будет
      </p>

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
        >
          Далее
        </Button>
      </div>
    </div>
  );
};

export default DeliveryForm;

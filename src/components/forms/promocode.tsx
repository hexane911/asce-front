import { useEffect, useState } from "react";
import Button from "../button";
import "./input.css";
import "./promocode.css";
import checkmark from "../../assets/img/checkmark-white.svg";
import { useLazyGetPromocodeQuery } from "../../redux/promo.api";
import classNames from "classnames";
import { TPromoCode } from "../../types";

type Props = {
  setDiscount: (arg: TPromoCode) => void;
  discount?: TPromoCode | null;
  disabled?: boolean
};

const Promocode = ({ setDiscount, discount, disabled }: Props) => {
  const [code, setCode] = useState("");
  const [getPromocode] = useLazyGetPromocodeQuery();
  const [failed, setFailed] = useState<null | "uses" | "error">(null);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!!code) {
      setLoading(true);
      getPromocode({ promo_code_name: code })
        .unwrap()
        .then((res) => {
          if (res.number_of_uses !== 0) {
            setDiscount(res);
          } else {
            setFailed("uses")
          }
        })
        .catch((err) => err.status === 400 ? setFailed("uses") : setFailed("error"))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    setFailed(null);
  }, [code])

  return (
    <div className="promo input__box">
      <label className="input__label gradi">Промокод</label>
      <div className="promo__box">
        <input
          placeholder="Введите ваш промокод"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="text"
          className={classNames("promo__input input", {
            success: !!discount,
            error: failed,
          })}
          disabled={!!discount || loading || disabled}
        />
        <Button
          variant="black"
          className={classNames("promo__button", {
            success: !!discount,
            error: failed,
          })}
          disabled={!code || loading || !!discount || disabled}
          onClick={handleClick}
        >
          {discount ? (
            <img className="success" src={checkmark} />
          ) : (
            <>
              Активировать <img className="img" src={checkmark} />
            </>
          )}
        </Button>
      </div>
      {failed === "error" && <p className="input__error">Промокод не найден</p>}
      {failed === "uses" && <p className="input__error">Количество использований промокода истекло</p>}
      {disabled && <p className="input__error" style={{filter: "grayscale(1)"}}>Промокод недоступен при действующей акции</p>}
    </div>
  );
};

export default Promocode;

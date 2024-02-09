import { useEffect, useState } from "react";
import Button from "../button";
import "./input.css";
import "./promocode.css";
import checkmark from "../../assets/img/checkmark-white.svg";
import { useLazyGetPromocodeQuery } from "../../redux/promo.api";
import classNames from "classnames";

type Props = {
  setDiscount: (arg: number) => void;
  discount?: number | null;
};

const Promocode = ({ setDiscount, discount }: Props) => {
  const [code, setCode] = useState("");
  const [getPromocode] = useLazyGetPromocodeQuery();
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!!code) {
      setLoading(true);
      getPromocode({ promo_code_name: code })
        .unwrap()
        .then((res) => {
          setDiscount(res.discount_percentage);
        })
        .catch(() => setFailed(true))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    setFailed(false);
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
          disabled={!!discount || loading}
        />
        <Button
          variant="black"
          className={classNames("promo__button", {
            success: !!discount,
            error: failed,
          })}
          disabled={!code || loading || !!discount}
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
      {failed && <p className="input__error">Промокод не найден</p>}
    </div>
  );
};

export default Promocode;

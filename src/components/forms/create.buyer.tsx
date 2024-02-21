import { TBuyerForm } from "../../types";
import Button from "../button";
import "./create.buyer.css";
import "./formcommon.css";
import Input from "./input";
import cartIcon from "../../assets/img/cart-white.svg";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  useGetBuyerQuery,
  useLazyGetBuyerQuery,
  useSetBuyerMutation,
  useUpdateBuyerMutation,
} from "../../redux/buyer.api";
import Loader from "../loader";
import { formatTelephone } from "../../tools";

type Props = {
  setBuyer: (arg: { id: number } & TBuyerForm) => void;
  currentBuyer: ({ id: number } & TBuyerForm) | null;
  setStage: (arg: number) => void;
};

const CreateBuyerForm = ({ currentBuyer, setStage, setBuyer }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TBuyerForm>({
    defaultValues: currentBuyer || {},
    mode: "onChange",
  });
  const [buyerError, setBuyerError] = useState(false);
  const [createBuyer] = useSetBuyerMutation();
  const [updateBuyer] = useUpdateBuyerMutation();
  const [getExistingBuyer] = useLazyGetBuyerQuery();
  const [loading, setLoading] = useState(false);
  const onSubmit = (data: TBuyerForm) => {
    const newBuyer = {...data, phone_number: formatTelephone(data.phone_number)}
    setLoading(true);
    getExistingBuyer({ email: data.email })
      .unwrap()
      .then(({ id }) =>
        updateBuyer(newBuyer)
          .unwrap()
          .then((res) => setBuyer({ id, ...res }))
          .catch(() => setBuyerError(true))
      )
      .catch(() =>
        createBuyer(newBuyer)
          .unwrap()
          .then((res) => setBuyer({ ...res }))
          .catch(() => setBuyerError(true))
      )
      .finally(() => {
        setLoading(false);
        if (!buyerError) {
          setStage(2);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form buyer-form">
      <h3 className="form__title gradi">Контактная информация</h3>
      {loading && (
        <div className="form__loader">
          <Loader />
        </div>
      )}
      <div className="buyer-form__form">
        <Input
          register={register}
          label="email"
          labelToShow="Электронная почта"
          placeholder="yourmail@gmail.com"
          required
          pattern={
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
          }
          errors={errors}
          errorMsg="Неверный формат электронной почты"
        />
        <Input
          register={register}
          label="phone_number"
          labelToShow="Номер телефона"
          placeholder="Ваш номер телефона"
          pattern={
            /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
          }
          required
          errorMsg="Неверный формат номера"
          errors={errors}
        />
        <Input
          register={register}
          label="telegram"
          labelToShow="Telegram никнейм"
          placeholder="@username"
          // pattern={/^[A-z0-9_]{5,}$/}
          errors={errors}
          // errorMsg="Неверный формат никнейма"
        />
        <Input
          register={register}
          label="full_name"
          labelToShow="ФИО получателя"
          placeholder="Иванов Иван Иванович"
          required
          errors={errors}
        />
      </div>
      <div className="form__buttons">
        <Button
          variant="black"
          onClick={() => setStage(0)}
          className="form__button"
          disabled={loading}
          type="button"
        >
          <img src={cartIcon} />
          Назад
        </Button>
        <Button
          variant="black"
          className="form__button next"
          disabled={!isValid || loading}
        >
          Далее
        </Button>
      </div>
    </form>
  );
};

export default CreateBuyerForm;

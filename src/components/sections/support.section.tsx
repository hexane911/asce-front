import Button from "../button";
import "./support.section.css";

import tgIcon from "../../assets/img/tg.svg";
import ihpone from "../../assets/img/iphone.png";
import ihponeMobile from "../../assets/img/iphone-mobile.png";
import checkmark from "../../assets/img/check_mark.svg";
import { useRef, useState } from "react";
import { useOnScreen } from "../../tools";
import classNames from "classnames";
import { useSubscribeToUpdatesMutation } from "../../redux/email.api";
import { useForm } from "react-hook-form";

const SupportSection = () => {
  const supportRef = useRef(null);
  const emailRef = useRef(null);
  const { isSeen: supportSeen } = useOnScreen(supportRef, 0.1);
  const { isSeen: emailSeen } = useOnScreen(emailRef, 0.5);
  const [subscribe] = useSubscribeToUpdatesMutation();
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<{ email: string }>();
  const onSubmit = ({ email }: { email: string }) => {
    setLoading(true)
    setErr(false)
    subscribe({ email })
      .unwrap()
      .then(() => setSuccess(true))
      .catch(() => setErr(true))
      .finally(() => setLoading(false))
  };
  return (
    <section className="support">
      <div ref={supportRef} className={"support__wrapper wrapper"}>
        <div
          className={classNames("support__block", { refHidden: !supportSeen })}
          ref={supportRef}
        >
          <img src={ihpone} alt="" className="support__phone" />
          <img src={ihponeMobile} alt="" className="support__phone-mobile" />
          <div className="support__content">
            <p className="support__title gradi inverse">
              Техническая <br /> поддержка
            </p>
            <Button className="support__button" variant="white" onClick={() => window.open("https://vk.com/im?sel=-221571880")}>
              <img src={tgIcon} />
              Смело задавайте ваш вопрос!
            </Button>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classNames("support__bottom", { refHidden: !emailSeen })}
          ref={emailRef}
        >
          <p className="support__p gradi">Получайте персональные предложения</p>
          <div className="support__input-box">
            <button
              className="support__button-form"
              disabled={success || !isValid || loading}
            >
              <img src={checkmark} className="support__input-img" />
            </button>
            <input
              type="text"
              {...register("email", {
                required: true,
                pattern:
                  /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
              })}
              disabled={success || loading}
              placeholder="Введите вашу почту..."
              className={classNames("support__input", { success, err })}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default SupportSection;

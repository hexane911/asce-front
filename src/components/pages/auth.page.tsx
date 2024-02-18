import { useForm } from "react-hook-form";
import logo from "../../assets/img/logo-big-black.svg";
import Input from "../forms/input";
import { useAuthMutation } from "../../redux/auth.api";
import { useState } from "react";
import Button from "../button";
import "./auth.page.css";
import "../forms/input.css";
import { useCookies } from "react-cookie";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
const AuthPage = () => {
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm<{ password: string }>();
  const [cookies, setCookie] = useCookies();
  const [auth] = useAuthMutation();
  const [authErr, setAuthErr] = useState("");
  const navigate = useNavigate()
  const onSubmit = (data: { password: string }) => {
    auth(data)
      .unwrap()
      .then((res) => {
        if (res.auth === true) {
          setCookie("auth", data.password, {expires: new Date(Date.now() + 1000 * 60 * 30)});
          // navigate("/")
        } else {
          setAuthErr("Неверный пароль.");
        }
      })
      .catch((err) => {
        setAuthErr("Неверный пароль.");
      });
  };

  if (cookies.auth) {
    return null
  }

  return (
    <div className="auth">
      <div className="wrapper auth__wrapper">
        <div className="auth__box">
          <div className="input__box">
            <label className="input__label gradi">Пароль</label>
            <form
              action=""
              className="auth__form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                {...register("password", { required: true })}
                type="password"
                className={classNames("auth__input input", {
                  error: !!authErr,
                })}
              />
              <Button
                className="auth__button"
                variant="black"
                disabled={!isValid}
              >
                Ввод
              </Button>
            </form>
            {authErr && <p className="input__error">{authErr}</p>}
          </div>
          <img src={logo} className="auth__logo" />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

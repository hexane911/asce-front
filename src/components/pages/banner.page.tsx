import "./banner.page.css";

import logo from "../../assets/img/logo-big-black.png";
import Button from "../button";
import arrow from "../../assets/img/arrow-right-white.svg";
import heart from "../../assets/img/heart.svg";
import err from "../../assets/img/err.svg";
import { Link } from "react-router-dom";

type Props = {
  state: "404" | "success" | "order-rejected";
};

const content: { [key: string]: any } = {
  "404": (
    <>
      <p className="banner-page__title gradi">404 Not Found</p>
      <p className="banner-page__sub gradi">
        Кажется что-то пошло не так, страница не найдена
      </p>
    </>
  ),
  success: (
    <>
      <>
        <p className="banner-page__title gradi heart">
          Заказ оплачен, спасибо!
        </p>
        <p className="banner-page__sub gradi">
          Вся нужная информация будет у вас на почте
        </p>
      </>
    </>
  ),
  "order-rejected": (
    <>
      <p className="banner-page__title gradi err">К сожалению, заказ отменен</p>
    </>
  ),
};

const BannerPage = ({ state }: Props) => {
  return (
    <section className="banner-page">
      <div className="wrapper banner-page__wrapper">
        <div className="banner-page__content">
          <img src={logo} alt="" className="banner-page__logo" />
          {content[state]}
          <Link className="link" to={"/"}>
            <Button variant="black" className="banner-page__button">
              На гланую <img src={arrow} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BannerPage;

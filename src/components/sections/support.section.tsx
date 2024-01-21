import Button from "../button";
import "./support.section.css";

import tgIcon from "../../assets/img/tg.svg";
import ihpone from "../../assets/img/iphone.png";
import ihponeMobile from "../../assets/img/iphone-mobile.png";
import checkmark from '../../assets/img/check_mark.svg'

const SupportSection = () => {
  return (
    <section className="support">
      <div className="support__wrapper wrapper">
        <div className="support__block">
          <img src={ihpone} alt="" className="support__phone" />
          <img src={ihponeMobile} alt="" className="support__phone-mobile" />
          <div className="support__content">
            <p className="support__title gradi inverse">
              Техническая <br /> поддержка
            </p>
            <Button className="support__button" variant="white">
              <img src={tgIcon} />
              Смело задавайте ваш вопрос!
            </Button>
          </div>
        </div>
        <div className="support__bottom">
          <p className="support__p gradi">Получайте персональные предложения</p>
          <div className="support__input-box">
            <img src={checkmark} className="support__input-img" />
            <input type="text" placeholder="Введите вашу почту..." className="support__input" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;

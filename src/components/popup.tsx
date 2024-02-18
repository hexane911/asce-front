import { useEffect, useState } from "react";
import "./popup.css";
import Button from "./button";
import iphone from '../assets/img/iphone-banner.png'
import closeIcon from '../assets/img/close.svg'

const Popup = () => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!localStorage.getItem("p")) {
        setOpened(true)
      }
    }, 15000)
    return () => clearTimeout(timeout)
  }, []);

  const handleClose = () => {
    setOpened(false);
    localStorage.setItem("p", "p");
  };

  if (!opened) {
    return false;
  }

  return (
    <div className="popup">
        <div className="popup__box">
            <img src={closeIcon} alt="close" className="popup__close" onClick={handleClose} />
            <img src={iphone} className="popup__image" />
          <div className="popup__content">
            <div className="popup__features">
              <div className="popup__feature">Промокоды</div>
              <div className="popup__feature">Эксклюзивный контент</div>
              <div className="popup__feature">Информация о дропах</div>
            </div>
            <div className="popup__features mobile">
              <div className="popup__feature">Эксклюзивный контент</div> <br />
              <div className="popup__feature">Промокоды</div>
              <div className="popup__feature">Информация о дропах</div>
            </div>
            <p className="popup__title gradi">Подпишись на наш Telegram канал</p>
            <Button variant="black" className="popup__button" onClick={() => window.open("https://t.me/asceapparel")}>
              Подписаться
            </Button>
          </div>
        </div>
    </div>
  );
};

export default Popup

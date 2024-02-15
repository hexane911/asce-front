import Button from "../button";

import "./footer.css";
import inst from "../../assets/img/inst.svg";
import vk from "../../assets/img/vk.svg";
import tg from "../../assets/img/tg.svg";
import logo from "../../assets/img/logo-footer.svg";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useOnScreen } from "../../tools";
import classNames from "classnames";

const Footer = () => {
  const topRef = useRef(null)
  const bottomRef = useRef(null)
  const {isSeen: isTopSeen} = useOnScreen(topRef, 0.5)
  const {isSeen: isBottomSeen} = useOnScreen(bottomRef, 0.5)
  return (
    <footer className="footer" id="footer">
      <div className="footer__top">
        <div className={classNames("wrapper footer__top-wrapper", {refHidden: !isTopSeen})} ref={topRef}>
          <a href="https://t.me/AsceApparel">
            <Button className="footer__button" variant="white">
              <img src={tg} /> t.me/AsceApparel
            </Button>
          </a>
          <a href="https://vk.com/AsceApparel">
            <Button className="footer__button" variant="white">
              <img src={vk} /> vk.com/AsceApparel
            </Button>
          </a>
          <a href="https://instagram.com/AsceApparel">
            <Button className="footer__button" variant="white">
              <img src={inst} /> instagram.com/AsceApparel
            </Button>
          </a>
        </div>
      </div>
      <div className="footer__bottom">
        <div className={classNames("wrapper footer__bottom-wrapper", {refHidden: !isBottomSeen})} ref={bottomRef}>
          <Link to={"/"} className="footer__logo">
            {" "}
            <img src={logo} alt="" className="footer__logo-img" />
          </Link>
          <div className="footer__items">
            <a href="Oferta.pdf" target="_blank" className="footer__link">
              Договор оферты
            </a>
            <a href="Policy.pdf" target="_blank" className="footer__link">
              Политика конфиденциальности
            </a>
            <p className="footer__copyright">Все права защищены 2024©</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

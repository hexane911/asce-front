import CartButton from "../cart-button";
import "./header.css";
import logo from "../../assets/img/logo.svg";
import { useState } from "react";
import classNames from "classnames";

import burger from '../../assets/img/burger.svg'
import { scrollTo, useOutsideClick } from "../../tools";
import { Link } from "react-router-dom";

const Header = () => {

  const [isOpened, setOpened] = useState(false)
  const menuRef = useOutsideClick(() => {
    setOpened(false)
  })

  return (
    <header className="header" id="header">
      <div className="wrapper header__wrapper">
        <div className="header__mobile-menu" ref={menuRef}>
          <img src={burger} className={classNames("header__button", {opened: isOpened})} onClick={() => setOpened(s => !s)} />
          <div className={classNames("header__popup", {opened: isOpened})}>
            <Link to={"/"} className="header__mobile-item">Главная</Link >
            <div onClick={() => {
              setOpened(false)
              scrollTo("goods")
            }} className="header__mobile-item">Ассортимент</div>
            <div onClick={() => {
              setOpened(false)
              scrollTo("footer")
            }} className="header__mobile-item">Контакты</div>
          </div>
        </div>
        <Link to={"/"} className="header__logo">
          <img src={logo} alt="asce logo" className="header__logo-img" />
        </Link>
        <ul className="header__menu">
          <Link to="/" className="header__item">
            Главная
          </Link>
          <div onClick={() => scrollTo("goods")} className="header__item">
            Ассортимент
          </div>
          <div onClick={() => scrollTo("footer")} className="header__item">
            Контакты
          </div>
        </ul>
        <div className="header__cart">
          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default Header;

import { numToPrice } from "../tools";
import "./item.card.css";

import colorIcon from "../assets/img/color-icon.svg";

import inDevelopmentImg from "../assets/img/in-development.png";

import arrow from "../assets/img/arrow-right-white.svg";
import Button from "./button";
import { TProduct } from "../types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMG_PATH } from "../constants";
import classNames from "classnames";

interface Props extends TProduct {
  animationDelay?: number;
}

const ItemCard = ({ id, price, color, in_stock, animationDelay, image_urls, in_development }: Props) => {
  const colorWords = color.split(" ");
  const navigate = useNavigate()

  const [className, setClassName] = useState("item spawned");

  
  let imgs = image_urls?.map(el => IMG_PATH + el)

  return (
    <div
      className={classNames(className, {in_development})}
      style={{ animationDelay: `${animationDelay || 0}ms` }}
      onAnimationEnd={() => setClassName("item")}
      onClick={() => navigate(`/products/${id}`)}
    >
      <div className="item__container">
        <div className="item__image-box">
          {!in_stock && !in_development && <div className="item__soldout">продано</div>}
          {in_development && <div className="item__in-development">В разработке</div>}

          <img
            src={!in_development && !!imgs ? imgs[0] : inDevelopmentImg}
            alt=""
            className="item__image"
          />
        </div>
        <Link
          to={`/products/${id}`}
          className="item__title gradi"
          style={{pointerEvents: in_development ? "none" : "all"}}
        >
          Mythical Case
        </Link>
        <div className="item__color">
          <img src={colorIcon} alt="" className="item__color-icon" />
          <p className="item-color__text">
            {colorWords.length > 1 ? (
              <>
                {colorWords[0]} <b>{colorWords[1]}</b>
              </>
            ) : (
              <b>{color}</b>
            )}
          </p>
        </div>
      </div>
      <p className="item__price gradi">{numToPrice(price)}</p>

      <Button
        variant="black"
        
        className="item__cart-button"
        disabled={in_development || !in_stock}
      >
        {in_development && "В разработке"}
        {!in_stock && !in_development &&  "Продано"}
        {!in_development && in_stock && (
          <>
            Приобрести <img src={arrow} alt="" />
          </>
        )}
      </Button>
    </div>
  );
};

export default ItemCard;

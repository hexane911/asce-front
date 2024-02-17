import { numToPrice } from "../tools";
import "./item.card.css";

import colorIcon from "../assets/img/color-icon.svg";

import inDevelopmentImg from "../assets/img/in-development.png";

import arrow from "../assets/img/arrow-right-white.svg";
import Button from "./button";
import { TProduct } from "../types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import ImageLoader from "./image-loader";

interface Props extends TProduct {
  animationDelay?: number;
}

const ItemCard = ({ id, price, color, in_stock_amount, animationDelay, device, image_urls, in_development }: Props) => {
  const colorWords = color.split(" ");
  const navigate = useNavigate()

  const [className, setClassName] = useState("item spawned");


  return (
    <div
      className={classNames(className, {in_development})}
      style={{ animationDelay: `${animationDelay || 0}ms` }}
      onAnimationEnd={() => setClassName("item")}
      onClick={() => in_development ? null : navigate(`/products/${id}`)}
    >
      <div className="item__container">
        <div className="item__image-box">
          {!in_stock_amount && !in_development && <div className="item__soldout">продано</div>}
          {in_development && <div className="item__in-development">В разработке</div>}

          {/* <img
            src={!in_development ? image_urls[0] : inDevelopmentImg}
            alt=""
            className=""
          /> */}
          <ImageLoader className={classNames("item__image", {in_development})} src={!in_development ? image_urls[0] : inDevelopmentImg}/>
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
        disabled={in_development || !in_stock_amount}
      >
        {in_development && "В разработке"}
        {!in_stock_amount && !in_development &&  "Продано"}
        {!in_development && in_stock_amount && (
          <>
            Приобрести <img src={arrow} alt="" />
          </>
        )}
      </Button>
    </div>
  );
};

export default ItemCard;

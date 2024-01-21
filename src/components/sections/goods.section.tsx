import ItemCard from "../item.card";
import "./goods.section.css";

import arrowDown from "../../assets/img/arrow-down.svg";
import Button from "../button";

import iconAppleWhite from "../../assets/img/apple-white.svg";
import iconAppleBlack from "../../assets/img/apple-black.svg";
import { useState } from "react";
import { scrollTo } from "../../tools";
import classNames from "classnames";
// import { useGetProductsQuery } from "../../redux/products.api";
import { HARDCODE_PRODUCTS } from "../../constants";

const GoodsSection = () => {
  const [currentModel, setCurrentModel] = useState<"AirPods 3" | "AirPods Pro">(
    "AirPods 3"
  );
  const [opened, setOpened] = useState(false);
  // const { data: products, isLoading } = useGetProductsQuery();

  const handleClick = () => {
    if (opened) {
      setOpened(false);
      scrollTo("goods");
    } else {
      setOpened(true);
    }
  };

  const filtered = HARDCODE_PRODUCTS.filter((el) => {
        return el.devices.map(d => d.name).includes(currentModel);
        //@ts-ignore
      }).sort((a, b) => a.in_development - b.in_development);

  return (
    <section className="goods" id="goods">
      <div className="wrapper goods__wrapper">
        <div className="goods__top">
          <h2 className="goods__title">Ассортимент</h2>
          <Button
            className="goods__switch switch"
            variant={currentModel === "AirPods 3" ? "black" : "white"}
            onClick={() => setCurrentModel("AirPods 3")}
          >
            <img
              src={
                currentModel === "AirPods 3" ? iconAppleWhite : iconAppleBlack
              }
            />
            AirPods 3
          </Button>
          <Button
            className="goods__switch switch"
            variant={currentModel === "AirPods Pro" ? "black" : "white"}
            onClick={() => setCurrentModel("AirPods Pro")}
          >
            <img
              src={
                currentModel === "AirPods 3" ? iconAppleBlack : iconAppleWhite
              }
            />
            AirPods Pro
          </Button>
        </div>
        <div className="goods__list">
          {
            <>
              {filtered.map((el, i) =>
                i < 4 ? <ItemCard {...el} animationDelay={i * 80} /> : null
              )}
              {filtered.map((el, i) =>
                opened && i >= 4 ? (
                  <ItemCard {...el} animationDelay={i * 80} />
                ) : null
              )}
            </>
          }
        </div>
        {filtered.length > 4 && (
          <Button
            variant="white"
            onClick={handleClick}
            className={classNames("goods__button", { opened })}
          >
            К полному каталогу{" "}
            <img src={arrowDown} className="goods__button-icon" />
          </Button>
        )}
      </div>
    </section>
  );
};

export default GoodsSection;

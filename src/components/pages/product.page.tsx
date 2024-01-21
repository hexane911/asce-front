import Slider from "react-slick";
import Button from "../button";
import Path from "../path";
import "./product.page.css";
import iconAppleWhite from "../../assets/img/apple-white.svg";
import iconAppleBlack from "../../assets/img/apple-black.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BG_BY_MODEL, IMG_PATH } from "../../constants";
import classNames from "classnames";
import { numToPrice } from "../../tools";
import infoIcon from "../../assets/img/info-gray.svg";
import { useGetProductsQuery } from "../../redux/products.api";
import { TProduct } from "../../types";
import { FakeCartContext } from "../../App";

type PagProps = {
  photos: string[];
  sliderRef: React.MutableRefObject<any> | null;
  currentSlide: number;
};

const ProductPag = ({ photos, currentSlide, sliderRef }: PagProps) => {
  const [classN, setClassN] = useState("product__preview-box spawned");

  const goTo = (index: number) => {
    setClassN("product__preview-box spawned");
    sliderRef?.current?.slickGoTo(index);
  };

  useEffect(() => {
    setClassN("product__preview-box spawned");
  }, [currentSlide, photos]);
  const filtered = photos
    .map((el, i) => ({ el, i }))
    .filter((obj) => obj.i !== currentSlide);
  return (
    <div className="product__previews">
      {filtered.map((el, i) => (
        <div
          className={`_${i} ${classN}`}
          style={{
            animationDelay: `${i * 80}ms`,
          }}
          onClick={() => goTo(el.i)}
          onAnimationEnd={() => {
            setClassN("product__preview-box");
          }}
        >
          {el.i > 0 && <div className="num">{el.i + 1}</div>}
          <img src={el.el} className={`product__preview`} />
        </div>
      ))}
    </div>
  );
};

const ProductPage = () => {
  const { productId } = useParams();

  const navigate = useNavigate();

  if (!productId) {
    navigate("/");
  }
  const { cart, setCart } = useContext(FakeCartContext);
  const { data: products, isLoading } = useGetProductsQuery();

  const [product, setProduct] = useState<TProduct | null>(null);
  const [colors, setColors] = useState<{ id: number; colorName: string }[]>([]);
  const [inCart, setInCart] = useState(0);
  const [currentAirPodsModel, setCurrentAirPodsModel] = useState<
  "AirPods 3" | "AirPods Pro"
>("AirPods 3");

  const currentColor = colors.find(
    (el) => el.id === parseInt(productId || "0")
  );

  const deviceList = product ? product.devices.map((el) => el.name) : [];

  useEffect(() => {
    let pr = products?.find((el) => el.id === parseInt(productId || "0"));
    let clrs = products
      ?.filter((el) => !el.in_development)
      .map((el) => ({ id: el.id, colorName: el.color }));
    if (clrs) {
      setColors(clrs);
    }
    if (pr) {
      setProduct(pr);
      if (pr.devices.length === 1) {
        setCurrentAirPodsModel(pr.devices[0].name)
      }
      let already = cart.find(
        (el) => el.device === currentAirPodsModel && pr!.id === el.id
      );
      if (already) {
        setInCart(already.quantity);
      }
      else {
        setInCart(0)
      }
    }
    if (!isLoading && !products) {
      navigate("/");
    }
  }, [products, isLoading, productId, cart, currentAirPodsModel]);


  const [currentSlide, setCurrentSlide] = useState(0);
  const slider = useRef(null);

  const addToCart = () => {
    if (product) {
      setCart((c: any) => {
        let already = c.filter(
          (el: any) => currentAirPodsModel == el.device && product.id === el.id
        );
        if (already.length) {
          let newOne = already[0];
          newOne.quantity++;
          return [
            ...c.filter(
              (el: any) =>
                !(currentAirPodsModel === el.device && product.id === el.id)
            ),
            newOne,
          ];
        }
        return [
          ...c,
          { id: product.id, device: currentAirPodsModel, quantity: 1 },
        ];
      });
    }
  };

  const removeFromCart = () => {
    if (product) {
      
      setCart((c: any) => {
        let already = c.find(
          (el: any) =>  currentAirPodsModel === el.device && product.id === el.id
        );
        let wOcurrent = [
          ...c.filter(
            (el: any) =>
              !(el.device === currentAirPodsModel && product.id === el.id)
          ),
        ]
        if (already.quantity) {
          return [...wOcurrent, {...already, quantity: already.quantity - 1}]
        }

      });
    }
  };

  if (!product) {
    return null;
  }

  let imgs = product.image_urls?.map(
    (el) => IMG_PATH + el
  );

  const deviceNames = product ? product.devices.map((el) => el.name) : [];

  return (
    <div className="product">
      <div className="wrapper product__wrapper">
        <Path />
        <div className="product__content">
          <div className="product__left">
            <Slider
              className="product__slider"
              arrows={false}
              fade
              beforeChange={(c, n) => setCurrentSlide(n)}
              ref={slider}
            >
              {imgs?.map((el, i) => (
                <div className="product__slide">
                  {i > 0 && <div className="num">{i + 1}</div>}
                  <img src={el} alt="" className="product__image" />
                </div>
              ))}
            </Slider>
            <ProductPag
              currentSlide={currentSlide}
              sliderRef={slider}
              photos={imgs!}
            />
          </div>
          <div className="product__info">
            <div className="product__models">
              {deviceNames.includes("AirPods 3") && (
                <Button
                  className="product__switch switch"
                  variant={
                    currentAirPodsModel === "AirPods 3" ? "black" : "white"
                  }
                  onClick={() => setCurrentAirPodsModel("AirPods 3")}
                >
                  <img
                    src={
                      currentAirPodsModel === "AirPods 3"
                        ? iconAppleWhite
                        : iconAppleBlack
                    }
                  />
                  AirPods 3
                </Button>
              )}
              {deviceNames.includes("AirPods Pro") && (
                <Button
                  className="product__switch switch"
                  variant={
                    currentAirPodsModel === "AirPods Pro" ? "black" : "white"
                  }
                  onClick={() => setCurrentAirPodsModel("AirPods Pro")}
                >
                  <img
                    src={
                      currentAirPodsModel === "AirPods 3"
                        ? iconAppleBlack
                        : iconAppleWhite
                    }
                  />
                  AirPods Pro
                </Button>
              )}
            </div>
            <p className="product__name gradi">Mythical Case</p>
            <div className="product__colors">
              <div className="product__picker">
                {colors.map((clr) => {
                  return (
                    <div
                      onClick={() => navigate(`/products/${clr.id}`)}
                      className={classNames(
                        `product__color`,
                        { active: clr.colorName === currentColor?.colorName },
                        { black: clr.colorName === "classic black" }
                      )}
                      style={{ background: BG_BY_MODEL[clr.colorName] }}
                    ></div>
                  );
                })}
              </div>
              <div className="product__colorname">
                {currentColor?.colorName}
              </div>
            </div>
            <p className="product__price">
              <div className="product__current gradi">
                {numToPrice(product?.price || 0)}
              </div>{" "}
              {!!product?.old_price && (
                <div className="old">{numToPrice(product?.old_price || 0)}</div>
              )}
            </p>
            <div className="product__buttons">
              {!product?.in_stock ? (
                <div className="product__soldout">Нет в наличии</div>
              ) : (
                <>
                  {inCart ? (
                    <div className="product__in-cart in-cart">
                      <div className="in-cart__quan plus" onClick={addToCart} />
                      <div
                        className="in-cart__quan minus"
                        onClick={removeFromCart}
                      />
                      <div className="in-cart__quantity">{inCart}шт.</div>
                    </div>
                  ) : (
                    <Button
                      variant="black"
                      onClick={addToCart}
                      className="product__button"
                    >
                      В корзину
                    </Button>
                  )}
                  <div className="product__avaible">В наличии</div>
                </>
              )}
            </div>
            <p className="product__delivery">
              <img src={infoIcon} alt="" className="product__delivery-icon" />
              Отправка в течение 7 дней после покупки.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

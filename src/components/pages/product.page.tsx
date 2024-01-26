import Slider from "react-slick";
import Button from "../button";
import Path from "../path";
import "./product.page.css";
import iconAppleWhite from "../../assets/img/apple-white.svg";
import iconAppleBlack from "../../assets/img/apple-black.svg";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BG_BY_MODEL, IMG_PATH } from "../../constants";
import classNames from "classnames";
import { numToPrice } from "../../tools";
import infoIcon from "../../assets/img/info-gray.svg";
import { useGetProductsQuery } from "../../redux/products.api";
import { TCartItem, TDevice, TProduct } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cart.slice";

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

  const cart = useSelector((state: { cart: TCartItem[] }) => state.cart);
  const dispatch = useDispatch();
  const { data: products, isLoading } = useGetProductsQuery();
  const [currentAirPodsModel, setCurrentAirPodsModel] =
    useState<TDevice>("AirPods 3");
  const inCart =
    cart.find(
      (el) => el.id === +(productId || 0) && el.device === currentAirPodsModel
    )?.quantity || 0;

  const product = products?.find((el) => el.id === parseInt(productId || "0"));
  const colors = products
    ?.filter((el) => !el.in_development)
    .map((el) => ({ id: el.id, colorName: el.color }));

  const currentColor = colors?.find(
    (el) => el.id === parseInt(productId || "0")
  );
  useEffect(() => {
    if (!isLoading && !products) {
      navigate("/");
    }
  }, [products, isLoading]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slider = useRef(null);

  if (!product) {
    return <div className="product__filler"></div>;
  }

  let imgs = product.image_urls?.map((el) => IMG_PATH + el);

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
                {colors?.map((clr) => {
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
                      <div
                        className="in-cart__quan plus"
                        onClick={() =>
                          dispatch(
                            addToCart({
                              id: product.id,
                              device: currentAirPodsModel,
                              price: product.price,
                            })
                          )
                        }
                      />
                      <div
                        className="in-cart__quan minus"
                        onClick={() =>
                          dispatch(
                            removeFromCart({
                              id: product.id,
                              device: currentAirPodsModel,
                            })
                          )
                        }
                      />
                      <div className="in-cart__quantity">{inCart}шт.</div>
                    </div>
                  ) : (
                    <Button
                      variant="black"
                      onClick={() =>
                        dispatch(
                          addToCart({
                            id: product.id,
                            device: currentAirPodsModel,
                            price: product.price,
                          })
                        )
                      }
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

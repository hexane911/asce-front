import Slider from "react-slick";
import Button from "../button";
import Path from "../path";
import "./product.page.css";
import iconAppleWhite from "../../assets/img/apple-white.svg";
import iconAppleBlack from "../../assets/img/apple-black.svg";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BG_BY_MODEL } from "../../constants";
import classNames from "classnames";
import { numToPrice } from "../../tools";
import infoIcon from "../../assets/img/info-gray.svg";
import cartIcon from "../../assets/img/cart.svg";
import { useGetProductsQuery } from "../../redux/products.api";
import { TCartItem, TDevice, TProduct } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cart.slice";
import Loader from "../loader";
import ImageLoader from "../image-loader";

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
          {/* <img src={el.el} className={`product__preview`} /> */}
          <ImageLoader className="product__preview" src={el.el} />
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
  const inCart =
    cart.find(
      (el) => el.id === +(productId || 0)
    )?.quantity || 0;

  const product = products?.find((el) => el.id === parseInt(productId || "0"));
  const colors = products
    ?.filter((el) => !el.in_development && el.device === product?.device)
    .map((el) => ({ id: el.id, color: el.color }))

  useEffect(() => {
    if (!isLoading && !products) {
      navigate("/");
    }
  }, [products, isLoading]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slider = useRef(null);

  if (!product && isLoading) {
     return <Loader />
  }

  if (!product && !isLoading || product && product.in_development) {
    navigate("/404")
  }

  let image_urls = product?.image_urls || [];

  const deviceNames = products?.filter(el => el.color === product?.color).map(el => ({id: el.id, device: el.device})).sort((a, b) => a.device === "AirPods 3" ? -1 : 1)

  const currentColor = {id: product?.id, color: product?.color}


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
              {image_urls?.map((el, i) => (
                <div className="product__slide">
                  {i > 0 && <div className="num">{i + 1}</div>}
                  <ImageLoader src={el} className="product__image" />
                  {/* <img src={el} alt="" className="product__image" /> */}
                </div>
              ))}
            </Slider>
            <ProductPag
              currentSlide={currentSlide}
              sliderRef={slider}
              photos={image_urls!}
            />
          </div>
          <div className="product__info">
            <div className="product__models">
              {deviceNames?.map(el => {
                return <Button
                className="product__switch switch"
                variant={
                  product?.device === el.device ? "black" : "white"
                }
                onClick={() => navigate(`/products/${el.id}`)}
              >
                <img
                  src={
                    product?.device === el.device
                    ? iconAppleWhite
                    : iconAppleBlack
                  }
                />
                {el.device}
              </Button>
              })}
            </div>
            <p className="product__name gradi">{product?.product_name}</p>
            <div className="product__colors">
              <div className="product__picker">
                {colors?.map((clr) => {
                  return (
                    <div
                      onClick={() => navigate(`/products/${clr.id}`)}
                      className={classNames(
                        `product__color`,
                        { active: clr.color === currentColor?.color },
                        { black: clr.color === "classic black" }
                      )}
                      style={{ background: BG_BY_MODEL[clr.color] }}
                    ></div>
                  );
                })}
              </div>
              <div className="product__colorname">
                {currentColor?.color}
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
            {!!inCart && <Link className="product__to-cart" to={"/cart"}> <img src={cartIcon} /> Перейти в корзину</Link>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

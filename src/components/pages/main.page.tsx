import { useEffect, useRef, useState } from "react";
import Slide from "../slick-slide";
import "./main.page.css";
import Slider from "react-slick";

import qualityIcon from "../../assets/img/icon-quality.png";
import fitIcon from "../../assets/img/icon-fit.png";
import tactileIcon from "../../assets/img/icon-tactile.png";
import classNames from "classnames";

const MainPage = () => {
  const slider = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = () => {
    if (slider.current) {
      //@ts-ignore
      slider?.current?.slickNext();
    }
  };

  const prev = () => {
    if (slider.current) {
      //@ts-ignore
      slider?.current?.slickPrev();
    }
  };

  useEffect(() => {
    if (slider.current) {
    }
  }, [slider]);

  return (
    <div className="page main-page" id="main">
      <div className="slider-container">
        <Slider
          ref={slider}
          className="main-page__slider slider"
          fade
          dots
          customPaging={() => {
            return <a className={`_${currentSlide}`}></a>;
          }}
          arrows={false}
          beforeChange={(prevSlide, nextSlide) => {
            setCurrentSlide(nextSlide);
          }}
          autoplay
          autoplaySpeed={5000}
        >
          <Slide variant="black" link="" />
          <Slide variant="white" link="" />
        </Slider>
        <div
          className={classNames("slider-arrow prev", { white: !!currentSlide })}
          onClick={prev}
        ></div>
        <div
          className={classNames("slider-arrow next", { white: !!currentSlide })}
          onClick={next}
        ></div>
      </div>
      <div className="main-page__bottom">
        <div className="main-page__bottom-wrapper wrapper">
          <div className="main-page__card">
            <div className="main-page__card-container">
              <p className="main-page__topic">
                Премиум <br /> качество
              </p>
              <img src={qualityIcon} alt="" className="main-page__icon" />
            </div>
          </div>
          <div className="main-page__card">
            <div className="main-page__card-container">
              <p className="main-page__topic">
                Идеальная <br /> совместимость
              </p>
              <img src={fitIcon} alt="" className="main-page__icon" />
            </div>
          </div>
          <div className="main-page__card">
            <div className="main-page__card-container">
              <p className="main-page__topic">
                Тактильно <br /> приятный
              </p>
              <img src={tactileIcon} alt="" className="main-page__icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

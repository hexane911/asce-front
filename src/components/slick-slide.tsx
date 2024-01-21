import './slick-slide.css'
import cn from "classnames";

import caseWhiteImg from "../assets/img/case-white.png";
import caseBlackImg from "../assets/img/case-black.png";

import bgIllustrationBlack from "../assets/img/main-page-bgi-1.svg";
import bgIllustrationWhite from "../assets/img/main-page-bgi-2.svg";

import arrowIcon from "../assets/img/arrow-right.svg";
import arrowIconWhite from "../assets/img/arrow-right-white.svg";

import ellipseImg from '../assets/img/ellipse.svg'
import Button from './button';

type Props = {
  variant: "black" | "white";
  link: string;
};

const BGI: { [key: string]: string } = {
  white: bgIllustrationWhite,
  black: bgIllustrationBlack,
};
const ProductImg: { [key: string]: string } = {
  white: caseWhiteImg,
  black: caseBlackImg,
};
const ArrowIcon: { [key: string]: string } = {
    white: arrowIconWhite,
    black: arrowIcon,
  };

const Slide = ({ variant, link }: Props) => {
  const productImage = ProductImg[variant];
  const illustrationImage = BGI[variant];

  return (
    <div className={cn("slide", variant)}>
      <img src={illustrationImage} alt="" className="slide__illustration" />
      <div className="slide__box">
        <div className="slide__image-container">
          {variant === "black" ? 
          <div className="slide__image-back black"></div>
          : 
          <div className="slide__image-back white"></div>
        }
        <img src={productImage} alt="" className="slide__image" />

        </div>
        <p className={cn("slide__title", variant)}>Mythical Case</p>
        <Button variant={variant === "black" ? "white" : "black"} className={cn("slide__link")}>
          Приобрести{" "}
          <img src={ArrowIcon[variant]} alt="" className="slide__link-arrow" />
        </Button>
        <p className={cn("slide__compability", variant)}>Для AirPods 3 | AirPods Pro </p>
      </div>
    </div>
  );
};

export default Slide;

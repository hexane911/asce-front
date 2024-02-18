import "./loader.css";
import loaderSVG from "../assets/img/loader.svg";
import classNames from "classnames";

type Props = {
  small?: boolean;
  shine?: boolean
};

const Loader = ({ small, shine }: Props) => {
  return (
    <div className={classNames("loader", { small })}>
      {shine ? <div className="loader__shine" /> : <img src={loaderSVG} alt="" className="loader__img" />}
    </div>
  );
};

export default Loader;

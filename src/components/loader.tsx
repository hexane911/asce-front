import "./loader.css";
import loaderSVG from "../assets/img/loader.svg";
import classNames from "classnames";

type Props = {
  small?: boolean;
};

const Loader = ({ small }: Props) => {
  return (
    <div className={classNames("loader", { small })}>
      <img src={loaderSVG} alt="" className="loader__img" />
    </div>
  );
};

export default Loader;

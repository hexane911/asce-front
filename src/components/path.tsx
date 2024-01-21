import { Link, useLocation } from "react-router-dom";
import "./path.css";



const Path = () => {
  const location = useLocation();
  let name = "";
  

  return (
    <p className="path">
      <Link to={"/"} className="link">
        Главная
      </Link>{" "}
      / {(()=>{
        if(location.pathname.includes("products")) {
          return "Страница товара"
        }
        if (location.pathname.includes("cart")) {
          return "Корзина"
        }
      })()}
    </p>
  );
};

export default Path;

import { useEffect, useState } from "react";
import "./we-use-cookies.css";
import Button from "./button";

const WeUseCookies = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!localStorage.getItem("wuc")) {
        setOpen(true);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div className="wuc">
      <p className="wuc__text">Мы используем куки для работы сайта.</p>
      <Button
        variant="black"
        className="wuc__button"
        onClick={() => {
          setOpen(false);
          localStorage.setItem("wuc", "checked");
        }}
      >
        Понятно
      </Button>
    </div>
  );
};

export default WeUseCookies;

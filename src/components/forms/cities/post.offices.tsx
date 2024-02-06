import "./cities.common.css";
import "../input.css";
import crossIcon from "../../../assets/img/cross.svg";
import searchIcon from "../../../assets/img/search.svg";
import { useEffect, useState } from "react";
import { useOutsideClick } from "../../../tools";
import classNames from "classnames";
import { TCityPost, TPostOffice } from "../../../types";
import { useGetPostOfficeQuery } from "../../../redux/post.api";

type Props = {
  disabled?: boolean;
  currentCity?: TCityPost;
  currentPvz?: TPostOffice;
  setPvz: (arg: TPostOffice | null) => void;
};

const PostOfficePicker = ({
  disabled,
  currentCity,
  setPvz,
  currentPvz,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleClose = (e?: any) => {
    if (e) {
      e.stopPropagation();
    }
    setOpen(false);
  };

  const ref = useOutsideClick(handleClose);

  const {
    data: pvzs,
    isLoading,
    isFetching,
    refetch,
  } = useGetPostOfficeQuery(
    { limit: 10, address: query, place: currentCity?.place || "" },
    { skip: !open || !currentCity }
  );

  useEffect(() => {
    if (open && currentCity) {
      refetch();
    }
    if (currentCity && currentPvz && currentCity.place !== currentPvz.place) {
      setQuery("");
      setInputValue("");
      setPvz(null);
    }
  }, [query, currentCity]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setQuery(inputValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  useEffect(() => {
    if (currentPvz) {
      setInputValue(currentPvz.full_address);
      setOpen(false);
    }
  }, [currentPvz]);

  useEffect(() => {
    if (!currentCity) {
      setPvz(null);
      setInputValue("");
    }
  }, [currentCity]);

  return (
    <div className="input__box">
      <label className="input__label gradi">Пункт выдачи</label>
      <div
        ref={ref}
        className={classNames("picker sdek", { disabled, open })}
        onClick={() => setOpen(true)}
      >
        <img src={searchIcon} alt="" className="picker__icon" />
        <input
          type="text"
          placeholder="Выберите пункт получения заказа"
          className="picker__input"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        {open && (
          <img
            src={crossIcon}
            alt=""
            onClick={() => {
              setPvz(null);
              setInputValue("");
            }}
            className="picker__cross"
          />
        )}
        {!!open && (
          <div className="picker__list">
            {!!pvzs &&
              !isLoading &&
              !isFetching &&
              pvzs.map((el) => {
                return (
                  <div onClick={() => setPvz(el)} className="picker__item">
                    {el.full_address}
                  </div>
                );
              })}
            {(isLoading || isFetching) && (
              <div className="picker__shield">Загружаем...</div>
            )}
            {!isLoading && !isFetching && !pvzs?.length && (
              <div className="picker__shield">Ничего не найдёно.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostOfficePicker;

import "./cities.common.css";
import "../input.css";
import crossIcon from "../../../assets/img/cross.svg";
import searchIcon from "../../../assets/img/search.svg";
import { useEffect, useState } from "react";
import { useOutsideClick } from "../../../tools";
import classNames from "classnames";
import { useGetCitiesSdekQuery } from "../../../redux/sdek.api";
import { TCityPost } from "../../../types";
import { useGetCitiesPostQuery } from "../../../redux/post.api";

type Props = {
  disabled?: boolean;
  currentCity?: TCityPost;
  setCity: (arg: TCityPost) => void;
};

const PostCityPicker = ({ disabled, currentCity, setCity }: Props) => {
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
    data: cities,
    isLoading,
    isFetching,
    refetch,
  } = useGetCitiesPostQuery(
    { limit: 10, search_string: query },
    { skip: !open }
  );

  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [query]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setQuery(inputValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  useEffect(() => {
    if (currentCity) {
      setInputValue(currentCity.place);
      setOpen(false);
    }
  }, [currentCity]);

  return (
    <div className="input__box">
      <label className="input__label gradi">Город</label>
      <div
        ref={ref}
        className={classNames("picker sdek", { disabled, open })}
        onClick={() => setOpen(true)}
      >
        <img src={searchIcon} alt="" className="picker__icon" />
        <input
          type="text"
          placeholder="Впишите ваш город"
          className="picker__input"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        {open && (
          <img
            src={crossIcon}
            alt=""
            onClick={handleClose}
            className="picker__cross"
          />
        )}
        {!!open && (
          <div className="picker__list">
            {!!cities &&
              !isLoading &&
              !isFetching &&
              cities.map((el) => {
                return (
                  <div onClick={() => setCity(el)} className="picker__item">
                    {el.place}
                  </div>
                );
              })}
            {(isLoading || isFetching) && (
              <div className="picker__shield">Загружаем...</div>
            )}
            {!isLoading && !isFetching && !cities?.length && (
              <div className="picker__shield">Ничего не найдёно.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCityPicker;

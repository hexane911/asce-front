import "./input.css";
import classNames from "classnames";

type Props = {
  placeholder?: string;
  label: string;
  labelToShow?: string;
  register?: any;
  required?: boolean;
  pattern?: any;
  onChange?: any;
  errors?: { [key: string]: any };
  errorMsg?: string;
  className?: string
};

const Input = ({
  label,
  placeholder,
  register,
  required,
  labelToShow,
  pattern,
  errors,
  errorMsg,
  className
}: Props) => {
  const error = errors ? errors[label] : null;

  return (
    <div className="input__box">
      {!!labelToShow && (
        <label className="input__label gradi">
          {labelToShow} {required && <span>*</span>}
        </label>
      )}
      <input
        {...register(label, { required, pattern })}
        placeholder={placeholder}
        className={classNames("input", { error: !!error }, className)}
      />
      {error && error.type === "required" && (
        <p className="input__error">
          Пожалуйста, заполните все обязательные поля*
        </p>
      )}
      {error && error.type !== "required" && (
        <p className="input__error">{errorMsg}</p>
      )}
    </div>
  );
};

export default Input;

export const Area = ({
  label,
  labelToShow,
  register,
  placeholder,
  required,
}: Props) => {
  return (
    <div className="input__box">
      {!!labelToShow && (
        <label className="input__label gradi">
          {labelToShow} {required && <span>*</span>}
        </label>
      )}
      <textarea
        {...register(label, { required })}
        placeholder={placeholder}
        className={classNames("input area")}
      />
    </div>
  );
};

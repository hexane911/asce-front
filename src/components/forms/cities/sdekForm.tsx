import { useEffect, useState } from "react";
import { TCitySdek, TDeliveryFinal, TPVZSdek } from "../../../types";
import SdekCityPicker from "./sdek.cities";
import SdekPVZPicker from "./sdek.pvz";
import "../delivery.form.css";

type Props = {
  disabled?: boolean;
  setFinal?: (arg: TDeliveryFinal) => void;
  final: TDeliveryFinal | null;
};

const SdekForm = ({ disabled, final, setFinal }: Props) => {
  const setCity = (city: TCitySdek) => {
    if (final?.type === "СДЕК") {
      //@ts-ignore
      setFinal((f) => ({ ...f, city }));
    }
  };

  const setPvz = (pvz: TPVZSdek | null) => {
    if (final?.type === "СДЕК") {
      //@ts-ignore
      setFinal((f) => ({ ...f, pvz }));
    }
  };

  return (
    <div className="delivery__content">
      <SdekCityPicker
        setCity={setCity}
        currentCity={final?.city || undefined}
        disabled={disabled}
      />
      <SdekPVZPicker
        setPvz={setPvz}
        currentCity={final?.city || undefined}
        disabled={!final?.city || disabled}
        currentPvz={final?.pvz || undefined}
      />
    </div>
  );
};

export default SdekForm;

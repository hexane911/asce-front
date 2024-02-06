import { useEffect, useState } from "react";
import { TCityPost, TCitySdek, TDeliveryFinal, TPVZSdek, TPostOffice } from "../../../types";
import SdekCityPicker from "./sdek.cities";
import SdekPVZPicker from "./sdek.pvz";
import "../delivery.form.css";
import PostCityPicker from "./post.cities";
import PostOfficePicker from "./post.offices";

type Props = {
  disabled?: boolean;
  setFinal?: (arg: TDeliveryFinal) => void;
  final: TDeliveryFinal | null;
};

const PostForm = ({ disabled, final, setFinal }: Props) => {
  const setCity = (city: TCityPost | null) => {
    if (final?.type === "Почта России") {
      //@ts-ignore
      setFinal((f) => ({ ...f, city }));
    }
  };

  const setPvz = (office: TPostOffice | null) => {
    if (final?.type === "Почта России") {
      //@ts-ignore
      setFinal((f) => ({ ...f, office }));
    }
  };

  if (final && final.type !== "Почта России" ) {
    return null
  }

  return (
    <div className="delivery__content">
      <PostCityPicker
        setCity={setCity}
        currentCity={final?.city || undefined}
        disabled={disabled}
      />
      <PostOfficePicker
        setPvz={setPvz}
        currentCity={final?.city || undefined}
        disabled={!final?.city || disabled}
        currentPvz={final?.office || undefined}
      />
    </div>
  );
};

export default PostForm;

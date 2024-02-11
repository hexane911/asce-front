import { useEffect, useRef, useState } from "react";
import { TDeliveryFinal } from "./types";
import { useLazyCalculatePriceSdekQuery } from "./redux/sdek.api";

export const numToPrice = (num: number): string => {
  const rest = num % 1000;
  const thousands = (num - rest) / 1000;

  return `${thousands}.${rest}₽`;
};

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
};

export const scrollTo = (id?: string) => {
  if (!id) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const top = document.getElementById(id)?.offsetTop;
  if (top) {
    window.scrollTo({ top: top - 100 > 0 ? top - 100 : 0, behavior: "smooth" });
  }
};

export const formatTelephone = (tn: string): string => {
  let arr = tn.split("").filter((c) => !!+c || c === "0");
  
  if (arr.length !== 11) {
    return tn;
  }

  let final =
    "+7 (" +
    arr[1] +
    arr[2] +
    arr[3] +
    ") " +
    arr[4] +
    arr[5] +
    arr[6] +
    " " +
    arr[7] +
    arr[8] +
    " " +
    arr[9] +
    arr[10];
  return final;
};


export const useOnScreen = (ref : any) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIntersecting(entry.isIntersecting);
    },{
      threshold: 1.0
    }
  );

  useEffect(() => {
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
}


export const useGetDeliveryPrice = (delivery: TDeliveryFinal, cases_amount: number, skip?: boolean) => {
  const [deliveryPrice, setPrice] = useState(0)
  const [isPriceLoading, setLoading] = useState(false)
  const [getSdekPrice] = useLazyCalculatePriceSdekQuery()

  useEffect(() => {
    if (!skip) {
      setLoading(true)
      if (delivery?.type === "СДЭК" && delivery.pvz) {
        getSdekPrice({cases_amount, to_postal_code: +delivery.pvz.location.postal_code}).unwrap().then(res => setPrice(res.total_sum)).finally(() => setLoading(false))
      }
      if (delivery?.type === "Почта России") {
        setPrice(323)
        setLoading(false)
      }
    }
  }, [delivery, cases_amount, skip])

  return {deliveryPrice, isPriceLoading}

}
import { useEffect, useRef, useState } from "react";
import { TCartItem, TDeliveryFinal, TPromoCode } from "./types";
import { useLazyCalculatePriceSdekQuery } from "./redux/sdek.api";
import { useAuthMutation, useCheckPWQuery } from "./redux/auth.api";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useLazyCalculatePricePostQuery } from "./redux/post.api";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "./redux/products.api";
import { useChecksSaleQuery } from "./redux/sales.api";

export const numToPrice = (num: number): string => {
  if (num < 1000) {
    return num.toString() + "₽";
  }
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

export const formatTelephone = (tn: string, numsOnly?: boolean): string => {
  let arr = tn.split("").filter((c) => !!+c || c === "0");

  if (arr.length !== 11) {
    return tn;
  }

  if (numsOnly) {
    arr[0] = "7";
    return arr.join("");
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

export const formatLessThanRuble = (price: number) => {
  let cops = price % 1;
  if (cops) {
    if (!(cops % 0.1)) {
      return `${price}0`;
    } else {
      return `${price}`;
    }
  }

  return price.toString();
};

export const useOnScreen = (ref: any, threshold = 1) => {
  const location = useLocation();
  const [isIntersecting, setIntersecting] = useState(false);
  const [isSeen, setIsSeen] = useState(false);
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !isSeen) {
        setIsSeen(true);
      }
    },
    {
      threshold,
    }
  );
  useEffect(() => {
    setIntersecting(false);
    setIsSeen(false);
  }, [location.pathname]);

  useEffect(() => {
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return { isIntersecting, isSeen };
};

export const useGetDeliveryPrice = (
  delivery: TDeliveryFinal,
  cases_amount: number,
  skip?: boolean
) => {
  const [deliveryPrice, setPrice] = useState(0);
  const [priceStr, setPriceStr] = useState("");
  const [isPriceLoading, setLoading] = useState(false);
  const [getSdekPrice] = useLazyCalculatePriceSdekQuery();
  const [getPostPrice] = useLazyCalculatePricePostQuery();
  const [deliveryError, setDeliveryError] = useState(false);

  useEffect(() => {
    if (!skip) {
      setLoading(true);
      if (delivery?.type === "СДЭК" && delivery.pvz) {
        getSdekPrice({
          cases_amount,
          to_postal_code: +delivery.pvz.location.postal_code,
        })
          .unwrap()
          .then((res) => {
            setPrice(res.total_sum);
            setPriceStr(formatLessThanRuble(res.total_sum));
          })
          .catch(() => setDeliveryError(true))
          .finally(() => setLoading(false));
      }
      if (delivery?.type === "Почта России" && delivery.office) {
        getPostPrice({
          cases_amount,
          to_postal_code: +delivery.office.postal_code,
        })
          .unwrap()
          .then((res) => {
            if (res.errors && res.errors.includes("TARIFF_ERROR")) {
              setDeliveryError(true);
              return;
            }
            setPrice(res.delivery_price_in_rub);
            setPriceStr(formatLessThanRuble(res.delivery_price_in_rub));
          })
          .catch((err) => {
            if (err.status !== 400) {
              setDeliveryError(true);
            }
          })
          .finally(() => setLoading(false));
      }
    }
  }, [delivery, cases_amount, skip]);

  return {
    deliveryPrice,
    isPriceLoading,
    deliveryPriceStr: priceStr,
    deliveryError,
  };
};

export const useCheckAuth = () => {
  const [auth] = useAuthMutation();
  const [authSuccess, setAuthSuccess] = useState(false);
  const { data: authNeeded, isLoading: isCheckingPw } = useCheckPWQuery();
  const [cookies] = useCookies();

  useEffect(() => {
    if (authNeeded?.password_required && cookies.auth) {
      auth({ password: cookies.auth })
        .unwrap()
        .then((res) => {
          if (res.auth) {
            setAuthSuccess(res.auth);
          }
        });
    }
  }, [cookies, authNeeded]);

  if (isCheckingPw) {
    return { authNeeded: { password_required: false }, authSuccess: false };
  }

  if (!isCheckingPw && !authNeeded) {
    return { authNeeded: { password_required: false }, authSuccess: true };
  }

  return { authNeeded, authSuccess, isCheckingPw };
};

type INP = { name: string; price: number; quantity: number };

export const useGetItemsWithPrices = () => {
  const cart = useSelector((state: { cart: TCartItem[] }) => state.cart);
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();
  const [itemsNprices, setInPs] = useState<INP[]>([]);

  useEffect(() => {
    if (products && cart.length) {
      const iNps = cart
        .filter((el) => !!products.find((pi) => pi.id === el.id))
        .map((el) => {
          let foundProduct = products.find((pi) => pi.id === el.id);
          if (!foundProduct) {
            return null;
          }
          return {
            name: `${foundProduct.product_name} ${foundProduct.color} (${foundProduct.device})`,
            price: foundProduct.price,
            quantity: el.quantity,
          };
        })
        .filter((el) => !!el);

      setInPs(iNps as { name: string; price: number; quantity: number }[]);
    }
  }, [productsLoading, products, cart]);

  return { itemsNprices, productsLoading };
};

export const useGetFinalPrice = (
  iNps?: INP[],
  discount?: TPromoCode | null
): {
  finalPrice: number;
  discountType: null | "sale" | "promocode";
  finalPriceLoading: boolean;
  discountAmount: number
} => {
  const [finalPrice, setFinalPrice] = useState(0);
  const [discountType, setDiscountType] = useState<"promocode" | "sale" | null>(
    null
  );
  const [discountAmount, setDiscountAmount] = useState(0)
  const { data: saleInfo, isLoading: isSaleLoading } = useChecksSaleQuery();

  const totalItems = iNps
    ? iNps.reduce((acc, el) => (acc += el.quantity), 0)
    : 0;
  const productsPrice = iNps
    ? iNps.reduce((acc, el) => (acc += el.quantity * el.price), 0)
    : 0;

  useEffect(() => {
    const isSaleActive = saleInfo
      ? saleInfo.is_sale &&
        totalItems >= saleInfo.min_amount_of_products_to_trigger_sale &&
        totalItems <= saleInfo.max_amount_of_products_to_trigger_sale
      : false;
    if (!isSaleActive && !discount) {
      setDiscountType(null)
      setFinalPrice(productsPrice)
    }
    if (totalItems && productsPrice) {
      if (discount && !isSaleActive) {
        setDiscountType("promocode");
        if (discount.absolute_value_discount) {
          setFinalPrice(productsPrice - discount.absolute_value_discount);
          setDiscountAmount(discount.absolute_value_discount)
        }
        if (discount.discount_percentage) {
          let newPrice =
            productsPrice -
            (discount.discount_percentage / 100) * productsPrice;
          setFinalPrice(Math.floor(newPrice));
          setDiscountAmount(discount.discount_percentage)
        }
      }
      if (isSaleActive && saleInfo) {
        setDiscountType("sale");
        let newPrice =
          productsPrice - (saleInfo.sale_discount / 100) * productsPrice;
        setFinalPrice(Math.floor(newPrice));
        setDiscountAmount(saleInfo.sale_discount)
      }
    }
  }, [discount, totalItems, saleInfo]);

  return {
    finalPrice,
    finalPriceLoading: isSaleLoading,
    discountType,
    discountAmount
  };
};

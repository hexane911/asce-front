import { useEffect, useRef } from "react";

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
    window.scrollTo({top: 0, behavior: "smooth"})
    return
  }
  const top = document.getElementById(id)?.offsetTop;
  if (top) {
    window.scrollTo({ top: top - 100 > 0 ? top - 100 : 0, behavior: "smooth" });
  }
};

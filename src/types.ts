import { DELIVERY_METHODS } from "./constants";

export type COLORS =
  | "matte white"
  | "classic black"
  | "red wine"
  | "gold pink"
  | "green"
  | "purple"
  | "silver"
  | "perl"
  | "light blue";

export type TProduct = {
  id: number;
  color: COLORS;
  colorNameRu?: string;
  price: number;
  old_price?: number;
  inCart?: number;
  in_stock?: boolean;
  in_development?: boolean;
  image_urls: string[];
  product_name: string;
  device: "AirPods 3" | "AirPods Pro"
};

export type TBuyer = {
  full_name: string;
  email: string;
  phone_number: string;
  telegram?: string;
};

export type TCitySdek = {
  region: string;
  city: string;
  country: string;
  code: number;
};

export type TPVZSdek = {
  code: string;
  name: string;
  uuid: string;
  location: {
    address: string;
    full_address: string;
    city_code: number;
  };
};

export type TDevice = "AirPods 3" | "AirPods Pro";

export type TCartItem = {
  quantity: number;
  order: number;
  id: number;
  price: number;
};

export type TDeliveryMethod = {
  id: number;
  name: DELIVERY_METHODS;
  base_price: number;
};

export type TCityPost = {
  place: "string"
}

export type TPostOffice = {
  id: number,
  place: string,
  region: string,
  postal_code: string,
  street: string,
  full_address: string
}

export type TDeliveryFinal =
  | {
      type: "СДЭК";
      city?: TCitySdek | null;
      pvz?: TPVZSdek | null;
    }
  | {
      type: "Почта России";
      city?: TCityPost | null;
      office?: TPostOffice | null;
    }
  | null;

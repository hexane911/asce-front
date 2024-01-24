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
  image_urls?: string[];
  product_name: string;
  devices: {
    id: number,
    name: "AirPods 3" | "AirPods Pro"
  }[]
};

export type TBuyer = {
  full_name: string,
  email: string,
  phone_number: string,
  telegram?: string
}

export type TCitySdek = {
  region: string,
  city: string,
  address: string
}
export type MODELS =
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
  // model: MODELS;
  id: number;
  color: MODELS;
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

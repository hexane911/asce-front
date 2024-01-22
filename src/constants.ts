import { TProduct } from "./types"
import caseBlack from './assets/img/case-black.png'
import caseWhite from './assets/img/case-white.png'

export const BG_BY_MODEL : {[key: string] : string} = {
    "matte white" : "#ffffff",
    "classic black": "#000000",
    "red wine" : "linear-gradient(137deg, #941A11 -7.81%, #5C1310 49.21%, #941A11 104.8%)",
    "gold pink" : "linear-gradient(141deg, #FF8681 -45.49%, #511F27 17.71%, #FF8681 67.98%)",
    "green" : "linear-gradient(151deg, #7BC96E 9.25%, #060805 110.14%)",
    "purple" : "linear-gradient(151deg, #BE99E8 5.32%, #250532 94.29%)",
    "silver" : "linear-gradient(146deg, #000 -6.23%, #616161 10.16%, #D1D1D1 53.07%, #616161 89.97%, #000 107.79%)",
    "perl" : "linear-gradient(141deg, #FFF -28.37%, #A3A3A3 -0.33%, #D1D1D1 45.3%, #ADADAD 84.54%, #FFF 103.49%)",
    "light blue" : "linear-gradient(151deg, #C0EFFF 7.67%, #041227 86.35%)",

}

export const IMG_PATH = ``

export const HARDCODE_PRODUCTS : TProduct[] = [
    {
        product_name: "MC classic black",
        color: "classic black",
        id: 1,
        price: 1499,
        image_urls: [
            caseBlack, caseBlack, caseBlack, caseBlack
        ],
        devices: [
            {
                id: 1,
                name: "AirPods 3"
            },
            {
                id: 2,
                name: "AirPods Pro"
            }
        ],
        in_stock: true
    },
    {
        product_name: "MC matte white",
        color: "matte white",
        id: 2,
        price: 1499,
        image_urls: [
            caseWhite, caseWhite, caseWhite, caseWhite
        ],
        devices: [
            {
                id: 1,
                name: "AirPods 3"
            }
        ],
        in_stock: true
    },
    {
        product_name: "MC gold pink",
        color: "gold pink",
        id: 3,
        price: 1499,
        image_urls: [
            caseBlack, caseBlack, caseBlack, caseBlack
        ],
        devices: [
            {
                id: 1,
                name: "AirPods 3"
            },
            {
                id: 2,
                name: "AirPods Pro"
            }
        ],
        in_development: true,
        in_stock: true
    },
]
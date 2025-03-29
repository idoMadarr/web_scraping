import { Page } from "puppeteer";

export interface Selector {
    item: string;
    title:string;
    price:string;
    priceImgAlt:any;
    image:string;
}
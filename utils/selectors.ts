import { Selector } from "../interfaces/Selelctor";

const paisplusSelector: Selector = {
    item: ".style_center__2HkpR",
    title: ".style_title__639bQ",
    price: ".style_provider__r_p6h",
    priceImgAlt: "סולפ סיפ",
    image: "img",
};
const hvrSelector: Selector = {
  item: ".style_center__2HkpR",
  title: ".style_title__639bQ",  
  price: ".style_provider__r_p6h",
  priceImgAlt: "רבח",
  image: "img",
}
const maxSelector: Selector = {
  item: ".style_center__2HkpR",
  title: ".style_title__639bQ",
  price: ".style_provider__r_p6h",
  priceImgAlt: "סקמ",
  image: "img",
}
const calSelector: Selector = {
  item: ".style_center__2HkpR",
  title: ".style_title__639bQ",
  price: ".style_provider__r_p6h",
  priceImgAlt: "לאכ",
  image: "img",
}
const selectors:Selector[] = [ calSelector, maxSelector ,hvrSelector, paisplusSelector];

export default selectors;
import { Page } from "puppeteer";
import selectors from "../utils/selectors";
import { Provider, Selector } from "../interfaces";

export const providerFetch = async (page: Page,selector:Selector) => {
  const items = await page.$$(selector.item);

  const data = await Promise.all(
    items.map(async (item) => {
      const title = await item.$eval(
        selector.title,
        (el) => el.textContent?.trim() || null
      );
      
      const priceDivs = await item.$$eval(selector.price, (divs) => {
        return divs
          .filter((div) => div.querySelector(`img[alt="${selector.priceImgAlt}"]`)) 
          .map((div) => div.textContent?.trim() || null); 
      });
      const price = priceDivs.length > 0 ? priceDivs.join(", ") : null;     

      const image = await item.$eval(
        selector.image,
        (el) => el.getAttribute("src") || null
      );

      return { title, price, image };
    })
  );

  return data;
};

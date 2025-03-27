import { Page } from "puppeteer";
import selectors from "../utils/selectors";

export const fetchPaisPlus = async (page: Page) => {
  const items = await page.$$(selectors.paisplus.item);

  const data = await Promise.all(
    items.map(async (item) => {
      const title = await item.$eval(
        selectors.paisplus.title,
        (el) => el.textContent?.trim() || null
      );
      const price = await item.$eval(
        selectors.paisplus.price,
        (el) => el.textContent || null
      );
      const image = await item.$eval(
        selectors.paisplus.image,
        (el) => el.getAttribute("src") || null
      );

      return { title, price, image };
    })
  );

  return data;
};

import { Page } from "puppeteer";
import selectors from "./selectors";
import { ItemType } from "../types";

export const onScraper = async (page: Page) => {
  const items = await page.$$(selectors.general.items);

  const data: ItemType[] = await Promise.all(
    items.map(async (item) => {
      const title = await item.$eval(
        selectors.general.title,
        (el) => el.textContent?.trim() || null
      );
      const price = await item.$eval(
        selectors.general.price,
        (el) => el.textContent || null
      );
      const image = await item.$eval(
        selectors.general.image,
        (el) => el.getAttribute("src") || null
      );

      return { title, price, image };
    })
  );

  return { data };
};

import { ElementHandle, Page } from 'puppeteer';
import node from 'node:timers/promises';
import selectors from './selectors';
import { ItemType } from '../types';
import BotAutomation from '../models/BotAutomation';

export const onScraper = async (page: Page, bot: BotAutomation) => {
  const items = await page.$$(selectors.general.items);
  const data: ItemType[] = [];

  for (const item of items) {
    const title = await item.$eval(
      selectors.general.title,
      el => el.textContent?.trim() || null
    );
    const price = await item.$eval(
      selectors.general.price,
      el => el.textContent || null
    );
    const image = await item.$eval(
      selectors.general.image,
      el => el.getAttribute('src') || null
    );
    const href = await item.$eval(
      selectors.general.href,
      el => el.getAttribute('href') || null
    );
    const navigateLink = `https://www.clubhub.co.il${href}`;
    let purchasableLink = '';

    if (href) purchasableLink = await fetchNestedHref(page, navigateLink);
    const product = { title, price, image, href: purchasableLink };
    console.log(product);

    data.push(product);
  }

  return { data };
};

const fetchNestedHref = async (page: Page, navigateLink: string) => {
  let purchasableLink = '';
  await page.goto(navigateLink);
  await node.setTimeout(1000);
  await page.waitForSelector(selectors.general.urls);
  const linkList = (await page.$$(
    selectors.general.urls
  )) as ElementHandle<HTMLAnchorElement>[];

  for (const el of linkList) {
    const href = await el.evaluate(el => el.href || '');
    if (href?.includes('paisplus')) {
      purchasableLink = href;
    }
  }

  await page.goBack();
  await page.waitForSelector(selectors.general.items);
  await page.$$(selectors.general.items);

  return purchasableLink;
};

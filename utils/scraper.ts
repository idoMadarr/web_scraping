import { ElementHandle, Page } from 'puppeteer';
import fs from 'fs';
import node from 'node:timers/promises';
import selectors from './selectors';
import { DBType, ItemType, ProviderType } from '../types';
import BotAutomation from '../models/BotAutomation';

export const onScraper = async (
  page: Page,
  bot: BotAutomation,
  provider: ProviderType
) => {
  const items = await page.$$(selectors.general.items);

  for (const item of items) {
    const title = await item.$eval(
      selectors.general.title,
      el => el.textContent?.trim() || null
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
    let link = 'N/a';
    let price = '';

    if (href) {
      const nestedData = await fetchNestedData(page, navigateLink, provider);
      price = nestedData.price;
      link = nestedData.link;
    }

    const product = { title, price, image, href: link };
    console.log(product);

    localStore(product);
  }
};

const fetchNestedData = async (
  page: Page,
  navigateLink: string,
  provider: ProviderType
) => {
  let nestedData = { link: '', price: '0' };

  try {
    await page.goto(navigateLink);
    await node.setTimeout(1000);
    await page.waitForSelector(selectors.general.item, { timeout: 3000 });

    const items = (await page.$$(
      selectors.general.item
    )) as ElementHandle<HTMLAnchorElement>[];

    if (items.length) {
      for (const item of items) {
        const providerName = await item.evaluate(
          el => el.textContent?.trim() || ''
        );
        if (providerName.includes(provider.hebSelector)) {
          // Selcet price
          nestedData.price = await item.$eval(
            selectors.general.item_price,
            el => el.textContent || 'N/a'
          );

          // Selcet link
          const hrefs = await item.$$eval(
            selectors.general.item_link,
            elements => elements.map(el => el?.getAttribute('href') || 'N/a')
          );

          const href = hrefs.find(href => href.includes(provider.engSelector));

          nestedData.link = href || 'N/a';
        }
      }
    }
  } catch (error) {
    console.error(
      `Skipping broken link: ${navigateLink}, error: ${JSON.stringify(error)}`
    );
  }

  try {
    await page.goBack();
    await node.setTimeout(1000);
    await page.waitForSelector(selectors.general.items);
    await page.$$(selectors.general.items);
  } catch (error) {
    console.warn(
      `Could not go back to main page after broken link: ${navigateLink}`
    );
  }

  return nestedData;
};

// Store on local cache db:
const localStore = async (providerData: ItemType) => {
  try {
    const fileContent = fs.readFileSync(`db/${process.env.CACHE_DB}`, 'utf8');
    const currentData: DBType = JSON.parse(fileContent);

    const updatedData = [...currentData.data];
    updatedData.push(providerData);

    const storedData: DBType = { data: updatedData };

    fs.writeFileSync(
      `db/${process.env.CACHE_DB}`,
      JSON.stringify(storedData),
      'utf8'
    );
  } catch (error) {
    console.log(`Error while store on cache: ${JSON.stringify(error)}`);
  }
};

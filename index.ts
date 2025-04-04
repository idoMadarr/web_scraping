import { Page } from 'puppeteer';
import * as dotenv from 'dotenv';
import { onScraper } from './utils/scraper';
import createBot from './utils/createBot';
import providersList from './utils/providers.js';
import BotAutomation from './models/BotAutomation';

dotenv.config();

const startScraping = async () => {
  const { page, bot } = await createBot();

  const providers = Object.values(providersList);
  for (const provider of providers) {
    await providerScraper(provider, page, bot);
  }

  await bot.closeAutomation();
  console.log('-- DONE --');
};

const providerScraper = async (
  provider: string,
  page: Page,
  bot: BotAutomation
) => {
  try {
    await page.goto(`${process.env.URL}/${provider}`, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });

    // Start scraping data:
    await onScraper(page, bot);
  } catch (error) {
    console.log(`Error occur on ${provider}:`, error);
  }
};

startScraping();

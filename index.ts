import { Page } from 'puppeteer';
import fs from 'fs';
import * as dotenv from 'dotenv';
import { onScraper } from './utils/scraper';
import createBot from './utils/createBot';
import providersList from './utils/providers.js';
import { DBType, ProviderType } from './types';
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
  provider: ProviderType,
  page: Page,
  bot: BotAutomation
) => {
  try {
    // Open new tab:
    await page.goto(`${process.env.URL}/${provider.name}`, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });

    // Start scraping data:
    await onScraper(page, bot, provider);
  } catch (error) {
    console.log(`Error occur on ${provider.name}:`, error);
  }
};

startScraping();

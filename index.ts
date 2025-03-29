import { Page } from "puppeteer";
import fs from "fs";
import * as dotenv from "dotenv";
import { onScraper } from "./utils/scraper";
import createBot from "./utils/createBot";
import providersList from "./utils/providers.js";
import { DBType } from "./types";

dotenv.config();

const startScraping = async () => {
  const { page, bot } = await createBot();

  const providers = Object.values(providersList);
  for (const provider of providers) {
    await providerScraper(provider, page);
  }

  await bot.closeAutomation();
  console.log("-- DONE --");
};

const providerScraper = async (provider: string, page: Page) => {
  try {
    // Open new tab:
    await page.goto(`${process.env.URL}/${provider}`, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    // Start scraping data:
    const providerData = await onScraper(page);

    // Store on local cache db:
    const fileContent = fs.readFileSync(`db/${process.env.CACHE_DB}`, "utf8");
    const currentData = JSON.parse(fileContent);
    const data: DBType = { ...currentData, [provider]: providerData };
    fs.writeFileSync(
      `db/${process.env.CACHE_DB}`,
      JSON.stringify(data),
      "utf8"
    );
  } catch (error) {
    console.log(`Error occur on ${provider}:`, error);
  }
};

startScraping();

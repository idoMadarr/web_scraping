import { Page } from "puppeteer";
import { Provider, Selector} from "./interfaces/index.js";
import { providerFetch } from "./providers/providerFetch";
import fs  from "fs";
import createBot from "./utils/createBot";
import providers from "./providers/providersList";

const startScraping = async () => {
  const { page } = await createBot();
  await Promise.all(providers.map(provider => scrapProvider(page,provider)));
};

const scrapProvider = async ( page: Page,provider:Provider) => {
  await page.goto(provider.url, {
    waitUntil: "networkidle2",
    timeout: 60000,
    });
  const providerData = await providerFetch(page, provider.selector);
  const jsonData = JSON.stringify(providerData, null, 2);
  fs.writeFileSync("data.json", jsonData, "utf8");
};
startScraping();

import puppeteer from "puppeteer";
import BotAutomation from "../models/BotAutomation";

const createBot = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [" --start-maximized"],
  });

  const page = await browser.newPage();
  const bot = new BotAutomation(browser, page);

  await page.setViewport({ width: 1400, height: 800, deviceScaleFactor: 1 });

  return { page, bot };
};

export default createBot;

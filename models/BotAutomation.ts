import node from "node:timers/promises";
import { Browser, Page } from "puppeteer";

const SETTINGS = {
  visible: true,
  timeout: 900000,
};
const TIMEOUT = 700;

export default class BotAutomation {
  private browser: Browser;
  private page: Page;

  constructor(browser: Browser, page: Page) {
    this.browser = browser;
    this.page = page;
  }

  async waitAndClick(selector: string) {
    await this.page.waitForSelector(selector, SETTINGS);
    await node.setTimeout(TIMEOUT); // Delay between actions
    await this.page.click(selector);
  }

  async waitAndType(selector: string, text: string) {
    await this.page.waitForSelector(selector, SETTINGS);
    await node.setTimeout(TIMEOUT);
    await this.page.type(selector, text);
  }

  async closeAutomation() {
    await this.browser.close();
  }
}

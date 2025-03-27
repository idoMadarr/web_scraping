import node from "node:timers/promises";
import { Browser, ElementHandle, Page } from "puppeteer";

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

  async detectDynamicElement(selector: string) {
    try {
      const element = await this.page.waitForSelector(selector, {
        visible: true,
        timeout: 3000,
      });

      if (element) {
        return element;
      }
    } catch (error) {
      return null;
    }
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

  async searchWaitAndClick(selector: string, search: string) {
    await this.page.waitForSelector(selector, SETTINGS);
    const elements = await this.page.$$(selector);
    await node.setTimeout(TIMEOUT);
    for (const el of elements) {
      const text = await el.evaluate((el) => el?.textContent?.trim());
      if (text?.includes(search)) {
        await el.click();
        break;
      }
    }
  }

  async seachForText(element: ElementHandle<Element>, search: string) {
    const text = await this.page.evaluate(
      (el: any) => el.textContent.trim(),
      element
    );

    return text.includes(search) ? true : false;
  }

  async nativeSelector(
    selector: string,
    search: string,
    exact: boolean = false
  ) {
    await node.setTimeout(TIMEOUT);
    await this.page.evaluate(
      (selector: string, search: string, exact: boolean) => {
        const element = Array.from(document.querySelectorAll(selector)).find(
          (el: any) => {
            if (exact) return el.textContent.trim() == search;

            return (
              el.textContent.trim() == search ||
              el.textContent.trim().includes(search)
            );
          }
        );

        if (element) {
          // @ts-ignore:
          element.click();
        }
      },
      selector,
      search,
      exact
    );
  }

  async closeAutomation() {
    await this.browser.close();
  }
}

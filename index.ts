import connection from "./utils/connection";
import createBot from "./utils/createBot";

const SETTINGS = {
  visible: true,
  timeout: 900000,
};

const startScraping = async () => {
  const { page, bot } = await createBot();
  await page.goto(connection, {
    waitUntil: "networkidle2",
  });

  console.log("1");
  //   const test = await page.waitForSelector(".style_providers__KxAvk", SETTINGS);

  const newList = [];

  const items = await page.$$(".style_center__2HkpR"); // Select all elements with the class "item-class"
  for (const item of items) {
    // const newItem = new item(..,);
    // newList.push(newItem);
    // const text = await item.evaluate((el) => el.textContent);
  }
};

startScraping();

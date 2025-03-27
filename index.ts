import { fetchPaisPlus } from "./providers/paisplus";
import connection from "./utils/connection";
import createBot from "./utils/createBot";

const startScraping = async () => {
  await scrapPaisplus();
  // ... other providers ...
};

const scrapPaisplus = async () => {
  const { page, bot } = await createBot();
  await page.goto(connection.paisplus, {
    waitUntil: "networkidle2",
  });

  const paisPlusData = await fetchPaisPlus(page);
  console.log(paisPlusData, "paisPlusData");
};

startScraping();

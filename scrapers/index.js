const puppeteer = require("puppeteer");
const avoidDetection = require("./util");

const __launchPuppeteer = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await avoidDetection(page);

  await page.goto(url);
  return page;
};

const scrapeIndeed = async (url) => {
  const page = await __launchPuppeteer(url);

  const jobs = await page.evaluate(() => {
    const jobs = document.getElementsByClassName(
      "jobsearch-SerpJobCard unifiedRow row result clickcard"
    ).length;
    return jobs;
  });

  return jobs;
};

module.exports = { scrapeIndeed };

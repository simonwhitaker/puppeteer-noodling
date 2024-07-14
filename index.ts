import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

// Launch the browser and open a new blank page
const browser = await puppeteer.launch();
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto(
  "https://blog.cloudflare.com/1-1-1-1-lookup-failures-on-october-4th-2023/"
  //   { waitUntil: "networkidle0" }
);

// Locate the full title
const textSelector = await page.locator("title").waitHandle();
const fullTitle = await textSelector?.evaluate((el) => el.textContent);

// Print the full title.
console.log('The title of this page is "%s".', fullTitle);

const data = await page.evaluate(() => document.querySelector("*")?.outerHTML);

if (data) {
  const $ = cheerio.load(data);
  const text = $("body").text();
  console.log(text);
}

await browser.close();

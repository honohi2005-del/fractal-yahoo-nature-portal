import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const NEWS_LIMIT = 8;
const FEEDS = Object.freeze({
  major: "https://news.yahoo.co.jp/rss/topics/top-picks.xml",
  economy: "https://news.yahoo.co.jp/rss/categories/business.xml",
  entertainment: "https://news.yahoo.co.jp/rss/categories/entertainment.xml",
  sports: "https://news.yahoo.co.jp/rss/categories/sports.xml",
  domestic: "https://news.yahoo.co.jp/rss/categories/domestic.xml",
  world: "https://news.yahoo.co.jp/rss/categories/world.xml",
  it: "https://news.yahoo.co.jp/rss/categories/it.xml",
  science: "https://news.yahoo.co.jp/rss/categories/science.xml",
});

const outputPath = fileURLToPath(new URL("../dist/latest-news.json", import.meta.url));

function decodeXml(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function getTag(block, tagName) {
  const match = block.match(new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return match ? decodeXml(match[1]).replace(/\s+/g, " ").trim() : "";
}

function isYahooNewsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "news.yahoo.co.jp";
  } catch {
    return false;
  }
}

function parseFeed(xml) {
  return [...xml.matchAll(/<item>[\s\S]*?<\/item>/gi)]
    .map((match, index) => ({
      title: getTag(match[0], "title"),
      url: getTag(match[0], "link"),
      isNew: index < 3,
    }))
    .filter((item) => item.title && isYahooNewsUrl(item.url))
    .slice(0, NEWS_LIMIT);
}

async function fetchFeed(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/rss+xml, application/xml, text/xml;q=0.9",
      "User-Agent": "information-forest-news-updater/1.0",
    },
  });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  const items = parseFeed(await response.text());
  if (items.length < NEWS_LIMIT) {
    throw new Error(`${url} returned only ${items.length} Yahoo article links`);
  }
  return items;
}

const feeds = {};
for (const [key, url] of Object.entries(FEEDS)) {
  feeds[key] = await fetchFeed(url);
}

const next = `${JSON.stringify({ source: "Yahoo! JAPAN RSS", feeds }, null, 2)}\n`;
let previous = "";
try {
  previous = await readFile(outputPath, "utf8");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

if (previous !== next) {
  await writeFile(outputPath, next, "utf8");
  console.log(`Updated ${outputPath} with ${Object.keys(feeds).length} Yahoo categories.`);
} else {
  console.log("Yahoo news snapshot is already current.");
}

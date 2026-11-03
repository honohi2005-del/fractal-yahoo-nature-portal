import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const OUTPUT = resolve("dist/forest-images.json");
const API = "https://commons.wikimedia.org/w/api.php";
const USER_AGENT = "Fractal-Yahoo-Nature-Portal/1.0 (https://github.com/honohi2005-del/fractal-yahoo-nature-portal)";

const SEARCHES = [
  "patterns in nature",
  "fractal nature",
  "tree branches landscape",
  "river delta aerial",
  "coastline aerial",
  "mountain ridge landscape",
  "forest canopy",
  "cloud formation landscape",
  "sand dunes patterns",
  "snow patterns landscape",
  "ice patterns nature",
  "water ripples nature",
  "fern forest",
  "leaf veins nature",
  "coral reef aerial",
  "moss macro nature",
  "rock strata landscape",
  "volcanic landscape",
  "terraced fields landscape",
  "winding river landscape",
  "fog forest",
  "sunlight forest",
  "autumn forest",
  "desert landscape",
  "ocean waves aerial",
  "geological formations",
  "canyon landscape",
  "glacier landscape",
  "tundra landscape",
  "bamboo forest",
];

const CATEGORIES = [
  "Category:Patterns in nature",
  "Category:Landscape photography",
  "Category:Landscapes",
  "Category:Natural phenomena",
];

const natureWords = /forest|tree|wood|river|delta|coast|shore|ocean|sea|wave|lake|mountain|ridge|valley|canyon|desert|dune|snow|ice|glacier|cloud|sky|leaf|fern|moss|coral|rock|stone|volcan|landscape|nature|pattern|fractal|earth|beach|rain|fog|mist|sunlight|autumn|bamboo|tundra|meadow|field|flower|island|waterfall|stream|fjord|cliff|garden/i;

function cleanText(value, limit = 240) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function metadataValue(extmetadata, key) {
  return cleanText(extmetadata?.[key]?.value ?? "");
}

async function commonsApi(params) {
  const url = new URL(API);
  for (const [key, value] of Object.entries({ ...params, format: "json", origin: "*" })) {
    url.searchParams.set(key, value);
  }
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) throw new Error(`Commons API ${response.status} for ${url}`);
  return response.json();
}

function isUsablePage(page) {
  const info = page.imageinfo?.[0];
  if (!info || info.mediatype !== "BITMAP") return false;
  if (!/^image\/(jpeg|png|webp)$/i.test(info.mime ?? "")) return false;
  const width = Number(info.width ?? 0);
  const height = Number(info.height ?? 0);
  if (width < 900 || height < 500) return false;
  if (width / height < 1.25) return false;
  const text = `${page.title} ${metadataValue(info.extmetadata, "ImageDescription")}`;
  if (!natureWords.test(text)) return false;
  const license = metadataValue(info.extmetadata, "LicenseShortName");
  if (!license) return false;
  return Boolean(info.thumburl || info.url);
}

function commonsThumbnailUrl(original, width = 1280) {
  try {
    const url = new URL(original);
    const marker = "/wikipedia/commons/";
    const markerIndex = url.pathname.indexOf(marker);
    if (markerIndex === -1) return "";
    const relativePath = url.pathname.slice(markerIndex + marker.length);
    const filename = relativePath.split("/").at(-1);
    if (!relativePath || !filename) return "";
    return `https://thumb.wikimedia.org/wikipedia/commons/thumb/${relativePath}/${width}px-${filename}`;
  } catch {
    return "";
  }
}

function toRecord(page) {
  const info = page.imageinfo[0];
  const extmetadata = info.extmetadata ?? {};
  const title = page.title.replace(/^File:/i, "").trim();
  const pageUrl = `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title.replaceAll(" ", "_"))}`;
  return {
    title,
    image: commonsThumbnailUrl(info.url) || info.thumburl || info.url,
    original: info.url,
    source: pageUrl,
    author: metadataValue(extmetadata, "Artist") || "作者情報は出典ページを確認",
    license: metadataValue(extmetadata, "LicenseShortName") || "Wikimedia Commonsの出典ページを確認",
    licenseUrl: metadataValue(extmetadata, "LicenseUrl"),
    alt: metadataValue(extmetadata, "ImageDescription", 180) || title,
    width: Number(info.width ?? 0),
    height: Number(info.height ?? 0),
  };
}

async function addSearchResults(records, seen, query) {
  const data = await commonsApi({
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrnamespace: "6",
    gsrlimit: "50",
    prop: "imageinfo",
    iiprop: "url|size|mime|mediatype|extmetadata",
    iiurlwidth: "1280",
  });
  for (const page of Object.values(data.query?.pages ?? {})) {
    if (!isUsablePage(page)) continue;
    const record = toRecord(page);
    const key = record.original || record.image;
    if (!seen.has(key)) {
      seen.add(key);
      records.push({ ...record, query });
    }
  }
}

async function addCategoryResults(records, seen, category) {
  let cmcontinue = null;
  for (let pageNumber = 0; pageNumber < 3; pageNumber += 1) {
    const params = {
      action: "query",
      list: "categorymembers",
      cmtitle: category,
      cmnamespace: "6",
      cmtype: "file",
      cmlimit: "500",
      prop: "imageinfo",
    iiprop: "url|size|mime|mediatype|extmetadata",
      iiurlwidth: "1280",
    };
    if (cmcontinue) params.cmcontinue = cmcontinue;
    const data = await commonsApi(params);
    const titles = (data.query?.categorymembers ?? []).map((item) => item.title).join("|");
    if (titles) {
      const details = await commonsApi({
        action: "query",
        titles,
        prop: "imageinfo",
    iiprop: "url|size|mime|mediatype|extmetadata",
        iiurlwidth: "1280",
      });
      for (const page of Object.values(details.query?.pages ?? {})) {
        if (!isUsablePage(page)) continue;
        const record = toRecord(page);
        const key = record.original || record.image;
        if (!seen.has(key)) {
          seen.add(key);
          records.push({ ...record, query: category });
        }
      }
    }
    cmcontinue = data.continue?.cmcontinue;
    if (!cmcontinue) break;
  }
}

function stableOrder(records) {
  return records
    .map((record) => ({ record, score: hashString(record.original || record.title) }))
    .sort((a, b) => a.score - b.score)
    .map(({ record }) => record);
}

function hashString(input) {
  let value = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    value ^= input.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }
  return (value >>> 0) / 4294967296;
}

const records = [];
const seen = new Set();

for (const query of SEARCHES) {
  await addSearchResults(records, seen, query);
  process.stderr.write(`searched ${query}: ${records.length}\n`);
}

if (records.length < 365) {
  for (const category of CATEGORIES) {
    await addCategoryResults(records, seen, category);
    process.stderr.write(`category ${category}: ${records.length}\n`);
    if (records.length >= 365) break;
  }
}

if (records.length < 365) {
  throw new Error(`Only found ${records.length} usable Commons images; 365 are required.`);
}

const images = stableOrder(records).slice(0, 365).map(({ query, ...record }, index) => ({
  day: index + 1,
  ...record,
}));

await mkdir(dirname(OUTPUT), { recursive: true });
await writeFile(OUTPUT, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  source: "Wikimedia Commons API",
  attributionNote: "Images are loaded from Wikimedia Commons thumbnails. Follow each source and license link for attribution details.",
  images,
}, null, 2)}\n`, "utf8");

console.log(JSON.stringify({ output: OUTPUT, count: images.length, first: images[0]?.title, last: images.at(-1)?.title }));

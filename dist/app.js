const portalData = {
  major: { label: "主要", note: "ニュースの主要な話題へ", url: "https://news.yahoo.co.jp/" },
  economy: { label: "経済", note: "経済と市場の話題へ", url: "https://news.yahoo.co.jp/categories/business" },
  entertainment: { label: "エンタメ", note: "映画・音楽・芸能の話題へ", url: "https://news.yahoo.co.jp/categories/entertainment" },
  sports: { label: "スポーツ", note: "試合結果と速報へ", url: "https://news.yahoo.co.jp/categories/sports" },
  domestic: { label: "国内", note: "日本国内のニュースへ", url: "https://news.yahoo.co.jp/categories/domestic" },
  world: { label: "国際", note: "世界のニュースへ", url: "https://news.yahoo.co.jp/categories/world" },
  it: { label: "IT", note: "テクノロジーのニュースへ", url: "https://news.yahoo.co.jp/categories/it" },
  science: { label: "化学", note: "科学と自然のニュースへ", url: "https://news.yahoo.co.jp/categories/science" },
  local: { label: "地域", note: "地域のニュースへ", url: "https://news.yahoo.co.jp/categories/local" },
  weather: { label: "天気", note: "空模様と災害情報へ", url: "https://weather.yahoo.co.jp/" },
};

const economyHeadlines = [
  { title: "GMO熊谷社長ら 報酬を3カ月減額" },
  { title: "フラット35 金利3.81%で過去2番目" },
  { title: "SBIとフジHDが資本業務提携 発表" },
  { title: "安いもやし限界 5年で13社消える", isNew: true },
  { title: "子どものセルフレジ操作 SNS賛否", isNew: true },
  { title: "きのこの山イヤホン 再販時の配慮", isNew: true },
  { title: "永谷園「チョモモコ」販売再開へ" },
  { title: "TDL内に野良猫 運営会社の対応は" },
].map((item) => ({
  ...item,
  url: `https://search.yahoo.co.jp/search?p=${encodeURIComponent(item.title)}`,
}));

const categoryLinks = {
  economy: economyHeadlines,
};

const canvas = document.querySelector("#forestCanvas");
const stage = document.querySelector("#forestStage");
const ctx = canvas.getContext("2d");
const nodes = [...document.querySelectorAll(".portal-node")];
const panel = document.querySelector("#detailPanel");
const newsLinks = document.querySelector("#newsLinks");
const modeValue = document.querySelector("#modeValue");
const quietButton = document.querySelector("#quietButton");
const dailyPhoto = document.querySelector("#dailyPhoto");
const dailyCreditLabel = document.querySelector("#dailyCreditLabel");
const dailyCreditLink = document.querySelector("#dailyCreditLink");
const installButton = document.querySelector("#installButton");

let width = 0;
let height = 0;
let dpr = 1;
let rafId = 0;
let time = 0;
let quiet = false;
let selectedNode = null;
let activeDailyDay = 0;
let deferredInstallPrompt = null;

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function dayOfYear(date = new Date()) {
  const yearStart = Date.UTC(date.getFullYear(), 0, 1);
  const currentDay = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((currentDay - yearStart) / 86400000) + 1;
}

function applyDailyImage(record, day) {
  if (!record?.image || !dailyPhoto) return;
  const imageUrl = JSON.stringify(record.image);

  // Set the background immediately so the photo is visible while the
  // eager decode finishes. Waiting for onload left the stage empty on open.
  dailyPhoto.style.backgroundImage = `url(${imageUrl})`;
  dailyPhoto.dataset.title = record.title;
  dailyPhoto.dataset.day = String(day);
  if (dailyCreditLabel) dailyCreditLabel.textContent = "今日の背景";
  if (dailyCreditLink) {
    dailyCreditLink.href = record.source;
    dailyCreditLink.title = `${record.title} / ${record.author} / ${record.license}`;
    dailyCreditLink.setAttribute("aria-label", `今日の背景: ${record.title}。${record.author}。${record.license}`);
  }

  const preload = new Image();
  preload.decoding = "async";
  preload.loading = "eager";
  preload.fetchPriority = "high";
  preload.onload = () => {
    dailyPhoto.classList.add("is-ready");
  };
  preload.onerror = () => console.warn("Today's forest image could not be decoded.", record.image);
  preload.src = record.image;
}

async function loadDailyImage() {
  try {
    const response = await fetch("forest-images.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`forest-images.json ${response.status}`);
    const payload = await response.json();
    const images = Array.isArray(payload.images) ? payload.images : [];
    if (images.length < 365) throw new Error(`Expected 365 images, received ${images.length}`);
    const day = dayOfYear();
    const record = images[(day - 1) % images.length];
    activeDailyDay = day;
    applyDailyImage(record, day);
  } catch (error) {
    console.warn("Daily forest image could not be loaded.", error);
  }
}

function hashString(input) {
  let value = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    value ^= input.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }
  return (value >>> 0) / 4294967296;
}

function randomFrom(seed) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function resizeCanvas() {
  const rect = stage.getBoundingClientRect();
  width = rect.width;
  height = rect.height;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawBackground() {
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, quiet ? "rgba(156,188,174,.74)" : "rgba(232,245,212,.34)");
  sky.addColorStop(0.38, quiet ? "rgba(111,157,136,.7)" : "rgba(185,220,185,.3)");
  sky.addColorStop(0.72, quiet ? "rgba(62,110,95,.72)" : "rgba(111,157,128,.34)");
  sky.addColorStop(1, quiet ? "rgba(25,61,56,.82)" : "rgba(42,88,73,.46)");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  const sunX = width * 0.34;
  const sunY = height * 0.13;
  const glow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, Math.min(width, height) * .28);
  glow.addColorStop(0, quiet ? "rgba(237,255,220,.24)" : "rgba(255,255,215,.72)");
  glow.addColorStop(.2, quiet ? "rgba(202,239,204,.18)" : "rgba(255,245,184,.42)");
  glow.addColorStop(.52, quiet ? "rgba(147,210,174,.1)" : "rgba(177,224,176,.18)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  const rayLength = Math.max(width, height) * 1.35;
  for (let i = 0; i < 11; i += 1) {
    const angle = 1.02 + (i - 5) * .13;
    const spread = .018 + randomFrom(i * 7.2 + 3) * .026;
    const farLeftX = sunX + Math.cos(angle - spread) * rayLength;
    const farLeftY = sunY + Math.sin(angle - spread) * rayLength;
    const farRightX = sunX + Math.cos(angle + spread) * rayLength;
    const farRightY = sunY + Math.sin(angle + spread) * rayLength;
    const ray = ctx.createLinearGradient(sunX, sunY, (farLeftX + farRightX) / 2, (farLeftY + farRightY) / 2);
    ray.addColorStop(0, quiet ? "rgba(235,255,221,.07)" : "rgba(255,249,194,.21)");
    ray.addColorStop(.48, quiet ? "rgba(220,249,210,.035)" : "rgba(255,246,201,.1)");
    ray.addColorStop(1, "rgba(255,255,220,0)");
    ctx.fillStyle = ray;
    ctx.beginPath();
    ctx.moveTo(sunX, sunY);
    ctx.lineTo(farLeftX, farLeftY);
    ctx.lineTo(farRightX, farRightY);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  const sun = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, Math.min(width, height) * .085);
  sun.addColorStop(0, "rgba(255,255,232,.92)");
  sun.addColorStop(.28, "rgba(255,244,183,.68)");
  sun.addColorStop(1, "rgba(255,234,164,0)");
  ctx.fillStyle = sun;
  ctx.fillRect(sunX - width * .14, sunY - height * .14, width * .28, height * .28);

  const horizon = height * .72;
  ctx.fillStyle = quiet ? "rgba(10, 39, 36, .78)" : "rgba(24, 72, 56, .56)";
  ctx.beginPath();
  ctx.moveTo(0, horizon + 22);
  for (let x = 0; x <= width + 80; x += 80) {
    const y = horizon - Math.sin(x * .006 + .4) * 22 - Math.cos(x * .017) * 9;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();

  const mist = ctx.createLinearGradient(0, horizon - 40, 0, height);
  mist.addColorStop(0, quiet ? "rgba(156, 222, 185, .08)" : "rgba(228, 249, 211, .3)");
  mist.addColorStop(.35, quiet ? "rgba(77, 145, 113, .05)" : "rgba(185, 225, 181, .14)");
  mist.addColorStop(1, quiet ? "rgba(4, 18, 18, .1)" : "rgba(17, 59, 45, .08)");
  ctx.fillStyle = mist;
  ctx.fillRect(0, horizon - 48, width, height - horizon + 48);
}

function drawTwig(x, y, length, angle, lineWidth, depth, seed, opacity = 1) {
  if (depth <= 0 || length < 2) {
    const leafSize = Math.max(.7, Math.min(3.2, length * .12));
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.globalAlpha = opacity * (.45 + randomFrom(seed + 7) * .55);
    ctx.fillStyle = depth % 2 ? "#9edeb9" : "#d6e7a8";
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.ellipse(0, 0, leafSize * 1.7, leafSize, randomFrom(seed + 3) * Math.PI, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  const sway = Math.sin(time * .0007 + seed) * (quiet ? .002 : .007) * (depth < 5 ? 1 : .4);
  const endX = x + Math.cos(angle + sway) * length;
  const endY = y + Math.sin(angle + sway) * length;
  const branchAlpha = opacity * (depth > 5 ? .72 : .52);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = depth > 6 ? `rgba(22, 55, 47, ${branchAlpha})` : `rgba(104, 166, 128, ${branchAlpha})`;
  ctx.lineWidth = Math.max(.45, lineWidth);
  ctx.lineCap = "round";
  ctx.stroke();

  const split = .47 + randomFrom(seed + depth * 1.7) * .14;
  const childLength = length * (.63 + randomFrom(seed + 1) * .1);
  const angleSpread = .22 + randomFrom(seed + 2) * .26;
  drawTwig(endX, endY, childLength, angle - angleSpread + sway, lineWidth * .68, depth - 1, seed + 11.1, opacity);
  drawTwig(endX, endY, childLength * split, angle + angleSpread + sway, lineWidth * .58, depth - 1, seed + 24.7, opacity);
  if (depth > 5) {
    drawTwig(endX, endY, length * .42, angle + (randomFrom(seed + 8) - .5) * .22, lineWidth * .42, depth - 2, seed + 31.8, opacity * .78);
  }
}

function drawWaterLines() {
  const baseY = height * .82;
  ctx.save();
  ctx.globalAlpha = quiet ? .12 : .2;
  ctx.lineWidth = 1;
  for (let row = 0; row < 8; row += 1) {
    const y = baseY + row * 13;
    ctx.beginPath();
    for (let x = width * .12; x < width * .9; x += 18) {
      const wave = Math.sin(x * .018 + row * .7 + time * .0004) * (2 + row * .2);
      if (x === width * .12) ctx.moveTo(x, y + wave);
      else ctx.lineTo(x, y + wave);
    }
    ctx.strokeStyle = row % 2 ? "#91cfbd" : "#557f75";
    ctx.stroke();
  }
  ctx.restore();
}

function drawFireflies() {
  const count = Math.round(Math.min(46, width / 23));
  ctx.save();
  for (let i = 0; i < count; i += 1) {
    const x = randomFrom(i * 33.17 + 1) * width;
    const y = height * (.18 + randomFrom(i * 18.4 + 4) * .67);
    const pulse = .3 + Math.sin(time * .0011 + i) * .22;
    ctx.globalAlpha = (quiet ? .18 : .32) + pulse;
    ctx.fillStyle = i % 3 === 0 ? "#f7d995" : "#9de4bf";
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(x, y, 1.1 + (i % 3) * .35, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawScene() {
  ctx.clearRect(0, 0, width, height);
  drawBackground();
  drawWaterLines();

  const trunkX = width * .52;
  const trunkY = height * .92;
  const trunkLength = Math.min(width, height) * .31;
  drawTwig(trunkX, trunkY, trunkLength, -Math.PI / 2, Math.max(2.8, width * .004), 8, 7.42, quiet ? .68 : .96);

  ctx.save();
  ctx.globalAlpha = quiet ? .14 : .25;
  ctx.strokeStyle = "#83cdb0";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(trunkX, height * .53, Math.min(width, height) * .16, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  drawFireflies();
  if (!reducedMotion) rafId = requestAnimationFrame((nextTime) => { time = nextTime; drawScene(); });
}

function openNode(node) {
  const key = node.dataset.node;
  const data = portalData[key];
  if (!data) return;
  selectedNode?.classList.remove("is-selected");
  selectedNode = node;
  selectedNode.classList.add("is-selected");
  const links = categoryLinks[key] || [{ title: `${data.label}のニュースを開く`, url: data.url }];
  newsLinks.replaceChildren(...links.map((item) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = item.title;
    if (item.isNew) {
      const badge = document.createElement("span");
      badge.className = "news-badge";
      badge.textContent = "NEW";
      badge.setAttribute("aria-label", "新着");
      link.append(badge);
    }
    listItem.append(link);
    return listItem;
  }));
  panel.classList.add("is-open");
  panel.setAttribute("aria-hidden", "false");
}

function closeNode() {
  selectedNode?.classList.remove("is-selected");
  selectedNode = null;
  panel.classList.remove("is-open");
  panel.setAttribute("aria-hidden", "true");
}

function updateClock() {
  const now = new Date();
  const formatted = new Intl.DateTimeFormat("ja-JP", { hour: "2-digit", minute: "2-digit", hour12: false }).format(now);
  const clock = document.querySelector("#localClock");
  clock.textContent = formatted;
  clock.dateTime = now.toISOString();
}

document.querySelector("#searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = document.querySelector("#searchInput").value.trim();
  if (!query) {
    document.querySelector("#searchInput").focus();
    return;
  }
  window.open(`https://search.yahoo.co.jp/search?p=${encodeURIComponent(query)}`, "_blank", "noopener,noreferrer");
});

nodes.forEach((node) => {
  node.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openNode(node);
  });
  node.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openNode(node);
    }
  });
});

document.querySelector("#detailClose").addEventListener("click", closeNode);
document.querySelector("#resetButton").addEventListener("click", () => {
  closeNode();
  document.querySelector("#searchInput").value = "";
  document.querySelector("#searchInput").focus();
});

quietButton.addEventListener("click", () => {
  quiet = !quiet;
  document.body.classList.toggle("quiet-mode", quiet);
  quietButton.setAttribute("aria-pressed", String(quiet));
  quietButton.setAttribute("aria-label", quiet ? "通常の表示に戻す" : "静かな表示に切り替える");
  modeValue.textContent = quiet ? "QUIET" : "FLOW";
  if (reducedMotion) drawScene();
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  if (installButton) installButton.hidden = false;
});

installButton?.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installButton.hidden = true;
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  if (installButton) installButton.hidden = true;
});

window.addEventListener("resize", () => { resizeCanvas(); drawScene(); });
resizeCanvas();
updateClock();
loadDailyImage();
setInterval(updateClock, 30000);
setInterval(() => {
  const day = dayOfYear();
  if (day !== activeDailyDay) loadDailyImage();
}, 60000);
drawScene();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js?v=news-links", { scope: "./" }).catch((error) => {
      console.warn("Service Worker could not be registered.", error);
    });
  });
}

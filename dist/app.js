const portalData = {
  news: { label: "ニュース", note: "今日の主要な話題へ", url: "https://news.yahoo.co.jp/" },
  weather: { label: "天気", note: "空模様と災害情報へ", url: "https://weather.yahoo.co.jp/" },
  sports: { label: "スポーツ", note: "試合結果と速報へ", url: "https://sports.yahoo.co.jp/" },
  finance: { label: "ファイナンス", note: "市場の動きを見る", url: "https://finance.yahoo.co.jp/" },
  services: { label: "サービス", note: "すべての入口を一覧で見る", url: "https://services.yahoo.co.jp/" },
  mail: { label: "メール", note: "受信箱へ", url: "https://mail.yahoo.co.jp/" },
  shopping: { label: "ショッピング", note: "買い物の入口へ", url: "https://shopping.yahoo.co.jp/" },
  map: { label: "地図", note: "場所と道を探す", url: "https://map.yahoo.co.jp/" },
};

const canvas = document.querySelector("#forestCanvas");
const stage = document.querySelector("#forestStage");
const ctx = canvas.getContext("2d");
const nodes = [...document.querySelectorAll(".portal-node")];
const panel = document.querySelector("#detailPanel");
const detailIcon = document.querySelector("#detailIcon");
const detailKicker = document.querySelector("#detailKicker");
const detailTitle = document.querySelector("#detailTitle");
const detailNote = document.querySelector("#detailNote");
const detailLink = document.querySelector("#detailLink");
const modeValue = document.querySelector("#modeValue");
const quietButton = document.querySelector("#quietButton");

let width = 0;
let height = 0;
let dpr = 1;
let rafId = 0;
let time = 0;
let quiet = false;
let selectedNode = null;

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  sky.addColorStop(0, quiet ? "#071619" : "#0b2627");
  sky.addColorStop(0.48, quiet ? "#0a2022" : "#123635");
  sky.addColorStop(1, "#061416");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  const sunX = width * 0.52;
  const sunY = height * 0.28;
  const glow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, Math.min(width, height) * .28);
  glow.addColorStop(0, quiet ? "rgba(197,225,186,.11)" : "rgba(218,232,178,.2)");
  glow.addColorStop(.25, "rgba(114,192,158,.08)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  const horizon = height * .72;
  ctx.fillStyle = "rgba(5, 23, 24, .8)";
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
  mist.addColorStop(0, "rgba(113, 182, 158, .08)");
  mist.addColorStop(.35, "rgba(35, 86, 79, .05)");
  mist.addColorStop(1, "rgba(4, 18, 18, .1)");
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
  detailIcon.innerHTML = node.querySelector(".node-icon").innerHTML;
  detailIcon.style.color = getComputedStyle(node).getPropertyValue("--accent");
  detailKicker.textContent = `PORTAL NODE / ${key.toUpperCase()}`;
  detailTitle.textContent = data.label;
  detailNote.textContent = data.note;
  detailLink.href = data.url;
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

window.addEventListener("resize", () => { resizeCanvas(); drawScene(); });
resizeCanvas();
updateClock();
setInterval(updateClock, 30000);
drawScene();

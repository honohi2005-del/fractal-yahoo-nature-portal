const portalData = {
  major: { label: "主要", note: "ニュースの主要な話題へ", url: "https://news.yahoo.co.jp/" },
  economy: { label: "経済", note: "経済と市場の話題へ", url: "https://news.yahoo.co.jp/categories/business" },
  entertainment: { label: "エンタメ", note: "映画・音楽・芸能の話題へ", url: "https://news.yahoo.co.jp/categories/entertainment" },
  sports: { label: "スポーツ", note: "試合結果と速報へ", url: "https://news.yahoo.co.jp/categories/sports" },
  domestic: { label: "国内", note: "日本国内のニュースへ", url: "https://news.yahoo.co.jp/categories/domestic" },
  world: { label: "国際", note: "世界のニュースへ", url: "https://news.yahoo.co.jp/categories/world" },
  it: { label: "IT", note: "テクノロジーのニュースへ", url: "https://news.yahoo.co.jp/categories/it" },
  science: { label: "科学", note: "科学と自然のニュースへ", url: "https://news.yahoo.co.jp/categories/science" },
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
  url: "https://news.yahoo.co.jp/categories/business",
}));

const article = (title, url, isNew = false) => ({ title, url, isNew });

const fallbackCategoryLinks = {
  major: [
    article("トランプ政権に審判 民主優勢保つ", "https://news.yahoo.co.jp/pickup/6601173?source=rss", true),
    article("大阪市行政システム 情報漏えいか", "https://news.yahoo.co.jp/pickup/6601164?source=rss", true),
    article("米巨大IT5社とも増収 7～9月期", "https://news.yahoo.co.jp/pickup/6601172?source=rss", true),
    article("詐欺G摘発 金が工藤会に渡ったか", "https://news.yahoo.co.jp/pickup/6601169?source=rss"),
    article("車が男性はね海へ転落 運転手死亡", "https://news.yahoo.co.jp/pickup/6601161?source=rss"),
    article("きのこの山イヤホン 再販時の配慮", "https://news.yahoo.co.jp/pickup/6601151?source=rss"),
    article("楽天入団の甲斐 勝ちに飢えている", "https://news.yahoo.co.jp/pickup/6601171?source=rss"),
    article("FAのオリ宗「心熱くなるほうへ」", "https://news.yahoo.co.jp/pickup/6601166?source=rss"),
  ],
  economy: economyHeadlines,
  entertainment: [
    article("BE:FIRST「CDTV」で「NOW U KNOW」TV初披露　デビュー5周年幕開けに相応しい圧倒的パフォ(vois ヴォイス)", "https://news.yahoo.co.jp/articles/2bba5a5352dd0e0defc940e42a2a3cbb86dc2cb7?source=rss", true),
    article("白石聖“柊木”が向き合う患者の死、江口洋介“進藤”の照れ笑いにも反響＜救命病棟24時＞(WEBザテレビジョン)", "https://news.yahoo.co.jp/articles/56d094a688a70cea7fb3f48fe8d9fba6d5648cce?source=rss", true),
    article("伊東歌詞太郎　体調不良でも魂の６曲でファンに感謝伝える　渋谷でフリーライブ(スポーツ報知)", "https://news.yahoo.co.jp/articles/41d8355801f16dea744f6765659cfecfe732c6b9?source=rss", true),
    article("TOMORROW X TOGETHER ヒュニンカイ、保護猫と撮影した温かなグラビアを公開(Kstyle)", "https://news.yahoo.co.jp/articles/21d274c816330e3cacd5ddec604698066a17c86b?source=rss"),
    article("ハロー！プロジェクト、熊本地震の義援金約200万円が寄せられたことを報告(テレビ朝日系（ANN）)", "https://news.yahoo.co.jp/articles/51f00e6df7c7e5895bf58d0d2b99139c52c81b7c?source=rss"),
    article("原菜乃華「木陰でスヤスヤとお昼寝」ドラマオフショットに反響「寝顔も可愛い」「どこでも寝られるの羨ましい」(スポーツ報知)", "https://news.yahoo.co.jp/articles/1594e79aa161b3ab17396a1ce33c7993eb689ad6?source=rss"),
    article("渡辺美奈代、大家族の食事会で韓国料理ポッサムを24人前手作り「めっちゃ大変そう」「大量すぎてすごい」と反響(モデルプレス)", "https://news.yahoo.co.jp/articles/c224ebad7b255c7a4ed92383e78e1f44415f73a6?source=rss"),
    article("長澤まさみ、映画『ゴジラ-0.0』でボロボロ姿も充実感「汚されるシーンはすごく好き」(ENCOUNT)", "https://news.yahoo.co.jp/articles/1f7d82f02998013683d7f821a02b91588e77cd83?source=rss"),
  ],
  sports: [
    article("【楽天】トレード加入の甲斐拓也が会見「やっぱり勝ちを届けたい」巨人時代の悔しさ糧に再起誓う(日刊スポーツ)", "https://news.yahoo.co.jp/articles/f0a609396446b19af770535fc6b7adcc92ee1c5b?source=rss", true),
    article("【JBCレディスクラシック】武豊騎手騎乗メモリアカフェは２着「前が止まらなかった」(日刊スポーツ)", "https://news.yahoo.co.jp/articles/f5b4c49c1487aeb608f2fc0d8eaf75134e8a1182?source=rss", true),
    article("美人インフルエンサー妻と笑顔の剛腕「可愛すぎ」　“ガイコツコーデ”に隠されたエピソード(Full-Count)", "https://news.yahoo.co.jp/articles/591d194583976d26cd9ad53811a98a3ea0163e86?source=rss", true),
    article("テーオーエルビスは引き続き海外のレースを視野　高柳大師「この馬が力を出せる舞台を選んでいきたいと思います」(サンケイスポーツ)", "https://news.yahoo.co.jp/articles/d686e58e840120648b67b0579579d9297ccb0d99?source=rss"),
    article("[選手権]3連覇目指す専大北上、決勝で盛岡誠桜と激突!! 花巻東と盛岡大附は準決勝で涙:岩手(ゲキサカ)", "https://news.yahoo.co.jp/articles/c43eb17b324469ded8addc8a3f0c7c359c23eec2?source=rss"),
    article("【楽天】甲斐拓也　会見全文「自分自身もレベルアップしていけるように」再起誓う(日刊スポーツ)", "https://news.yahoo.co.jp/articles/9a7efdfdb482178ce11066be55f066e6e31a5074?source=rss"),
    article("【JBCスプリント】メイショウハチロー1位入線(競馬のおはなし)", "https://news.yahoo.co.jp/articles/1482d5139fd3f08d38113cd07e06f67a6c0075ef?source=rss"),
    article("【フィギュア】「かなだい」の村元哉中さん、高橋大輔さんがスケート教室に参加、10回の節目(日刊スポーツ)", "https://news.yahoo.co.jp/articles/4a1b5526553981c4bcf7f87890bf70ebd67ca0e3?source=rss"),
  ],
  domestic: [
    article("台風31号　父島など小笠原諸島は6日まで強風や高波に注意　関東は5日に雨が強まる(日本気象協会tenki.jp)", "https://news.yahoo.co.jp/articles/5acc0efa40daa22d28ea15fd5fed265a92e605ab?source=rss", true),
    article("千葉で震度3(共同通信)", "https://news.yahoo.co.jp/articles/7d6f2622e6288c433ae3412d0ea1b41c97943dc0?source=rss", true),
    article("【秋は列車旅】肥薩線〜指宿枕崎線が2日間2000円で乗り放題　温泉地やアートを巡る鹿児島旅はいかが?(FNNプライムオンライン)", "https://news.yahoo.co.jp/articles/40fd48d1f9f1c3837e9e70fe950f4b6b831b1b8e?source=rss", true),
    article("「心から先生と呼べた」　倉本聰さんお別れの会(共同通信)", "https://news.yahoo.co.jp/articles/1695deba13c2a00a1dad4896865acb243814ef77?source=rss"),
    article("簗前農相の衆院選出陣式で鉢巻き無償配布(共同通信)", "https://news.yahoo.co.jp/articles/ead9e9f63d66dab376c3d9f94b7a2ada8f7afcf1?source=rss"),
    article("人口300人の群馬県みなかみ町に訪日客殺到 紅葉の秘境「あまりに美しい」 SNSで国際化(テレビ朝日系（ANN）)", "https://news.yahoo.co.jp/articles/8cda934681dd8e199ea40a1f4818049f7238a63f?source=rss"),
    article("大阪・枚方市が老朽化進む市役所庁舎の現行建て替え案を断念　物価高騰で移転新築費増　(産経新聞)", "https://news.yahoo.co.jp/articles/9657d303bd955dd4bae4d3d769d5765b1104588a?source=rss"),
    article("千葉県で震度3の地震　津波の心配なし(日本気象協会tenki.jp)", "https://news.yahoo.co.jp/articles/0f64460b1800caeaa81862142c2317e7070f03d4?source=rss"),
  ],
  world: [
    article("青少年のSNS制限どうする？　大統領が「迅速な議論」指示＝韓国(聯合ニュース)", "https://news.yahoo.co.jp/articles/bab97cf093df91230b7f8884cf15a30deac515fc?source=rss", true),
    article("【速報】来年1月 サウジで開催予定のサッカー・アジアカップが情勢悪化で延期　AFC(テレビ朝日系（ANN）)", "https://news.yahoo.co.jp/articles/a6e9c33abbe85c28c504d037667ddd3d4e41ab43?source=rss", true),
    article("李大統領　弱者支援「公平性なければ嫌悪あおる口実に」(聯合ニュース)", "https://news.yahoo.co.jp/articles/a4b587454988ac5272810251e6c3c560718ad384?source=rss", true),
    article("「トランプ関税返して」　農心、40億ウォン超の還付請求訴訟(朝鮮日報日本語版)", "https://news.yahoo.co.jp/articles/821996bf8fa8ddfaba48addcabc870fb7590176e?source=rss"),
    article("韓国外交部「李大統領夫妻らの旅券再発給措置…ハッキングよりも情報流出と把握」(中央日報日本語版)", "https://news.yahoo.co.jp/articles/bec2ff7301aeede7201e76085749bfbe09c03e4f?source=rss"),
    article("トランプ、中間選挙で民主党が勝てばイーロン・マスクに「恩赦を与える可能性」を示唆(Forbes JAPAN)", "https://news.yahoo.co.jp/articles/e95a8cc242a45dc4149357daf46fc75cb8e1236c?source=rss"),
    article("賭けゴルフでわざと負けて信頼築き…薬物飲ませて7500万ウォン奪った一味を摘発(朝鮮日報日本語版)", "https://news.yahoo.co.jp/articles/b6b65f52484179ac919a2da5125f5b2c70a3ac90?source=rss"),
    article("選挙前夜に「人工池」自慢　トランプ氏、異例の締め(共同通信)", "https://news.yahoo.co.jp/articles/f8fb9eaa7268080ae8fad3a3e75d9f620a6ee98c?source=rss"),
  ],
  it: [
    article("映画「ゴジラ-0.0」の公開にあわせてWOWOWが公式ECサイト「WOWOW百貨店」で歴代ゴジラグッズを特集(ネットショップ担当者フォーラム)", "https://news.yahoo.co.jp/articles/2dae908fea27d767225ec71b8d50045b30d1a042?source=rss", true),
    article("米Googleが宇宙からのAI応答に成功、AI企業が宇宙AIデータセンターを目指すわけ(ビジネス＋IT)", "https://news.yahoo.co.jp/articles/6ac939f3b853508135dc5362148332640da5d676?source=rss", true),
    article("純正スピーカーでも音が激変!? 18歳オーナーがフォレスターで始めたカーオーディオ高音質化への道【car audio newcomer！】by custom＆car Audio PARADA 前編(レスポンス)", "https://news.yahoo.co.jp/articles/0e6948ba0a35a1b5b5d71302c71ba7369362fd12?source=rss", true),
    article("OpenAI、約3.16兆円を新たに調達へ──UAEの出資と設備利用権を組み合わせる構想(Forbes JAPAN)", "https://news.yahoo.co.jp/articles/27051f915f07a6b84edbe43ed98b4f9938177169?source=rss"),
    article("防災メールの宛先313万件流出か　アルカディアが調書提出、府警が不正アクセスで捜査(ビジネス＋IT)", "https://news.yahoo.co.jp/articles/da85b3703132a827f96116839677bba40ebcdc68?source=rss"),
    article("米Anthropic 7～9月期売上高は約170億ドルに急拡大も、巨額AIインフラ投資が足かせに(ビジネス＋IT)", "https://news.yahoo.co.jp/articles/e0fc24b5d5b86e048591a69269f66d5929bd227d?source=rss"),
    article("SBI上期決算、暗号資産事業は30.1%減収(NADA NEWS)", "https://news.yahoo.co.jp/articles/c3b9d38b217cfe919e420f9142b47596db1c57d1?source=rss"),
    article("iPhone Duo転売ヤー、AIフル活用で在庫を監視し秒で購入している(ギズモード・ジャパン)", "https://news.yahoo.co.jp/articles/d4f9cac38564c55f6a5f83ce94e2e6c67fa74ba7?source=rss"),
  ],
  science: [
    article("宇宙開発での活躍視野…九州大学が開発進める、「動く電子回路」の世界(ニュースイッチ)", "https://news.yahoo.co.jp/articles/c5efef3523f879661e4d08fff11b05959327768a?source=rss", true),
    article("3日未明は4天体が集合！ 1月以来のスーパームーンに3つの流星群など、11月に見たい星空7選(ナショナル ジオグラフィック日本版)", "https://news.yahoo.co.jp/articles/a0795dd6ec603118ff91cef81e8053a2207fa44a?source=rss", true),
    article("まるでト音記号 銀河団が奏でる名曲はどんな？(Science Portal)", "https://news.yahoo.co.jp/articles/3c83fdf1fc4e4072bd32d960caa9932f212ffa2b?source=rss", true),
    article("火星と木星が大接近、しし座流星群にスーパームーンも　11月の夜空(Forbes JAPAN)", "https://news.yahoo.co.jp/articles/59be97e9cc8dfaaa387c3102540247c40a1271cb?source=rss"),
    article("がんを撃退する「遺伝子改変T細胞療法」をAIで改良(Forbes JAPAN)", "https://news.yahoo.co.jp/articles/5c4c70fd6d5e36badb6cc5c78b0a8135c398e42c?source=rss"),
    article("「AIに対する虐待」禁止、米アンソロピックが想定するAIいじめのリスクとは(CNN.co.jp)", "https://news.yahoo.co.jp/articles/6a8b6145455fe29900670c006b17dac0f892901a?source=rss"),
    article("DNA変異を簡便に検出、新手法開発　遺伝子解析のコスト削減と効率化に期待　日本女子大(産経新聞)", "https://news.yahoo.co.jp/articles/fbe02181e208f709f02ba55392a4dbe273a9977e?source=rss"),
    article("口や顎の治療から、ほかの診療科を支える役割まで――第71回日本口腔外科学会総会・学術大会が見据える未来(Medical Note)", "https://news.yahoo.co.jp/articles/5b57ee2bed56659d35d934aef594d0766d8afc55?source=rss"),
  ],
};

let categoryLinks = { ...fallbackCategoryLinks };

const NEWS_LIMIT = 8;
const NEWS_FEEDS = Object.freeze({
  major: "https://news.yahoo.co.jp/rss/topics/top-picks.xml",
  economy: "https://news.yahoo.co.jp/rss/categories/business.xml",
  entertainment: "https://news.yahoo.co.jp/rss/categories/entertainment.xml",
  sports: "https://news.yahoo.co.jp/rss/categories/sports.xml",
  domestic: "https://news.yahoo.co.jp/rss/categories/domestic.xml",
  world: "https://news.yahoo.co.jp/rss/categories/world.xml",
  it: "https://news.yahoo.co.jp/rss/categories/it.xml",
  science: "https://news.yahoo.co.jp/rss/categories/science.xml",
});

const NEWS_PROXY_BUILDERS = [
  (feedUrl) => `https://proxy.cors.dev/${feedUrl}`,
  (feedUrl) => `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`,
];

const ARTICLE_READER_ORIGIN = "https://r.jina.ai/http://";
const GOOGLE_TRANSLATE_ENDPOINT = "https://translate.googleapis.com/translate_a/single";
const TRANSLATION_CHUNK_LENGTH = 900;

const canvas = document.querySelector("#forestCanvas");
const stage = document.querySelector("#forestStage");
const ctx = canvas.getContext("2d");
const nodes = [...document.querySelectorAll(".portal-node")];
const panel = document.querySelector("#detailPanel");
const newsLinks = document.querySelector("#newsLinks");
const modeValue = document.querySelector("#modeValue");
const quietButton = document.querySelector("#quietButton");
const dailyPhoto = document.querySelector("#dailyPhoto");
const installButton = document.querySelector("#installButton");
const articleReader = document.querySelector("#articleReader");
const articleTitle = document.querySelector("#articleTitle");
const articleTitleTranslation = document.querySelector("#articleTitleTranslation");
const articleTitleTranslationLabel = document.querySelector("#articleTitleTranslationLabel");
const articleMeta = document.querySelector("#articleMeta");
const articleBody = document.querySelector("#articleBody");
const articleStatus = document.querySelector("#articleStatus");
const articleSourceLink = document.querySelector("#articleSourceLink");
const translateButton = document.querySelector("#translateButton");
const speakButton = document.querySelector("#speakButton");
const stopSpeakButton = document.querySelector("#stopSpeakButton");

const DAILY_IMAGE_CACHE_KEY = "information-forest-daily-image-v1";

let width = 0;
let height = 0;
let dpr = 1;
let rafId = 0;
let time = 0;
let quiet = false;
let selectedNode = null;
let activeDailyDay = 0;
let activeDailyImageUrl = "";
let deferredInstallPrompt = null;
let activeArticle = null;
let articleRequestId = 0;
let builtInTranslatorPromise = null;
let speechState = { active: false, token: 0, index: 0 };

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function dayOfYear(date = new Date()) {
  const yearStart = Date.UTC(date.getFullYear(), 0, 1);
  const currentDay = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((currentDay - yearStart) / 86400000) + 1;
}

function readCachedDailyImage(day) {
  try {
    const cached = JSON.parse(localStorage.getItem(DAILY_IMAGE_CACHE_KEY) || "null");
    return cached?.day === day && cached.record?.image ? cached.record : null;
  } catch {
    return null;
  }
}

function cacheDailyImage(record, day) {
  try {
    localStorage.setItem(DAILY_IMAGE_CACHE_KEY, JSON.stringify({ day, record }));
  } catch {
    // Storage can be unavailable in private browsing; the network path still works.
  }
}

function applyDailyImage(record, day) {
  if (!record?.image || !dailyPhoto) return;
  const imageUrl = JSON.stringify(record.image);

  // Set the background immediately so the photo is visible while the
  // eager decode finishes. Waiting for onload left the stage empty on open.
  dailyPhoto.style.backgroundImage = `url(${imageUrl})`;
  dailyPhoto.dataset.title = record.title;
  dailyPhoto.dataset.day = String(day);

  if (activeDailyImageUrl === record.image) return;
  activeDailyImageUrl = record.image;

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
  const day = dayOfYear();
  const cachedRecord = readCachedDailyImage(day);
  if (cachedRecord) {
    activeDailyDay = day;
    applyDailyImage(cachedRecord, day);
  }

  try {
    const response = await fetch("forest-images.json", { cache: "default" });
    if (!response.ok) throw new Error(`forest-images.json ${response.status}`);
    const payload = await response.json();
    const images = Array.isArray(payload.images) ? payload.images : [];
    if (images.length < 365) throw new Error(`Expected 365 images, received ${images.length}`);
    const record = images[(day - 1) % images.length];
    activeDailyDay = day;
    applyDailyImage(record, day);
    cacheDailyImage(record, day);
  } catch (error) {
    console.warn("Daily forest image could not be loaded.", error);
  }
}

function isYahooNewsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "news.yahoo.co.jp";
  } catch {
    return false;
  }
}

function normaliseNewsItems(items) {
  return (Array.isArray(items) ? items : [])
    .map((item) => ({
      title: typeof item?.title === "string" ? item.title.replace(/\s+/g, " ").trim() : "",
      url: typeof item?.url === "string" ? item.url.trim() : "",
      isNew: typeof item?.isNew === "boolean" ? item.isNew : undefined,
    }))
    .filter((item) => item.title && isYahooNewsUrl(item.url))
    .slice(0, NEWS_LIMIT)
    .map((item, index) => ({ ...item, isNew: item.isNew ?? (index < 3) }));
}

function applyLatestNews(payload) {
  const feeds = payload?.feeds && typeof payload.feeds === "object" ? payload.feeds : payload;
  if (!feeds || typeof feeds !== "object") return;

  let updated = false;
  Object.keys(NEWS_FEEDS).forEach((key) => {
    const items = normaliseNewsItems(feeds[key]);
    if (!items.length) return;
    categoryLinks[key] = items;
    updated = true;
  });

  if (updated && selectedNode) renderNewsLinks(selectedNode.dataset.node);
}

function parseYahooRss(xml) {
  const document = new DOMParser().parseFromString(xml, "application/xml");
  if (document.querySelector("parsererror")) throw new Error("Yahoo RSS XML could not be parsed");

  return [...document.querySelectorAll("item")]
    .map((item, index) => ({
      title: item.querySelector("title")?.textContent?.trim() || "",
      url: item.querySelector("link")?.textContent?.trim() || "",
      isNew: index < 3,
    }))
    .filter((item) => item.title && isYahooNewsUrl(item.url))
    .slice(0, NEWS_LIMIT);
}

async function fetchYahooFeed(feedUrl) {
  let lastError = null;
  for (const buildProxyUrl of NEWS_PROXY_BUILDERS) {
    try {
      const response = await fetch(buildProxyUrl(feedUrl), {
        cache: "no-store",
        headers: { Accept: "application/rss+xml, application/xml, text/xml" },
      });
      if (!response.ok) throw new Error(`Yahoo RSS ${response.status}`);
      const items = parseYahooRss(await response.text());
      if (items.length) return items;
      throw new Error("Yahoo RSS contained no Yahoo article links");
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("Yahoo RSS could not be loaded");
}

async function loadLatestNews() {
  try {
    const response = await fetch("latest-news.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`latest-news.json ${response.status}`);
    applyLatestNews(await response.json());
  } catch (error) {
    console.warn("Latest news snapshot could not be loaded.", error);
  }

  const entries = await Promise.all(Object.entries(NEWS_FEEDS).map(async ([key, feedUrl]) => {
    try {
      return [key, await fetchYahooFeed(feedUrl)];
    } catch (error) {
      console.warn(`Latest Yahoo news could not be loaded for ${key}.`, error);
      return [key, []];
    }
  }));

  applyLatestNews({ feeds: Object.fromEntries(entries) });
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

function isYahooArticleUrl(value) {
  try {
    const url = new URL(value);
    return isYahooNewsUrl(value) && (url.pathname.includes("/articles/") || url.pathname.includes("/pickup/"));
  } catch {
    return false;
  }
}

function buildArticleReaderUrl(value) {
  return `${ARTICLE_READER_ORIGIN}${value}`;
}

function stripMarkdownFormatting(value) {
  return String(value || "")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/\\([\\`*_{}[\]()#+.!>\-])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function isLeadingCitationLine(line) {
  const plainLine = stripMarkdownFormatting(line).trim();
  return !plainLine
    || /^https?:\/\//i.test(plainLine)
    || /(?:copyright|all rights reserved|著作権|出典|引用|画像提供|写真提供|shutterstock|Getty Images|LIMO|mapo_japan)/i.test(plainLine);
}

function normaliseArticleKey(value) {
  return stripMarkdownFormatting(value)
    .toLocaleLowerCase("ja-JP")
    .replace(/[\s【】「」『』（）()［］[\]：:、。・,.!！?？\-—]/g, "");
}

function parseArticleReaderMarkdown(markdown, fallbackTitle) {
  const lines = String(markdown || "").replace(/\r/g, "").split("\n");
  const titleLine = lines.find((line) => /^Title:\s*/i.test(line));
  const sourceTitle = titleLine ? stripMarkdownFormatting(titleLine.replace(/^Title:\s*/i, "")) : "";
  const title = sourceTitle || fallbackTitle;
  const contentStart = lines.findIndex((line) => line.trim() === "Markdown Content:");
  const searchStart = contentStart >= 0 ? contentStart + 1 : 0;
  const titleKey = normaliseArticleKey(title).slice(0, 28);
  let headingIndex = lines.findIndex((line, index) => {
    if (index < searchStart || !/^#\s+/.test(line)) return false;
    const headingKey = normaliseArticleKey(line.replace(/^#\s+/, ""));
    return headingKey && (headingKey.includes(titleKey) || titleKey.includes(headingKey.slice(0, 28)));
  });

  if (headingIndex < 0) {
    headingIndex = lines.findIndex((line, index) => index >= searchStart && /^#\s+/.test(line) && !/^#\s+Yahoo!/i.test(line));
  }
  if (headingIndex < 0) throw new Error("Yahoo article body heading was not found");

  const bodyLines = lines.slice(headingIndex + 1);
  const stopIndex = bodyLines.findIndex((line) => /^(?:まとめ\s*[●：:]|この記事はいかがでしたか|関連記事|ニュース提供|Copyright|©|【?\[?Not Sponsored|modelpress$)/i.test(line.trim()));
  const candidateLines = stopIndex >= 0 ? bodyLines.slice(0, stopIndex) : bodyLines;
  const blocks = [];
  let paragraphLines = [];
  let leadingCitation = true;
  let leadingCitationLines = [];

  const flushParagraph = () => {
    const text = stripMarkdownFormatting(paragraphLines.join(" "))
      .replace(/[（(][^（）()]{0,80}(?:編集部|editorial department)[^（）()]{0,80}[）)]\.?$/i, "")
      .trim();
    if (text) blocks.push({ kind: "paragraph", text });
    paragraphLines = [];
  };

  const flushLeadingCitation = () => {
    const text = stripMarkdownFormatting(leadingCitationLines.join(" ")).trim();
    if (text) blocks.push({ kind: "citation", text, skipTranslation: true, skipSpeech: true });
    leadingCitationLines = [];
  };

  candidateLines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      return;
    }
    const plainLine = stripMarkdownFormatting(line).replace(/[*_~]/g, "");
    if (leadingCitation && isLeadingCitationLine(line)) {
      flushParagraph();
      const text = stripMarkdownFormatting(line).trim();
      if (text) leadingCitationLines.push(text);
      return;
    }
    if (/^\d{1,2}[\/]\d{1,2}.*(?:配信|Published)/i.test(line)) return;
    if (/^(?:X|Facebook|LINE|共有|シェア)$/i.test(line)) return;
    if (/^(?:previous|prev|next|ページ(?:送り|移動)?|page\s+\d+(?:\s+of\s+\d+)?)$/i.test(plainLine)) return;
    if (/^(?:previous|prev)(?:\s*\d+)+(?:\s*next)?$/i.test(plainLine)) return;
    if (/^(?:\d+\s*\/\s*\d+\s*pages?|page\s*\d+\s*\/\s*\d+)$/i.test(plainLine)) return;
    if (/^\[!?\[/.test(line) || /^\[\s*\]\(.*\)$/.test(line) || /^\[[^\]]+\]\(.*\)$/.test(line)) return;

    const linkFreeLine = line.replace(/!?(?:\[[^\]]*\])\([^)]*\)/g, "").trim();
    if (!linkFreeLine) return;
    if (/^!\[[^\]]*\]\(/.test(line)) return;

    if (leadingCitationLines.length) flushLeadingCitation();
    leadingCitation = false;

    const headingMatch = line.match(/^#{2,6}\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      const heading = stripMarkdownFormatting(headingMatch[1]);
      if (heading) blocks.push({ kind: "heading", text: heading });
      return;
    }

    paragraphLines.push(line);
  });
  flushLeadingCitation();
  flushParagraph();

  if (!blocks.length) throw new Error("Yahoo article body was empty");
  return { title, blocks };
}

function renderArticleTitle(sourceTitle, translatedTitle = "Translating…", showTranslation = true) {
  articleTitle.textContent = sourceTitle;
  articleTitleTranslation.textContent = translatedTitle;
  articleTitleTranslationLabel.hidden = !showTranslation;
  articleTitleTranslation.hidden = !showTranslation;
}

function renderArticleBlocks(sourceBlocks, translatedBlocks = sourceBlocks, showTranslation = true) {
  articleBody.replaceChildren(...sourceBlocks.map((sourceBlock, index) => {
    const translatedBlock = translatedBlocks[index] || sourceBlock;
    const group = document.createElement("section");
    group.className = `article-bilingual-block is-${sourceBlock.kind}`;

    const sourceLabel = document.createElement("p");
    sourceLabel.className = "article-language-label";
    sourceLabel.textContent = sourceBlock.skipTranslation ? "引用元（翻訳・読み上げ対象外）" : "日本語原文";
    const sourceText = document.createElement(sourceBlock.kind === "heading" ? "h3" : "p");
    sourceText.className = "article-text article-text-source";
    sourceText.textContent = sourceBlock.text;

    if (!showTranslation || sourceBlock.skipTranslation) {
      group.classList.add("is-source-only");
      group.append(sourceLabel, sourceText);
      return group;
    }

    const translatedLabel = document.createElement("p");
    translatedLabel.className = "article-language-label article-language-label-en";
    translatedLabel.textContent = "English translation";
    const translatedText = document.createElement(translatedBlock.kind === "heading" ? "h3" : "p");
    translatedText.className = "article-text article-text-translation";
    translatedText.textContent = translatedBlock.text;

    group.append(sourceLabel, sourceText, translatedLabel, translatedText);
    return group;
  }));
}

function setArticleStatus(message, state = "") {
  articleStatus.textContent = message;
  articleStatus.dataset.state = state;
}

function splitTextForTranslation(text) {
  if (text.length <= TRANSLATION_CHUNK_LENGTH) return [text];
  const sentences = text.match(/[^。！？!?]+[。！？!?]?/g) || [text];
  const chunks = [];
  let current = "";

  sentences.forEach((sentence) => {
    if (sentence.length > TRANSLATION_CHUNK_LENGTH) {
      if (current) chunks.push(current);
      current = "";
      for (let index = 0; index < sentence.length; index += TRANSLATION_CHUNK_LENGTH) {
        chunks.push(sentence.slice(index, index + TRANSLATION_CHUNK_LENGTH));
      }
      return;
    }
    if (current && current.length + sentence.length > TRANSLATION_CHUNK_LENGTH) {
      chunks.push(current);
      current = "";
    }
    current += sentence;
  });
  if (current) chunks.push(current);
  return chunks.length ? chunks : [text];
}

async function getBuiltInTranslator() {
  const TranslatorApi = window.Translator;
  if (!TranslatorApi || typeof TranslatorApi.create !== "function") return null;
  if (!builtInTranslatorPromise) {
    builtInTranslatorPromise = (async () => {
      if (typeof TranslatorApi.availability === "function") {
        const availability = await TranslatorApi.availability({ sourceLanguage: "ja", targetLanguage: "en" });
        if (!["available", "downloadable"].includes(availability)) return null;
      }
      return TranslatorApi.create({ sourceLanguage: "ja", targetLanguage: "en" });
    })().catch(() => null);
  }
  return builtInTranslatorPromise;
}

async function translateChunkWithGoogle(text) {
  const params = new URLSearchParams({ client: "gtx", sl: "ja", tl: "en", dt: "t", q: text });
  const response = await fetch(`${GOOGLE_TRANSLATE_ENDPOINT}?${params.toString()}`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`Translation service ${response.status}`);
  const payload = await response.json();
  const translated = Array.isArray(payload?.[0])
    ? payload[0].map((segment) => Array.isArray(segment) ? segment[0] : "").join("")
    : "";
  if (!translated) throw new Error("Translation service returned no text");
  return translated;
}

async function translateTextToEnglish(text) {
  const chunks = splitTextForTranslation(text);
  const translator = await getBuiltInTranslator();
  const translatedChunks = [];

  for (const chunk of chunks) {
    let translated = "";
    if (translator) {
      try {
        translated = await translator.translate(chunk);
      } catch {
        translated = "";
      }
    }
    if (!translated) translated = await translateChunkWithGoogle(chunk);
    translatedChunks.push(translated);
  }
  return translatedChunks.join("");
}

const maleEnglishVoicePattern = /(?:\bmale\b|\balex\b|\bandrew\b|\barthur\b|\bbrian\b|\bchristopher\b|\bdaniel\b|\bdavid\b|\beric\b|\bfred\b|\bgeorge\b|\bguy\b|\bjames\b|\bjason\b|\bjustin\b|\bmark\b|\bmatthew\b|\bmichael\b|\boliver\b|\bralph\b|\bryan\b|\bstephen\b|\bthomas\b|\btom\b|\bwilliam\b)/i;
const naturalEnglishVoicePattern = /natural|neural|google|microsoft|enhanced|premium/i;

function getEnglishVoice() {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  const englishVoices = voices.filter((voice) => /^en[-_]/i.test(voice.lang));
  const maleVoices = englishVoices.filter((voice) => maleEnglishVoicePattern.test(voice.name));
  return maleVoices.find((voice) => naturalEnglishVoicePattern.test(voice.name))
    || maleVoices[0]
    || englishVoices.find((voice) => naturalEnglishVoicePattern.test(voice.name))
    || englishVoices[0]
    || null;
}

function getSpeechSegments() {
  if (!activeArticle?.translationEnabled) return [];
  const segments = [];
  if (activeArticle.titleSpeechText?.trim()) segments.push({ text: activeArticle.titleSpeechText });
  activeArticle.translatedBlocks
    .filter((block) => !block.skipSpeech)
    .forEach((block) => segments.push({ text: block.text }));
  return segments;
}

function resetSpeechControls() {
  speechState = { active: false, token: speechState.token + 1, index: 0 };
  stopSpeakButton.hidden = true;
  speakButton.textContent = "英訳を読み上げる";
  speakButton.disabled = !getSpeechSegments().length || !("speechSynthesis" in window);
}

function cancelSpeech() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  resetSpeechControls();
}

function finishSpeech(message = "") {
  resetSpeechControls();
  if (message) setArticleStatus(message, "success");
}

function speakNextArticleBlock(token, index) {
  if (!activeArticle || !speechState.active || speechState.token !== token) return;
  const segment = getSpeechSegments()[index];
  if (!segment) {
    finishSpeech("読み上げが完了しました。");
    return;
  }
  if (!segment.text.trim()) {
    speakNextArticleBlock(token, index + 1);
    return;
  }

  const utterance = new SpeechSynthesisUtterance(segment.text);
  utterance.lang = "en-US";
  utterance.rate = 0.94;
  utterance.pitch = 1;
  utterance.voice = getEnglishVoice();
  utterance.onend = () => speakNextArticleBlock(token, index + 1);
  utterance.onerror = (event) => {
    if (event.error === "canceled" || event.error === "interrupted") return;
    finishSpeech("読み上げを開始できませんでした。");
  };
  speechState.index = index;
  window.speechSynthesis.speak(utterance);
}

function speakArticle() {
  if (!getSpeechSegments().length || !("speechSynthesis" in window)) {
    setArticleStatus("このブラウザでは内蔵音声読み上げを利用できません。", "error");
    return;
  }
  window.speechSynthesis.cancel();
  const token = speechState.token + 1;
  speechState = { active: true, token, index: 0 };
  speakButton.disabled = true;
  stopSpeakButton.hidden = false;
  speakButton.textContent = "読み上げ中…";
  setArticleStatus("英訳タイトルと本文を読み上げています。", "success");
  speakNextArticleBlock(token, 0);
}

async function translateArticle(article, requestId) {
  const translatedBlocks = new Array(article.sourceBlocks.length);
  article.titleSpeechText = "";
  let failed = 0;
  let titleFailed = false;
  let nextIndex = 0;
  let completed = 0;
  const titlePromise = translateTextToEnglish(article.sourceTitle)
    .then((translatedTitle) => {
      if (!activeArticle || activeArticle.requestId !== requestId) return;
      article.translatedTitle = translatedTitle;
      article.titleSpeechText = translatedTitle;
      renderArticleTitle(article.sourceTitle, translatedTitle);
    })
    .catch(() => {
      titleFailed = true;
      if (!activeArticle || activeArticle.requestId !== requestId) return;
      article.translatedTitle = article.sourceTitle;
      article.titleSpeechText = "";
      renderArticleTitle(article.sourceTitle, article.sourceTitle);
    });
  const worker = async () => {
    while (nextIndex < article.sourceBlocks.length) {
      if (!activeArticle || activeArticle.requestId !== requestId) return;
      const index = nextIndex;
      nextIndex += 1;
      const sourceBlock = article.sourceBlocks[index];
      try {
        translatedBlocks[index] = sourceBlock.skipTranslation
          ? { ...sourceBlock }
          : { ...sourceBlock, text: await translateTextToEnglish(sourceBlock.text) };
      } catch {
        failed += 1;
        translatedBlocks[index] = { ...sourceBlock };
      }
      completed += 1;
      if (activeArticle?.requestId === requestId) {
        setArticleStatus(`本文を英訳しています… ${completed}/${article.sourceBlocks.length}`);
      }
    }
  };
  await Promise.all([
    titlePromise,
    ...Array.from({ length: Math.min(3, article.sourceBlocks.length) }, worker),
  ]);
  if (!activeArticle || activeArticle.requestId !== requestId) return;
  article.translatedBlocks = translatedBlocks;
  renderArticleBlocks(article.sourceBlocks, translatedBlocks);
  speakButton.disabled = !getSpeechSegments().length || !("speechSynthesis" in window);
  const hasFailure = failed || titleFailed;
  setArticleStatus(
    hasFailure ? `タイトルと本文を英訳しました（一部は原文のままです）。${"speechSynthesis" in window ? "読み上げボタンを押せます。" : "音声読み上げは非対応です。"}` : `タイトルと本文を英訳しました。${"speechSynthesis" in window ? "読み上げボタンを押せます。" : "音声読み上げは非対応です。"}`,
    hasFailure ? "warning" : "success",
  );
}

async function loadArticle(item, requestId) {
  try {
    const response = await fetch(buildArticleReaderUrl(item.url), {
      cache: "no-store",
      headers: { Accept: "text/plain" },
    });
    if (!response.ok) throw new Error(`Article reader ${response.status}`);
    const parsed = parseArticleReaderMarkdown(await response.text(), item.title);
    if (!activeArticle || activeArticle.requestId !== requestId) return;
    const article = activeArticle;
    article.sourceTitle = parsed.title || item.title;
    article.sourceBlocks = parsed.blocks;
    translateButton.disabled = false;
    if (!article.translationEnabled) {
      renderArticleTitle(article.sourceTitle, "", false);
      renderArticleBlocks(article.sourceBlocks, [], false);
      setArticleStatus("主要カテゴリは日本語原文のみ表示します。", "success");
      return;
    }
    renderArticleTitle(article.sourceTitle, article.translatedTitle || "Translating…", true);
    articleBody.replaceChildren();
    await translateArticle(article, requestId);
  } catch (error) {
    if (!activeArticle || activeArticle.requestId !== requestId) return;
    articleBody.replaceChildren();
    const message = document.createElement("p");
    message.className = "article-error";
    message.textContent = "本文を取得できませんでした。下のリンクからYahoo!で記事を開けます。";
    articleBody.append(message);
    setArticleStatus("記事本文の取得に失敗しました。", "error");
    console.warn("Article body could not be loaded.", error);
  }
}

function openArticle(item, categoryKey = "") {
  if (!isYahooArticleUrl(item.url)) return;
  cancelSpeech();
  const requestId = articleRequestId + 1;
  articleRequestId = requestId;
  const translationEnabled = categoryKey !== "major";
  activeArticle = { item, requestId, categoryKey, translationEnabled, sourceTitle: item.title, translatedTitle: "", titleSpeechText: "", sourceBlocks: [], translatedBlocks: [] };
  renderArticleTitle(item.title, translationEnabled ? "Translating…" : "", translationEnabled);
  articleMeta.textContent = translationEnabled ? "日本語原文＋タイトル・本文英訳 / ブラウザ内蔵音声" : "日本語原文 / 主要カテゴリは英訳なし";
  articleSourceLink.href = item.url;
  articleBody.replaceChildren();
  const loading = document.createElement("p");
  loading.className = "article-loading";
  loading.textContent = "記事本文を読み込んでいます…";
  articleBody.append(loading);
  translateButton.disabled = true;
  speakButton.disabled = true;
  translateButton.hidden = !translationEnabled;
  speakButton.hidden = !translationEnabled;
  stopSpeakButton.hidden = true;
  setArticleStatus("記事本文を読み込んでいます…");
  panel.classList.remove("is-open");
  panel.setAttribute("aria-hidden", "true");
  articleReader.classList.add("is-open");
  articleReader.setAttribute("aria-hidden", "false");
  void loadArticle(item, requestId);
}

function closeArticle() {
  articleRequestId += 1;
  cancelSpeech();
  activeArticle = null;
  articleReader.classList.remove("is-open");
  articleReader.setAttribute("aria-hidden", "true");
  if (selectedNode) {
    renderNewsLinks(selectedNode.dataset.node);
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
  }
}

function renderNewsLinks(key) {
  const data = portalData[key];
  if (!data) return;
  const links = categoryLinks[key] || [{ title: `${data.label}のニュースを開く`, url: data.url }];
  newsLinks.replaceChildren(...links.map((item) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = item.title;
    if (key !== "major" && isYahooArticleUrl(item.url)) {
      link.addEventListener("click", (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        openArticle(item, key);
      });
    }
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
}

function openNode(node) {
  const key = node.dataset.node;
  const data = portalData[key];
  if (!data) return;
  selectedNode?.classList.remove("is-selected");
  selectedNode = node;
  selectedNode.classList.add("is-selected");
  renderNewsLinks(key);
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

nodes.forEach((node) => {
  node.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (node.dataset.node === "major") return;
    event.preventDefault();
    openNode(node);
  });
  node.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      if (node.dataset.node === "major") {
        if (event.key === " ") {
          event.preventDefault();
          node.click();
        }
        return;
      }
      event.preventDefault();
      openNode(node);
    }
  });
});

document.querySelector("#detailClose").addEventListener("click", closeNode);
document.querySelector("#articleClose").addEventListener("click", closeArticle);
translateButton.addEventListener("click", async () => {
  if (!activeArticle?.translationEnabled || !activeArticle.sourceBlocks?.length) return;
  const requestId = activeArticle.requestId;
  cancelSpeech();
  translateButton.disabled = true;
  speakButton.disabled = true;
  await translateArticle(activeArticle, requestId);
  if (activeArticle?.requestId === requestId) translateButton.disabled = false;
});
speakButton.addEventListener("click", speakArticle);
stopSpeakButton.addEventListener("click", () => {
  cancelSpeech();
  setArticleStatus("読み上げを停止しました。", "success");
});
document.querySelector("#resetButton").addEventListener("click", () => {
  closeNode();
  closeArticle();
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
loadLatestNews();
setInterval(updateClock, 30000);
setInterval(loadLatestNews, 15 * 60 * 1000);
setInterval(() => {
  const day = dayOfYear();
  if (day !== activeDailyDay) loadDailyImage();
}, 60000);
drawScene();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js?v=major-direct-20261103j", { scope: "./" }).catch((error) => {
      console.warn("Service Worker could not be registered.", error);
    });
  });
}

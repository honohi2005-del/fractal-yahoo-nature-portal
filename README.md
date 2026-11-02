# 情報の森 — Yahoo!ポータル再構成

Yahoo! JAPANのポータル情報を、文字と広告をできるだけ減らし、フラクタル構造を持つ自然の風景に埋め込んで眺めるための静的Webサイトです。

## 特徴

- Canvasで描画する、光の差し込むフラクタルの森
- Wikimedia Commonsから取得した365枚の自然風景を、日付に応じて1日1枚表示
- `dist/forest-images.json` に画像URL・出典・作者・ライセンス情報を同梱
- 主要、経済、エンタメ、スポーツ、国内、国際、IT、化学、地域、天気への最小限の入口
- 検索フォームと情報ノードの詳細表示
- 文字量を抑える「静謐モード」
- 外部コンテンツをコピー・収集せず、Yahoo!の各サービスへ移動する構成

## 構成

- `dist/` — 公開する静的ファイル
- `scripts/fetch-commons-images.mjs` — Commons APIから365枚の画像カタログを更新するスクリプト
- `.github/workflows/pages.yml` — GitHub Pagesへの自動デプロイ

画像は [Wikimedia Commons](https://commons.wikimedia.org/) のサムネイルを利用し、各画像の出典リンクとライセンス情報をカタログに保持しています。

## GitHub Pages

https://honohi2005-del.github.io/fractal-yahoo-nature-portal/


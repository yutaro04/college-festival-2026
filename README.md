# 第6回カレッジ文化祭〜まぜまぜ。〜 公式サイト

SHIMOKITA COLLEGE 第6回カレッジ文化祭（2026年11月14日(土)–15日(日)）の公式サイトです。
ビルド不要の素の HTML / CSS / JavaScript で作られており、GitHub Pages にそのまま置くだけで公開できます。

---

## ⚠️ はじめに：内部資料をコミットしないでください

このリポジトリの内容は **GitHub Pages で全世界に公開されます**。
議事録・予算表・営業先リスト・個人名入りの資料などは絶対に置かないでください。
`.gitignore` で `.docx` / `.xlsx` / `.pptx` / `.pdf` を除外していますが、最後は目視で確認をお願いします。

```sh
git status          # コミット前に必ず確認
```

---

## ファイル構成

```
.
├── index.html          … サイト本体（文言はすべてここ）
├── 404.html            … 存在しないURLに来たとき用
├── .nojekyll           … GitHub Pages の Jekyll 処理を無効化
├── CNAME               … 独自ドメイン設定（GitHub が管理）
├── assets/
│   ├── css/style.css   … デザイン（色は先頭の :root でまとめて変更可）
│   ├── js/main.js      … メニュー・スクロール演出・カウントダウン
│   └── img/
│       ├── keyvisual.png             … キービジュアル原本（白背景）
│       ├── keyvisual-transparent.png … 白背景を抜いた版（サイトで使用）
│       ├── background.png            … 背景の紙 原本（5.1MB）
│       ├── background.webp           … 配信用に圧縮した版（サイトで使用）
│       ├── ogp.png                   … SNSシェア用 1200×630
│       └── favicon.svg               … ファビコン
└── README.md
```

---

## ローカルで確認する

`index.html` をブラウザで直接開くだけでも見られます。
より本番に近い状態で見たい場合は、リポジトリのルートで以下を実行してください。

```sh
python3 -m http.server 8000
```

→ ブラウザで http://localhost:8000 を開く

---

## GitHub Pages で公開する

1. GitHub でリポジトリを作成し、push する

   ```sh
   git add .
   git commit -m "初期サイトを作成"
   git branch -M main
   git remote add origin https://github.com/<ユーザー名>/<リポジトリ名>.git
   git push -u origin main
   ```

2. GitHub のリポジトリページ → **Settings** → 左メニューの **Pages**
3. **Source** を `Deploy from a branch`、**Branch** を `main` / `/ (root)` にして **Save**
4. 数分待つと `https://<ユーザー名>.github.io/<リポジトリ名>/` で公開されます

> 独自ドメインを使う場合は Pages の設定画面で Custom domain を設定してください
> （`CNAME` ファイルが自動生成されます）。

現在の公開URL: **https://shimokita-college-festival-2026.tokyo/**

独自ドメインはリポジトリ直下の `CNAME` で設定されています。ドメインを変更する場合は、
`CNAME` と、`index.html` の `canonical` / `og:url` / `og:image` の4箇所を揃えて書き換えてください。

---

## 内容を更新する

文言はすべて `index.html` に直接書かれています。該当箇所を書き換えて push すれば反映されます。

### 出展企画を追加する

`index.html` の「出展企画」セクション（`id="exhibitors"`）にある
`<article class="exhibit">…</article>` をまるごと複製し、中身を差し替えてください。
記載するのは **企画名・紹介文・画像** の3つだけです。
作成者名や連絡先は、出展者から掲載希望があった場合のみ追加してください。

```html
<article class="exhibit reveal">
  <div class="exhibit__visual">
    <img src="assets/img/＜ファイル名＞.webp"
         alt="＜画像の内容を説明する文＞"
         width="1536" height="1024" loading="lazy" decoding="async">
  </div>
  <div class="exhibit__body">
    <p class="exhibit__tags">
      <span class="tag">飲食</span>
      <span class="tag tag--inner">ハウス企画</span>
    </p>
    <h3 class="exhibit__title">＜企画名＞</h3>
    <p>＜紹介文＞</p>
  </div>
</article>
```

画像は **3:2（例 1536×1024）** が綺麗に収まります。それ以外の比率でも中央を基準に切り抜かれます。
正方形の画像を渡された場合は、上下が切り落とされても成立するか必ず目視で確認してください。

#### 画像がまだ届いていない場合

`<article>` に `exhibit--text` を足し、`<div class="exhibit__visual">…</div>` をまるごと省きます。
画像の代わりにカード上辺へ朱色の線が入り、画像ありのカードと並べても違和感が出ません。

```html
<article class="exhibit exhibit--text reveal">
  <div class="exhibit__body">
    …
  </div>
</article>
```

あとから画像が届いたら、`exhibit--text` を外して `.exhibit__visual` を足すだけです。

#### 企画者名・連絡先を載せる場合

出展者から**掲載希望があった場合のみ**、紹介文のあとに次のブロックを足します。
希望がなければ、ブロックごと省略してください（初期値は非掲載です）。

```html
<dl class="exhibit__by">
  <div>
    <dt>企画者</dt>
    <dd>＜氏名＞</dd>
  </div>
  <div>
    <dt>お問い合わせ</dt>
    <dd><a href="mailto:＜メールアドレス＞">＜メールアドレス＞</a></dd>
  </div>
</dl>
```

連絡先が SNS の場合は、行を足してリンクにします。複数アカウントは `<br>` で並べます。

```html
<div>
  <dt>Instagram</dt>
  <dd>
    <a href="https://www.instagram.com/＜ID＞/" target="_blank" rel="noopener">@＜ID＞</a><br>
    <a href="https://www.instagram.com/＜ID2＞/" target="_blank" rel="noopener">@＜ID2＞</a>
  </dd>
</div>
```

公開サイトにメールアドレスを平文で載せると、収集ボットに拾われて迷惑メールが届くことがあります。
出展者にその点を伝えたうえで掲載し、本人から希望があればいつでも削除できるようにしてください。

`alt` には画像に何が写っているかを書いてください。画像の中の文字は読み上げソフトや
検索エンジンには伝わらないため、企画名と紹介文は必ず HTML 側にも書きます。

提出された画像が重い場合（1MB 超が目安）は、WebP に圧縮したものを `src` に指定し、
原本も `assets/img/` に残しておいてください。

```sh
python3 -c "
from PIL import Image
Image.open('assets/img/housee.png').convert('RGB').save(
    'assets/img/housee.webp', 'WEBP', quality=82, method=6)
"
```

`tag` の使い分けは次のとおりです。

| 書き方 | 見え方 | 用途 |
| --- | --- | --- |
| `<span class="tag">飲食</span>` | 朱 | 企画のジャンル |
| `<span class="tag tag--inner">ハウス企画</span>` | 灰 | 企画の区分 |
| `<span class="tag tag--tbd">調整中</span>` | 黄 | 未確定の情報 |

### 「準備中」バッジの外し方

情報が確定していない箇所には黄色いバッジが付いています。

```html
<span class="tag tag--tbd">詳細調整中</span>
```

確定したらこの `<span>` ごと削除してください。確定済みを示す緑のバッジは `<span class="tag">…</span>` です。

### 差し替えが必要な箇所

`index.html` 内の `<!-- ▼ … -->` コメントが目印です。

| 箇所 | 内容 |
| --- | --- |
| `<head>` | OGP の URL・画像 |
| ACCESS | 最寄駅からの所要時間、撮影ポリシー、バリアフリー案内 |
| SUPPORT | 協賛資料・問い合わせ先、クラウドファンディングのリンク |
| CTA / フッター | Instagram・note・問い合わせメールアドレス |
| FAQ | カレッジ生向けの応募フォームリンク |
| マイプロ・アワプロ | 「昨年の企画から」の掲載可否（不要なら `.past` ごと削除） |

### 色を変える

`assets/css/style.css` の冒頭 `:root` にすべての色が定義されています。
配色はキービジュアルから抽出した暖色系で統一しています。

```css
--c-vermilion: #f4492f;  /* 主役の朱 */
--c-flame:     #d2360f;  /* 濃い朱 */
--c-ember:     #9e2a10;  /* いちばん深い赤 */
--c-amber:     #f59b3f;  /* 渦の橙 */
--c-gold:      #f8c070;  /* 明るい金 */
--ink:         #1a120c;  /* 破片の中の黒い粒 */
--paper:       #fdf8f1;
```

カードやフロアごとのアクセント色は `index.html` 側の
`style="--card-accent: var(--c-amber)"` / `--floor-accent` で個別に指定しています。

### フォントについて

本文は**オールド明朝**です。指定の「FOT-筑紫Aオールド明朝 Pr6N」は Fontworks の商用フォントで
Web フォント配信がないため、そのままでは**サイト訪問者の環境では表示できません**。
そこでフォントスタックを次のようにしています。

1. `FOT-TsukuAOldMin Pr6N` ほか筑紫Aオールド明朝の各名称 … ライセンスを持つ端末では本物が出ます
2. `Zen Old Mincho`（Google Fonts）… 同じオールド明朝系の代替。実質こちらが表示されます
3. `Hiragino Mincho ProN` / `Yu Mincho` / `serif` … 最終フォールバック

もし筑紫Aオールド明朝を本当に全訪問者へ配信したい場合は、Fontworks の
**LETS Web フォント**などの Web フォント契約が別途必要です。契約後は `@font-face`
もしくは提供される CSS を読み込み、`--font-ja` の先頭に配信名を置いてください。

欧文・数字は対比のため `Outfit`（Google Fonts）のままにしています。

### キービジュアルの画像について

`keyvisual.png` は白背景なので、そのままだと紙色や濃色の上で白い四角が出ます。
サイトでは白を抜いた `keyvisual-transparent.png` を使っています。
キービジュアルを差し替えるときは、透過版も作り直してください。

```sh
python3 - <<'PY'
from PIL import Image
import numpy as np
a = np.asarray(Image.open('assets/img/keyvisual.png').convert('RGB')).astype(np.int16)
mx, mn = a.max(axis=2), a.min(axis=2)
alpha = np.clip(np.maximum((mx - mn) * 3, (255 - mx) * 4), 0, 255).astype(np.uint8)
Image.fromarray(np.dstack([a.astype(np.uint8), alpha]), 'RGBA') \
     .save('assets/img/keyvisual-transparent.png')
PY
```

`ogp.png`（1200×630）もキービジュアルから生成しています。差し替え時は作り直してください。

### 背景の紙について

`background.webp`（方眼紙のテクスチャ）は、**トップ画面＝ヒーロー（`.hero`）だけ**に敷いています。
その下のセクションは地色（`--paper`）のみで、テクスチャは出ません。
ヒーローの直下にティッカーの黒帯が入るため、切り替わりは目立ちません。

全ページに敷きたくなった場合は、`.hero` の `background` を `body` へ移してください。
その際 `background-attachment: fixed` は使わず、`position: fixed` のレイヤー
（`body::before` など）にしてください。iOS Safari で `fixed` 背景が正しく拡大されない
不具合があるためです。

原本の `background.png` は 5.1MB あり、そのまま配信すると重すぎるため、
WebP に圧縮した `background.webp`（約340KB）を使っています。差し替え時は作り直してください。

```sh
python3 -c "
from PIL import Image
Image.open('assets/img/background.png').convert('RGB').save(
    'assets/img/background.webp', 'WEBP', quality=72, method=6)
"
```

背景が強すぎる／弱すぎると感じたら、`style.css` の `--veil` を調整してください。
数値を上げるほど白いベールが濃くなり、本文が読みやすくなります。

```css
--veil: rgba(255, 255, 255, .62);
```

### カウントダウンの基準日

`assets/js/main.js` の先頭で設定しています。

```js
var FESTIVAL_START = '2026-11-14T10:00:00+09:00';
```

---

## 掲載情報のステータス

議事録・マイプロアワプロ概要書・マスターシートをもとに作成しています。
以下は**確定済み**の情報です（出典：マスターシート「用語集」「スケジュール」「収入計画」ほか）。

- 正式名称：第6回カレッジ文化祭〜まぜまぜ。〜
- スローガン「まぜまぜ。」（9/21 決選投票で決定）
- コンセプト「コラボレーション」
- 会期：2026年11月14日(土)・15日(日)、Day1 は 11:00–18:00
- Festival Week：11月9日(月)〜13日(金)、18:00–21:00
- 前夜祭 11/13(金)、後夜祭 11/15(日)（いずれもカレッジ生向け）
- 会場：SHIMOKITA COLLEGE（東京都世田谷区代田5-20-16、1F〜5F を開放）
- 入場料は取らない方針
- 会場内の支払いは現金または PayPay（当初の回数券方式から 2026-10-18 に変更）
- ステージ企画は全8枠（外部6・カレッジ生2）
- マイプロ・アワプロの定義、エントリー制＋審査会

以下は**未確定**のため、サイト上では「調整中」バッジを付けています。

- Day2 の開催時間、タイムテーブル
- 事前予約の要否
- ステージ企画の出演者
- 採択企画の一覧、物販ラインナップ、飲食メニュー
- Festival Week の具体的な内容（一般公開プログラムの有無）
- 撮影・肖像権ポリシー、アクセシビリティ案内
- 最寄駅からの所要時間、駐輪の可否
- 公式SNSアカウント、問い合わせ先

### 公開前に判断が必要な箇所

`index.html` の「昨年の企画から」（`.past`）には、前回文化祭の企画名と概要を8件掲載しています。
マイプロ・アワプロ概要書からの引用で、個人名は含めていませんが、**掲載可否は実行委員会で確認してください**。
不要であれば `<div class="past reveal">…</div>` をまるごと削除すれば問題ありません。

### サイトに載せていない情報

以下は意図的に掲載していません。

- **ステージ企画のゲスト候補者名** — 交渉前のため公開厳禁
- 予算・支出計画・資金調達の目標額、協賛想定支援者リスト
- メンバー個人名、当日シフト、内部タスク・締切
- Slack チャンネル構成、マスターシート等の内部リンク

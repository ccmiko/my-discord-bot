# my-discord-bot

- とある団体の中で使うため作ったdiscord botのコードをそのまま持ってきた
  - 元々、全て自分で作ったコードand別にセキュアな情報入れてないand隠したいことないため、そのまま公開
- いろいろ勉強してもっとdiscord bot作る力を上げていきたい
  - 既存の便利なbotを使いこなすスキルも大事だけど、自分で作れるのもカッコいいよね！
- のじゃろり狐が好きだからそういうテイストなbotにしていきたい

## コードに関する前置き

- vscode前提です
- typescript、yarn使ってます
- 公開にしてますが、誰かと一緒にこのリポジトリで何かしよう的な予定はないです。ただ隠すことがない趣味開発リポジトリだから公開にしているだけです
- このREADMEページ等にある程度の解説入れてますが、見たら大体わかるだろ前提です。

## 実行環境の用意

- `.env.example`を参考に環境変数を用意
- `yarn install`
- `yarn run:example`

ここまで動けばおk！！！

[公式ドキュメント](https://discord.js.org/#/) 読めばだいたいわかると思います

## 自鯖にbotを浮かべて使用したい

- とりあえず、2022年時点で行っていた自分のVPSで浮かべてた方法をご紹介します
- 大前提としてdiscord appの画面でトークン等のセキュア情報は取得しておいてください
- どこぞのクラウドサービスに浮かべるときもやり方の雰囲気は同じかと

### 自鯖内にnode.jsをインストール

- 好きなやり方で

```bash
sudo yum install -y nodejs npm
curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
sudo yum install yarn
```

### ソースコードをcloneしておきます

- ↓このコマンドは一例で

```bash
mkdir -p /var/apps; cd /var/apps
git clone git@github.com:ccmiko/my-discord-bot.git
cd my-discord-bot
```

- ここで `.env` を作る（後述の通りsystemdから参照できるconfファイル作るからいらないかもしれない、インフラ的な部分は詳しくないごめんなさい）

```bash
yarn install
```

- ここでお試しでbot動かしたい場合は `package.json` のスクリプトを参照してください

### botをデーモン化させる

- 環境変数値を設定ファイルに落とし込む（ `.env` あればいらないかもしれない。インフラ的な部分は詳しくないごめんなさい）

```bash
# 中身はとりあえず.envと同じでOK
sudo vi /etc/systemd/system/my-discord-bot.conf
```

- サービスの定義を作る

```bash
sudo vi /etc/systemd/system/my-discord-bot.service
```

- ↓中身

```conf
[Unit]
Description=discord bot

[Service]
WorkingDirectory=/var/apps/my-discord-bot
EnvironmentFile=/etc/systemd/system/my-discord-bot.conf
ExecStart=/usr/bin/yarn run:bot:start

[Install]
WantedBy=multi-user.target
```

- **chmod的な権限の変更が必要かもしれない。覚えてないごめんなさい**
- 最後に一通り動かしてみる

```bash
sudo systemctl daemon-reload
sudo systemctl status my-discord-bot
sudo systemctl start my-discord-bot
sudo systemctl stop my-discord-bot
sudo systemctl restart my-discord-bot
```

- discord appページで設定した対象のサーバでbotがオンラインになってたら成功だと思います。

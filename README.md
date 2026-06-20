# Rails Inertia TODO App

inertia_rails + React によるシンプルな TODO アプリのサンプルです。

## 技術スタック

- **Ruby on Rails 8.1** — バックエンド
- **inertia_rails** — Rails と React をつなぐアダプター
- **React 19 + @inertiajs/react v3** — フロントエンド
- **esbuild (jsbundling-rails)** — JSX バンドラー
- **Tailwind CSS v4** — スタイリング
- **SQLite** — データベース

## セットアップ

```bash
# Ruby と Node.js をインストール後、以下を実行
bin/setup
```

`bin/setup` は以下を自動実行して `bin/dev` で開発サーバーを起動します:

1. `bundle install` — Ruby gems のインストール
2. `yarn install` — npm パッケージのインストール
3. `bin/rails db:prepare` — データベースの作成とマイグレーション
4. `bin/dev` — 開発サーバーの起動（Rails サーバー + JS ウォッチャー + CSS ウォッチャー）

ブラウザで http://localhost:3000 を開くと TODO アプリが表示されます。

## 手動での起動

```bash
bundle install
yarn install
bin/rails db:prepare
bin/dev
```

## テストの実行

```bash
bin/rails test
```

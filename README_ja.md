[English](https://github.com/AquiTCD/pentazemin/blob/master/README.md)/[日本語](https://github.com/AquiTCD/pentazemin/blob/master/README_ja.md)

# Pentazemin
Pentazeminはタスク消化を支援するためのアプリです。今やるべきことへフォーカスし集中することを助けるためにポモドーロテクニックをベースにしたタスク管理アプリの1つです。

## Pentazeminのコンセプト
> 気分をコントロールしようと試みるのは最悪の解決法だ。その変わりにシステムを作って運用するべきである。

PentazeminはただのToDoアプリではなく、時間管理法に近しいものでもあります。
ToDoアプリやポモドーロタイマーアプリは既に数多くありますが、Pentazeminはその2つを組み合わせました。

まず一日の始めに全てのタスクをセットしてください。そうしたらあとはそれにしたがって、タスクをこなし続けるだけです。

### 最小の単位を25分に決めました
時間の見積りを楽にします。もし1つのタスクが大きい場合でも、「このタスクにはいくつポモドーロが必要だろうか？」と考えるだけです。

見通しが立ってないタスクを認識しやすくなります。もし1つのタスクに対してポモドーロ数が多すぎる場合、それはもっと細かいタスクに砕くべきだという証拠です。

### 操作せずとも自動的に次のタスクが開始します
次のタスクに移るとき、アプリが入力を求める場合、集中を途切れさせてしまいやすくなります。これこそがなぜ邪魔することなく自動的にタイマーがスタートする理由です。

### 終了時間を表示します
終了時間を確認できることはモチベーションアップにつながります。さらに全体のタスク数のバランスを取るのにも便利です。

## 参照情報
### 紹介
+ [Pentazemin - Introduction](https://aquitcd.github.io/Pentazemin/) (English)
+ [Pentazemin - 紹介](https://aquitcd.github.io/Pentazemin/ja/) (日本語)

### ユーザーズガイド
準備中です。

### その他
ポモドーロテクニックの基礎についての理解を推奨します。

+ [The Pomodoro Technique](https://cirillocompany.de/pages/pomodoro-technique/)(English)
+ [Google/ポモドーロ・テクニック](https://www.google.co.jp/search?q=ポモドーロ+テクニック)(日本語)

## 'Pentazemin'と名付けられた理由
Pentazeminという名前はビデオゲームの*[メタルギアソリッド](http://www.konami.jp/mgs_portal/jp/)* シリーズに登場するアイテムからとっています。Pentazeminは抗不安剤のサポートアイテムでゲーム中では敵を撃つときの狙いを安定させる効果があります。
ふだんタスクをこなすとき、簡単にフォーカスを失なってしまいます。Pentazeminはそのフォーカスを失なってしまう機会を減らす目的で作られました。
さらに2つの理由があります。Pentazeminは2つのアプリから強い影響を受けています。1つめは[TaskChute](https://cyblog.biz/pro/taskchute2/)で、Pentazeminの名前がある種のシューティングとシュートの言葉遊びから発想しているところです。2つめは [Vitamin-R](http://www.publicspace.net/Vitamin-R/)というmacOS用の機能豊富なタイマーアプリです。これが薬みたいな名前にした理由です。

## 開発者向け
### やること
[Project](https://github.com/AquiTCD/Pentazemin/projects/1)を見てください。

### 使っている技術
+ Electron
+ Vue.js
  - HTML
    - Pug
  - CSS
    - Buefy
    - Stylus
  - JS
    - Moment.js
    - vuedraggable
    - vue-multiselect
+ D3 for graph
+ NeDB for data presistance
+ testing
  - karma
  - mocha
  - power-assert
  - sinon
+ Travis CI
+ GitLocalize

### ライセンス
MIT

- - -
### ビルドセットアップ

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test

# lint all JS/Vue component files in `src/`
npm run lint

```
NPMの変わりYarnも使えます。
詳しくは`package.json`を参照してください。

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[b31b441](https://github.com/SimulatedGREG/electron-vue/tree/b31b44123ad42acac12337c4955df4ead853f0df) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

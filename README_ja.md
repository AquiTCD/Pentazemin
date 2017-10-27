[English](https://github.com/AquiTCD/pentazemin/blob/master/README.md)/[日本語](https://github.com/AquiTCD/pentazemin/blob/master/README_ja.md)

# Pentazemin

タスクシュートとポモドーロテクニックに影響を受けたToDoマネジメントアプリ 。

タスクシュートは素晴しいシステムながらも、小さなタスクをいちいち入力することや、タスクに対して見積時間を決めることが大変だ。

そこにポモドーロテクニックを組み込んだ。

タスクの粒度を25分づつで考えて見積りしやすくし、またタイマーを使って集中することをサポートする。

つまり、まず一日の予定をPentazeminで決めたら、あとはしたがって次々とタスクと休憩を繰り返すシステム。

> 気分をコントロールしようと試みるのは最悪の解決法。その変わりにシステムを作って運用すべし。

## 概要

### 基本の使い方

1タスク（ポモドロ）が終わる時に通知がされる。

これはOSの通知を使うものと、アプリ独自のものがあり、独自のものは全画面を暗くしたりなどVitamin-Rに影響を受けている。
タスクが終わる時はただちに休憩に入り、休憩が終わる時は同様にただちにタスクに入る。

多くのタスク管理アプリでは都度入力などが求められるが、これは集中を妨げ、フォーカスが外れる機会を作ってしまう。

1タスク（ポモドロ）が終わる時に通知がされる。{br0}
これはOSの通知を使うものと、アプリ独自のものがあり、独自のものは全画面を暗くしたりなどVitamin-Rに影響を受けている。
タスクが終わる時はただちに休憩に入り、休憩が終わる時は同様にただちにタスクに入る。{br1}
多くのタスク管理アプリでは都度入力などが求められるが、これは集中を妨げ、フォーカスが外れる機会を作ってしまう。

### for users

### Roadmap / todo

- [x] Indicate current taks with pie chart
- [x] tagging
- [x] extra mission(like lanch-break, meeting, etc. fixed duration task
- [ ] test / bug fix / refactor
- [ ] introduction for users
    - [ ] github page
- [ ] i18n
    - [ ] Inside of App
    - [ ] introduction
- [ ] Add tools
    - [ ] instant timer
    - [ ] support math with PERT
- [ ] enhance notification
    - [ ] customizable
    - [ ] add more types
    - [ ] with sound
- [ ] enhance archiving analyze
    - [ ] sortable
    - [ ] paging
    - [ ] insert separater by day
    - [ ] notes for a day
- [ ] enhance preferences
    - [ ] hot-key
- [ ] API for making connection with other apps

## Technologies in Use

- Electron
- Vue.js
    - HTML
        - Pug
    - CSS
        - Buefy
        - Stylus
    - JS
        - Moment.js
        - vuedraggable
        - vue-multiselect
- D3 for graph
- NeDB for data presistance
- testing
    - karma
    - mocha
    - power-assert
    - sinon
- Travis CI
- GitLocalize

## 'Pentazemin'という名前の由来

メタルギアソリッドシリーズから。

## License

MIT

---

## Build Setup

```bash
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

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[b31b441](https://github.com/SimulatedGREG/electron-vue/tree/b31b44123ad42acac12337c4955df4ead853f0df) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

[English](https://github.com/AquiTCD/pentazemin/blob/master/README.md)/[日本語](https://github.com/AquiTCD/pentazemin/blob/master/README_ja.md)

# Pentazemin
An app for task shooting. Helps your concentration and keeping focus to do your tasks.
A kind of Task management app based on Pomodoro Technique.

## Concept of Pentazemin
> Trying to control mind is the worst solution. Make a system and run it instead.

Pentazemin is not just a ToDo app. This is more like an app for time management.
There are a lot of ToDo apps and timer apps for Pomodoro Technique as well.
Pentazemin is the app combined ToDo management with Pomodoro Technique.

First, set your all tasks to do for the day. Then just follow it, do it, and repeat!

### A shortest term is fixed 25 minutes
Easy to estimate each tasks. Even if A task is big, just think like 'How many Pomodoros need to do this task?'.
Easy to recognize unclear tasks. If the count of Pomodoros are too many for one task, which means the tasks should be crushed smaller some tasks.

### Starts next task automaticaly without any control
If the app needs any touching to control when move to next task, it make you easy to lose your concentration and pace. That is the reason why starts timer automatically not to disturb.

### Indicates progress and the time to finish
To know the time to finish all tasks, it gives you motivation. And also it is useful when you set tasks to make a balance of quantity.

## Refefences
### Introduction
+ [Pentazemin - Introduction](https://aquitcd.github.io/Pentazemin/) (English)
+ [Pentazemin - 紹介](https://aquitcd.github.io/Pentazemin/ja/) (日本語)

### Users Guide
In progress

### Others
Recommend to know about Pomodoro Technique.

+ [The Pomodoro Technique](https://cirillocompany.de/pages/pomodoro-technique/)(English)
+ [Google/ポモドーロ・テクニック](https://www.google.co.jp/search?q=ポモドーロ+テクニック)(日本語)

## The reason of named 'Pentazemin'
The name of Pentazemin comes from *[Metal gear solid](http://www.konami.jp/mgs_portal/jp/)* series(video game). Pentazemin is a support item which is a kind of anti-anxiety drug, it afect aiming to be stable when shoot enemies in the game.
People are easy to lose focus from what to do when doing tasks. Pentazemin helps to keep focus and to reduce oppotunity of losing it.
And also, There are 2 more reasons.
Pentazemin is strongly inspired by 2 apps, the first is [TaskChute](https://cyblog.biz/pro/taskchute2/). The imagination of Pentazemin is a word playing like Task Shooting. Then second is [Vitamin-R](http://www.publicspace.net/Vitamin-R/) which is a functional timer app for macOS. This is the reason of name like a drug.

## For Developpers
### Todo
See [Project](https://github.com/AquiTCD/Pentazemin/projects/1)

### Technologies in Use
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

### License
MIT

- - -
### Build Setup

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
You can use Yarn instead of NPM.
See `package.json` more deteal.

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[b31b441](https://github.com/SimulatedGREG/electron-vue/tree/b31b44123ad42acac12337c4955df4ead853f0df) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

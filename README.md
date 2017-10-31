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

### A shortest term is fixed 25 minuts
Easy to estimate each tasks. Even if A task is big, just think like 'How many Pomodoros need to do this task?'.  
Easy to recognize unclear tasks. If the count of Pomodoros are too many for one task, which means the tasks should be crushed smaller some tasks.

### Starts next task automaticaly without any control
If the app need any touching to control when move to next task, it make you easy to lose your concentration and pace. That is the reason why starts timer automatically not to disturb.

### Indicates progress and the time to finish
To know the time to finish all tasks, it gives you motivation. And also it is useful when you set tasks to make a balance of quantity.

## Refefences
### Introduction
+ Pentazemin - Introduction (English)
+ ~~Pentazemin - Introduction (日本語)~~(in Progress)

### Users Guide
In progress

### Others
Recommend to know about Pomodoro Technique.

+ [The Pomodoro Technique](https://cirillocompany.de/pages/pomodoro-technique/)(English)
+ [Google/ポモドーロ・テクニック](https://www.google.co.jp/search?q=ポモドーロ+テクニック)(日本語)

<!-- ### Problems of ordinary ToDo app
1. Hard to estimate, because size of each tasks is not constant
2. Easy to postpone tasks you do not want to do
3. Not clear the progress and the time to finish

### Problems of ordinary Pomodoro timer app
1. Need to control something every time of Pomodoro finished
2. Not strong enough to keep concentration
3. Not fanctional ennough for potential of Pomodoro Technique


<!-- ## Overview
### Basic to use
At start at a day, enter your tasks to do for this day with Pomodoro technic.  
A group of tasks called 'Mission' in this system.  
The max pomodoros is 4 in a mission, because long break comes each 4 break in Pomodoro, and if you want to make more than 5 pomodoros in a mission which means too big, need to crush as smaller tasks.

When finish a task(pomodoro), notifier will be shown. It comes from system notification, or from app original.  
The original notification is inpired by Vitamine-R, it is like dimmer on full-screen.  
Then start break time immidiately. Also when finish a break, start next task immidiately as well.
Most of task management require user action when finish.  
That is bother your concentration, and gives you an opotunity to be out of focus. -->

## The reason of named 'Pentazemin'
The name of Pentazemin comes from *[Metal gear solid](http://www.konami.jp/mgs_portal/jp/)* series(video game). Pentazemin is a support item which is a kind of anti-anxiety drug, it afect aiming to be stable when shoot enemies in the game.  
People are easy to lose focus from what to do when doing tasks. Pentazemin helps to keep focus and to reduce oppotunity of losing it.  
And also, There are 2 more reasons.  
Pentazemin is strongly inspired by 2 apps, the first is [TaskChute](https://cyblog.biz/pro/taskchute2/). The imagination of Pentazemin is a word playing like Task Shooting. Then second is [Vitamin-R](http://www.publicspace.net/Vitamin-R/) which is a functional timer app for macOS. This is the reason of name like a drug.

## For Developpers
### Roadmap and ToDo (not ordinaly)
+ [x] Indicate current taks with pie chart
  + [ ] replace a better way instead of d3
+ [x] tagging
  - [ ] replace a better way instead of vue-multiselect
+ [x] extra mission(like lanch-break, meeting, etc. fixed duration task
+ [x] test / bug fix / refactor (minimum)
+ [ ] introductions
  + [ ] update readme
  + [ ] github page
  + [ ] users guide
+ [ ] i18n
  + [ ] App
  + [ ] introduction
+ [ ] enhance planning
  - [ ] add 'pending' status for pomodoro
  - [ ] add 'routine' status for pomodoro
+ [ ] enhance notification
  + [ ] customizable
  + [ ] add more types
  + [ ] with sound
+ [ ] enhance archiving analyze
  + [ ] sortable
  + [ ] paging
  + [x] insert separater by day
  + [x] notes for a day
+ [ ] enhance preferences
  + [ ] hot-key customization
+ [ ] API for making connection with other apps
+ [ ] basic E2E testing
+ [ ] advanced E2E testing
+ [ ] basic store unit testing
+ [ ] advanced unit testing

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

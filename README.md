[English](https://github.com/AquiTCD/pentazemin/blob/master/README.md)/[日本語](https://github.com/AquiTCD/pentazemin/blob/master/README_ja.md)
# Pentazemin
An app for supporting concentration on your tasks. Inspired by Pomodoro technic and TaskChute.

TaskChute is a great system, but sometime it is hard to decide estimate time, and feel not good making evry sigle of little task.  
That's why it is combined Pomodoro technic.  
A duration of the shortest term should be 25 minutes. It makes easier to decide estimate time for each tasks. And also the timer system helps your concentration.  
So, once you make a plan for a day in Pentazemin, just shoot your tasks following it.

> Trying to control mind is the worst solution. Make a system and run it instead.

## Overview
### Basic to use
At start at a day, enter your tasks to do for this day with Pomodoro technic.  
A group of tasks called 'Mission' in this system.  
The max pomodoros is 4 in a mission, because long break comes each 4 break in Pomodoro, and if you want to make more than 5 pomodoros in a mission which means too big, need to crush as smaller tasks.

When finish a task(pomodoro), notifier will be shown. It comes from system notification, or from app original.  
The original notification is inpired by Vitamine-R, it is like dimmer on full-screen.  
Then start break time immidiately. Also when finish a break, start next task immidiately as well.
Most of task management require user action when finish.  
That is bother your concentration, and gives you an opotunity to be out of focus.

### for users

### Roadmap / todo
+ [x] Indicate current taks with pie chart
+ [x] tagging
+ [x] extra mission(like lanch-break, meeting, etc. fixed duration task
+ [ ] test / bug fix / refactor
+ [ ] introduction for users
  + [ ] github page
+ [ ] i18n
  + [ ] Inside of App
  + [ ] introduction
+ [ ] Add tools
  - [ ] instant timer
  - [ ] support math with PERT
+ [ ] enhance notification
  + [ ] customizable
  + [ ] add more types
  + [ ] with sound
+ [ ] enhance archiving analyze
  + [ ] sortable
  + [ ] paging
  + [ ] insert separater by day
  + [ ] notes for a day
+ [ ] enhance preferences
  + [ ] hot-key
+ [ ] API for making connection with other apps

## Technologies in Use
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

## Naming of 'Pentazemin'
Pentazemin comes from *Metal gear solid* series. Pentazemin is a support item which is a kind of anti-anxiety drug. In that game, it supports aiming to make focus stable when shooting enemies. Usualy, it is easy to lose focus from what to do when we do some tasks. Pentazemin helps to keep focus and to reduce oppotunity of losing it.  
And also, Pentazemin is strongly inspired by TaskChute and Vitamin-R(which is timer app for pomodoro and etc.). This is the reason of name like a drug, and word play like TaskShoot.

## License
MIT
- - -
## Build Setup

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

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[b31b441](https://github.com/SimulatedGREG/electron-vue/tree/b31b44123ad42acac12337c4955df4ead853f0df) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

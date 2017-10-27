import Vue from 'vue'
import uuidv4 from 'uuid/v4'
import _ from 'lodash'
import DB from '../../API/DB'
import Notifier from '../../API/Notifier'
import { ipcRenderer } from 'electron'
const state = {
  missions: [
    // {
    //   name: 'mission name',
    //   pomodoros: 1,
    //   quadrant: 5,
    //   tags: '',
    //   notes: '',
    //   id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    //   isDeleted: false,
    //   remainingSec: 0
    // }
  ],
  pomodoros: [
    // {
    //   index: 1,
    //   missionId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    //   id: 'zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz',
    //   isComplete: false
    // }
  ],
  dayChartData: [
    {
      name: '',
      value: 1,
      color: 'lightgrey',
    },
  ],
  extras: [
    // {
    //   id: 'yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy',
    //   name: 'extra name',
    //   min: 30,
    //   isRepeat: false,
    //   tags: '',
    //   notes: '',
    //   isComplete: false,
    //   isDeleted: false
    // }
  ],
  notes: '',
  timer: {
    name: '',
    isCounting: false,
    isInBreak: false,
    remainingSec: 0,
    breakCount: 0,
  },
}
const getters = {
  missionIds_by_status: state => status => {
    return _(state.missions)
      .filter(status)
      .map('id')
      .value()
  },
  parentMission: state => pomodoro => {
    return _.find(state.missions, { id: pomodoro.missionId })
  },
  editingMission: (state, getters) => pomodoro => {
    return _.cloneDeep(getters.parentMission(pomodoro))
  },
  editingExtra: (state, getters) => extra => {
    return _.cloneDeep(extra)
  },
  brotherPomodoros: (state, getters) => pomodoro => {
    return _(getters.allPomodoros)
      .filter({ missionId: pomodoro.missionId })
      .value()
  },
  projectTag: (state, getters) => mission => {
    const regexp = /^@.*/
    let prjTag = null
    if (mission.tags) {
      if (
        _.some(mission.tags, tag => {
          return tag.name.match(regexp)
        })
      ) {
        prjTag = _.find(mission.tags, tag => {
          return tag.name.match(regexp)
        }).name
      }
    }
    return prjTag
  },
  allPomodoros: (state, getters) => {
    let ids = getters.missionIds_by_status('isDeleted')
    return _(state.pomodoros)
      .reject(pomodoro => {
        for (let id of ids) {
          if (pomodoro.missionId === id) {
            return true
          }
        }
      })
      .orderBy('index')
      .orderBy('isComplete', 'desc')
      .value()
  },
  extraIds_by_status: state => status => {
    return _(state.missions)
      .filter(status)
      .map('id')
      .value()
  },
  allExtras: (state, getters) => {
    let ids = getters.extraIds_by_status('isDeleted')
    return _(state.extras)
      .reject(extra => {
        for (let id of ids) {
          if (extra.id === id) {
            return true
          }
        }
      })
      .value()
  },
  allMissions: state => {
    return _(state.missions)
      .reject('isDeleted')
      .value()
  },
  allPomodorosTime: (state, getters, rootState) => {
    let allPomodorosCount = _(getters.allPomodoros).size()
    return (
      rootState.Settings.user.pomodoroMin * 60 * allPomodorosCount +
      rootState.Settings.user.shortBreakMin * 60 * (allPomodorosCount - 1) +
      (rootState.Settings.user.longBreakMin -
        rootState.Settings.user.shortBreakMin) *
        60 *
        Math.floor(
          (allPomodorosCount - 1) / rootState.Settings.user.longBreakPoint
        ) +
      _.sum(
        _(getters.allExtras)
          .map('min')
          .value()
      ) *
        60
    )
  },
  currentChartData: (state, getters, rootState) => {
    let breakMin =
      state.timer.breakCount % rootState.Settings.user.longBreakPoint === 0
        ? rootState.Settings.user.longBreakMin
        : rootState.Settings.user.shortBreakMin
    let duration = state.timer.isInBreak
      ? breakMin * 60
      : rootState.Settings.user.pomodoroMin * 60
    if (getters.currentMission) {
      return [
        {
          name: '',
          value: duration - getters.currentMission.remainingSec,
          color: 'lightgrey',
        },
        {
          name: '',
          value: getters.currentMission.remainingSec,
          color: 'grey',
        },
      ]
    }
  },
  dayChartData: (state, getters) => {
    let chartData = []
    let completeCount
    if (getters.completePomodoros) {
      completeCount = getters.completePomodoros.length
    } else {
      completeCount = 0
    }
    let completeObj = {
      name: '',
      value: completeCount,
      color: 'lightgrey',
    }
    chartData.push(completeObj)
    if (getters.incompletePomodoros.length) {
      for (let p of getters.incompletePomodoros) {
        let arcColor
        let q = getters.parentMission(p) ? getters.parentMission(p).quadrant : 0
        switch (q) {
          case 1:
            arcColor = 'hsl(348, 100%, 61%)'
            break
          case 2:
            arcColor = 'hsl(141, 71%, 48%)'
            break
          case 3:
            arcColor = 'hsl(48, 100%, 67%)'
            break
          case 4:
            arcColor = 'hsl(48, 100%, 67%)'
            break
          default:
            arcColor = 'grey'
        }
        let newP = {
          name: '',
          value: 1,
          color: arcColor,
        }
        chartData.push(newP)
      }
    }
    return chartData
  },
  completePomodoros: (state, getters) => {
    return _(getters.allPomodoros)
      .filter('isComplete')
      .value()
  },
  completeExtras: (state, getters) => {
    return _(getters.allExtras)
      .filter('isComplete')
      .value()
  },
  completeTime: (state, getters, rootState) => {
    let completePomodorosCount = _(getters.completePomodoros).size()
    let allPomodorosCount = _(getters.allPomodoros).size()
    let progressSec = getters.currentMission
      ? getters.currentMission.remainingSec
      : 0
    let breakCount = completePomodorosCount
    if (completePomodorosCount === allPomodorosCount) {
      breakCount -= 1
    }
    let time =
      rootState.Settings.user.pomodoroMin * 60 * completePomodorosCount +
      rootState.Settings.user.shortBreakMin * 60 * breakCount +
      (rootState.Settings.user.longBreakMin -
        rootState.Settings.user.shortBreakMin) *
        60 *
        Math.floor(breakCount / rootState.Settings.user.longBreakPoint) +
      _.sum(
        _(getters.completeExtras)
          .map('min')
          .value()
      ) *
        60
    if (state.timer.isInBreak) {
      time -= progressSec
    } else if (completePomodorosCount !== allPomodorosCount) {
      time += rootState.Settings.user.pomodoroMin * 60 - progressSec
    }
    return time
  },
  incompletePomodoros: (state, getters) => {
    return _(getters.allPomodoros)
      .reject('isComplete')
      .value()
  },
  remainingTime: (state, getters) => {
    return getters.allPomodorosTime - getters.completeTime
  },
  currentMission: (state, getters) => {
    if (getters.incompletePomodoros.length) {
      return state.timer.isInBreak
        ? state.timer
        : getters.parentMission(getters.incompletePomodoros[0])
    }
  },
  nextMission: (state, getters) => {
    if (getters.incompletePomodoros.length) {
      let firstPomodoroOfOtherMission = _(getters.incompletePomodoros)
        .reject({
          missionId: getters.incompletePomodoros[0].missionId,
        })
        .value()[0]
      if (firstPomodoroOfOtherMission) {
        return getters.mission_by_id(firstPomodoroOfOtherMission.missionId)
      }
    }
  },
  mission_by_id: state => id => {
    return _.find(state.missions, { id: id })
  },
  allTags: (state, getters) => {
    return _(state.missions.concat(state.extras))
      .reject('isDeleted')
      .reject({ tags: '' })
      .map('tags')
      .flatten()
      .uniqBy(tag => tag.code)
      .value()
  },
}

const actions = {
  LOAD({ commit }) {
    DB.pomodoros.getAll(pomodoros => {
      commit('SET_POMODOROS', pomodoros)
    })
    DB.missions.getAll(missions => {
      commit('SET_MISSIONS', missions)
    })
    DB.extras.getAll(extras => {
      commit('SET_EXTRAS', extras)
    })
    DB.notes.getAll(notes => {
      commit('SET_NOTES', notes)
    })
  },
  CREATE_MISSION({ commit, rootState }, newMission) {
    let missionId = uuidv4()
    for (let i = 0; i < newMission.pomodoros; i++) {
      let newPomodoro = {
        index: _.size(state.pomodoros) + 1,
        missionId,
        id: uuidv4(),
        isComplete: false,
      }
      DB.pomodoros.create(newPomodoro)
      commit('ADD_POMODORO', newPomodoro)
    }
    newMission.id = missionId
    newMission.isDeleted = false
    newMission.remainingSec = rootState.Settings.user.pomodoroMin * 60
    DB.missions.create(newMission)
    commit('ADD_MISSION', newMission)
  },
  CREATE_EXTRA({ commit }, newExtra) {
    newExtra.id = uuidv4()
    newExtra.isComplete = false
    newExtra.isDeleted = false
    DB.extras.create(newExtra)
    commit('ADD_EXTRA', newExtra)
  },
  TOGGLE_EXTRA({ commit, dispatch }, extra) {
    let values = {
      id: extra.id,
    }
    values.isComplete = !extra.isComplete
    dispatch('UPDATE_EXTRA', values)
  },
  INCREASE_POMODORO({ dispatch, commit, getters }, pomodoro) {
    let newPomodoro = {
      index: pomodoro.index + 1,
      missionId: pomodoro.missionId,
      id: uuidv4(),
      isComplete: false,
    }
    DB.pomodoros.create(newPomodoro)
    commit('ADD_POMODORO', newPomodoro)
    let values = {
      id: getters.parentMission(pomodoro).id,
      pomodoros: getters.parentMission(pomodoro).pomodoros + 1,
    }
    dispatch('UPDATE_MISSION', values)
    dispatch('UPDATE_POMODOROS_ORDER', state.pomodoros)
  },
  DECREASE_POMODORO({ dispatch, commit, getters }, pomodoro) {
    let brothers = getters.brotherPomodoros(pomodoro)
    let removingId = brothers[brothers.length - 1].id
    DB.pomodoros.delete(removingId)
    commit('REMOVE_POMODORO_BY_ID', removingId)
    let values = {
      id: getters.parentMission(pomodoro).id,
      pomodoros: getters.parentMission(pomodoro).pomodoros - 1,
    }
    dispatch('UPDATE_MISSION', values)
    dispatch('UPDATE_POMODOROS_ORDER', state.pomodoros)
  },
  UPDATE_POMODOROS_ORDER({ dispatch, commit, getters }, pomodoros) {
    DB.pomodoros.reorder(_.cloneDeep(pomodoros))
    commit('REORDER_POMODOROS', pomodoros)
  },
  UPDATE_POMODORO({ commit }, values) {
    let idx = _.findIndex(state.pomodoros, { id: values.id })
    let storedPomodoro = state.pomodoros[idx]
    for (let key in storedPomodoro) {
      if (values[key] == null) {
        values[key] = storedPomodoro[key]
      }
    }
    DB.pomodoros.update(values)
    commit('UPDATE_POMODORO', { idx, values })
  },
  UPDATE_MISSION({ commit }, values) {
    let idx = _.findIndex(state.missions, { id: values.id })
    let storedMission = state.missions[idx]
    for (let key in storedMission) {
      if (values[key] == null) {
        values[key] = storedMission[key]
      }
    }
    DB.missions.update(values)
    commit('UPDATE_MISSION', { idx, values })
  },
  UPDATE_EXTRA({ commit }, values) {
    let idx = _.findIndex(state.extras, { id: values.id })
    let storedExtra = state.extras[idx]
    for (let key in storedExtra) {
      if (values[key] == null) {
        values[key] = storedExtra[key]
      }
    }
    DB.extras.update(values)
    commit('UPDATE_EXTRA', { idx, values })
  },
  UPDATE_TIMER({ commit }, values) {
    let storedTimer = state.timer
    for (let key in storedTimer) {
      if (values[key] == null) {
        values[key] = storedTimer[key]
      }
    }
    commit('UPDATE_TIMER', { values })
  },
  DELETE_MISSION({ commit, dispatch, getters }, pomodoro) {
    DB.missions.delete(pomodoro.missionId)
    commit('REMOVE_MISSION_BY_ID', pomodoro.missionId)
    for (let p of getters.brotherPomodoros(pomodoro)) {
      DB.pomodoros.delete(p.id)
      commit('REMOVE_POMODORO_BY_ID', p.id)
    }
    dispatch('UPDATE_POMODOROS_ORDER', state.pomodoros)
  },
  DELETE_EXTRA({ commit }, extra) {
    DB.extras.delete(extra.id)
    commit('REMOVE_EXTRA_BY_ID', extra.id)
  },
  START_TIMER({ dispatch, getters }) {
    let timerValue = { isCounting: true }
    dispatch('UPDATE_TIMER', timerValue)
    ipcRenderer.send('start-timer', getters.currentMission)
  },
  COUNTDOWN_TIME({ dispatch, commit, getters, rootState }) {
    let currentMission = getters.currentMission
    let currentPomodoro = getters.incompletePomodoros[0]
    if (!state.timer.isInBreak) {
      DB.missions.countdown(currentMission)
      if (rootState.Settings.user.useWarning) {
        if (
          currentMission.remainingSec ===
          rootState.Settings.user.warningMin * 60
        ) {
          Notifier.worning(currentMission)
        }
      }
    }
    commit('COUNTDOWN_TIME', currentMission)
    if (currentMission.remainingSec <= 0) {
      let timerValue = { isCounting: false }
      dispatch('STOP_TIMER', timerValue)
      dispatch('COMPLETE_TIMER', {
        mission: currentMission,
        pomodoro: currentPomodoro,
      })
    }
  },
  COMPLETE_TIMER({ dispatch, commit, getters, rootState }, payload) {
    let currentMission = payload.mission
    let currentPomodoro = payload.pomodoro
    Notifier.complete(currentMission)
    if (!state.timer.isInBreak) {
      let values = {
        id: currentPomodoro.id,
        isComplete: true,
      }
      dispatch('UPDATE_POMODORO', values)
      dispatch('FS_NOTIFY', 'dimmer')
    } else {
      dispatch('FS_NOTIFY', 'flasher')
    }
    if (getters.incompletePomodoros.length) {
      dispatch('BRIDGING_TIMER', currentMission)
    } else {
      dispatch('UPDATE_MENUBAR_TITLE', rootState.Settings.user.menubarTitle)
    }
  },
  BRIDGING_TIMER({ dispatch, commit, getters, rootState }, mission) {
    let timerValues = {}
    if (state.timer.isInBreak) {
      timerValues.isInBreak = false
    } else {
      timerValues.isInBreak = true
      if (
        state.timer.breakCount ===
        rootState.Settings.user.longBreakPoint - 1
      ) {
        timerValues.name = rootState.Settings.user.longBreakName
        timerValues.remainingSec = rootState.Settings.user.longBreakMin * 60
        timerValues.breakCount = 0
      } else {
        timerValues.name = rootState.Settings.user.shortBreakName
        timerValues.remainingSec = rootState.Settings.user.shortBreakMin * 60
        timerValues.breakCount = state.timer.breakCount + 1
      }
      let values = {
        id: mission.id,
        remainingSec: rootState.Settings.user.pomodoroMin * 60,
      }
      dispatch('UPDATE_MISSION', values)
    }
    dispatch('UPDATE_TIMER', timerValues)
    dispatch('START_TIMER')
  },
  STOP_TIMER({ getters, dispatch }) {
    let timerValue = { isCounting: false }
    dispatch('UPDATE_TIMER', timerValue)
    ipcRenderer.send('stop-timer', getters.currentMission)
  },
  TOGGLE_TIMER({ dispatch, commit }) {
    state.timer.isCounting ? dispatch('STOP_TIMER') : dispatch('START_TIMER')
  },
  EXTEND_TIMER({ dispatch, getters, rootState }) {
    let values = {
      remainingSec:
        getters.currentMission.remainingSec +
        rootState.Settings.user.extendMin * 60,
    }
    if (getters.currentMission.id) {
      values.id = getters.currentMission.id
      dispatch('UPDATE_MISSION', values)
    } else {
      dispatch('UPDATE_TIMER', values)
    }
    ipcRenderer.send('extend-timer', rootState.Settings.user.extendMin * 60)
  },
  FORCE_COMPLETE_TIMER({ dispatch, getters, rootState }) {
    let values = { remainingSec: 0 }
    if (getters.currentMission.id) {
      values.id = getters.currentMission.id
      dispatch('UPDATE_MISSION', values)
    } else {
      dispatch('UPDATE_TIMER', values)
    }
    ipcRenderer.send('force-complete-timer')
  },
  UPDATE_NOTES({ commit }, notes) {
    DB.notes.update(notes)
    commit('UPDATE_NOTES', notes)
  },
  FS_NOTIFY({ commit, getters }, type) {
    ipcRenderer.send('fs-notifier', type)
  },
  UPDATE_MENUBAR_TITLE({ commit, rootState }, message) {
    let title
    if (message) {
      title = message
    } else if (rootState.Settings.user.menubarTitle) {
      title = rootState.Settings.user.menubarTitle
    } else {
      title = require('../../../../package.json').name
    }
    ipcRenderer.send('update-menubar-title', title)
  },
}

const mutations = {
  SET_POMODOROS(state, pomodoros) {
    state.pomodoros = pomodoros
  },
  SET_MISSIONS(state, missions) {
    state.missions = missions
  },
  SET_EXTRAS(state, extras) {
    state.extras = extras
  },
  SET_NOTES(state, notes) {
    state.notes = notes
  },
  ADD_POMODORO(state, pomodoro) {
    state.pomodoros.push(pomodoro)
  },
  ADD_MISSION(state, mission) {
    state.missions.push(mission)
  },
  ADD_EXTRA(state, extra) {
    state.extras.push(extra)
  },
  UPDATE_POMODORO(state, payload) {
    Vue.set(state.pomodoros, payload.idx, payload.values)
  },
  UPDATE_MISSION(state, payload) {
    Vue.set(state.missions, payload.idx, payload.values)
  },
  UPDATE_EXTRA(state, payload) {
    Vue.set(state.extras, payload.idx, payload.values)
  },
  UPDATE_TIMER(state, payload) {
    state.timer = payload.values
  },
  COUNTDOWN_TIME(state, mission) {
    mission.remainingSec -= 1
  },
  UPDATE_NOTES(state, notes) {
    state.notes = notes
  },
  DELETE_NOTES(state) {
    state.notes = ''
  },
  REMOVE_POMODORO_BY_ID(state, id) {
    state.pomodoros = state.pomodoros.filter(pomodoro => pomodoro.id !== id)
  },
  REMOVE_MISSION_BY_ID(state, id) {
    state.missions = state.missions.filter(mission => mission.id !== id)
  },
  REMOVE_EXTRA_BY_ID(state, id) {
    state.extras = state.extras.filter(extra => extra.id !== id)
  },
  REORDER_POMODOROS(state, pomodoros) {
    for (let i = 0; i < pomodoros.length; i++) {
      pomodoros[i].index = i + 1
    }
    state.pomodoros = pomodoros
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

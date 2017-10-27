import _ from 'lodash'
import DB from '../../API/DB'
import { ipcRenderer } from 'electron'
const state = {
  default: {
    pomodoroMin: 25,
    extendMin: 3,
    useWarning: true,
    warningMin: 3,
    shortBreakName: 'BREAK',
    shortBreakMin: 5,
    useLongBreak: true,
    longBreakPoint: 4,
    longBreakName: 'LONG BREAK',
    longBreakMin: 15,
    menubarTitle: 'Pentazemin',
    maxPomodoros: 4,
    defaultPomodoros: 1,
    defaultQuadrant: 2,
    dimmerDuration: 3000,
    flasherDuration: 100,
  },
  user: {},
}
const getters = {
  user: state => {
    return _.cloneDeep(state.user)
  },
}
const actions = {
  LOAD({ commit }) {
    DB.settings.getAll(settings => {
      commit('SET', settings)
    })
  },
  UPDATE({ commit }, settings) {
    DB.settings.update(settings)
    commit('UPDATE', settings)
  },
  RESET({ commit }) {
    DB.settings.update(state.default)
    commit('UPDATE', state.default)
  },
}

const mutations = {
  SET(state, settings) {
    if (Object.keys(settings).length === Object.keys(state.default).length) {
      state.user = settings
    } else {
      state.user = state.default
    }
    ipcRenderer.send('apply-settings', state.user)
  },
  UPDATE(state, settings) {
    state.user = settings
    ipcRenderer.send('apply-settings', state.user)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

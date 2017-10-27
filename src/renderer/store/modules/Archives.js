import Vue from 'vue'
import _ from 'lodash'
import DB from '../../API/DB'
import uuidv4 from 'uuid/v4'
const state = {
  archives: [
    //     {
    //       id: 'xxx',
    //       date: 'date',
    //       notes: 'notes',
    //       isDeleted: false,
    //       missions: [
    //         {
    //           id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    //           count: 0
    //         }
    //       ]
    //     }
  ],
}

const getters = {
  allArchives: state => {
    return _(state.archives)
      .reject('isDeleted')
      .orderBy('date', 'desc')
      .value()
  },
}
const actions = {
  LOAD({ commit }) {
    DB.archives.getAll(archives => {
      commit('SET', archives)
    })
  },
  ARCHIVE_COMPLETE_POMODOROS(
    { commit, getters, dispatch, rootState, rootGetters },
    date
  ) {
    if (_.some(state.archives, a => Number(a.date) === Number(date))) {
      let idx = _.findIndex(state.archives, { date: date })
      let storedArchive = state.archives[idx]
      let values = {}
      let appendArchive = {}
      appendArchive.notes = rootState.Datastore.notes || ''
      appendArchive.missions = _(rootGetters['Datastore/completePomodoros'])
        .countBy(p => p.missionId)
        .map((v, k) => ({
          id: k,
          count: v,
        }))
        .value()
      if (storedArchive.notes && appendArchive.notes) {
        values.notes = storedArchive.notes + '\n' + appendArchive.notes
      } else {
        values.notes = storedArchive.notes + appendArchive.notes
      }
      let merge = storedArchive.missions.concat(appendArchive.missions)
      values.missions = _(merge)
        .groupBy(m => m.id)
        .mapValues(v => _.sum(_.map(v, 'count')))
        .map((v, k) => ({
          id: k,
          count: v,
        }))
        .value()
      for (let key in storedArchive) {
        if (values[key] == null) {
          values[key] = storedArchive[key]
        }
      }
      commit('UPDATE', { idx, values })
      DB.archives.update(values)
    } else {
      let newArchive = {}
      newArchive.id = uuidv4()
      newArchive.date = date
      newArchive.isDeleted = false
      newArchive.notes = rootState.Datastore.notes || ''
      newArchive.missions = _(rootGetters['Datastore/completePomodoros'])
        .countBy(p => p.missionId)
        .map((v, k) => ({
          id: k,
          count: v,
        }))
        .value()
      commit('ADD', newArchive)
      DB.archives.create(newArchive)
    }
    for (let p of rootGetters['Datastore/completePomodoros']) {
      DB.pomodoros.delete(p.id)
      commit('Datastore/REMOVE_POMODORO_BY_ID', p.id, { root: true })
    }
    for (let e of rootGetters['Datastore/allExtras']) {
      if (e.isComplete) {
        if (e.isRepeat) {
          dispatch('Datastore/TOGGLE_EXTRA', e, { root: true })
        } else {
          dispatch('Datastore/DELETE_EXTRA', e, { root: true })
        }
      }
    }
    DB.notes.delete()
    commit('Datastore/DELETE_NOTES', null, { root: true })
    let timerValues = {}
    if (rootState.Datastore.timer.isInBreak) {
      timerValues.isInBreak = false
      timerValues.remainingSec = 0
    }
    timerValues.breakCount = 0
    dispatch('Datastore/UPDATE_TIMER', timerValues, { root: true })
    dispatch(
      'Datastore/UPDATE_POMODOROS_ORDER',
      rootState.Datastore.pomodoros,
      { root: true }
    )
  },
}

const mutations = {
  SET(state, archives) {
    state.archives = archives
  },
  ADD(state, archive) {
    state.archives.push(archive)
  },
  UPDATE(state, payload) {
    Vue.set(state.archives, payload.idx, payload.values)
  },
  REMOVE_BY_ID(state, id) {
    state.archives = state.filter(archive => archive.id !== id)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

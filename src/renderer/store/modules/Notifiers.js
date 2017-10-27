const state = {
  dimmer: {
    isActive: false,
    duration: 3000,
  },
  flasher: {
    isActive: false,
    duration: 100,
  },
}
const actions = {
  ACTIVATE_FS_NOTIFIER({ commit }, type) {
    switch (type) {
      case 'dimmer':
        commit('ACTIVATE_DIMMER')
        setTimeout(() => {
          commit('DEACTIVATE_DIMMER')
        }, state.dimmer.duration)
        break
      case 'flasher':
        commit('ACTIVATE_FLASHER')
        setTimeout(() => {
          commit('DEACTIVATE_FLASHER')
        }, state.flasher.duration)
        break
    }
  },
  APPLY_SETTINGS({ commit }, type) {
    commit('APPLY_SETTINGS', type)
  },
}
const mutations = {
  ACTIVATE_DIMMER(state, payload) {
    state.dimmer.isActive = true
  },
  DEACTIVATE_DIMMER(state, payload) {
    state.dimmer.isActive = false
  },
  ACTIVATE_FLASHER(state, payload) {
    state.flasher.isActive = true
  },
  DEACTIVATE_FLASHER(state, payload) {
    state.flasher.isActive = false
  },
  APPLY_SETTINGS(state, payload) {
    state.dimmer.duration = payload.dimmerDuration
    state.flasher.duration = payload.flasherDuration
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

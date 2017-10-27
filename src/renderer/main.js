import Vue from 'vue'
import axios from 'axios'
import App from './App'
import filters from './filters'
import router from './router'
import store from './store'
import Buefy from 'buefy'

import { ipcRenderer } from 'electron'
Vue.use(Buefy, {
  defaultIconPack: 'fa',
})
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

ipcRenderer.on('toggle-timer', function(event, type) {
  store.dispatch('Datastore/TOGGLE_TIMER')
})
ipcRenderer.on('countdown-time', function(event, type) {
  store.dispatch('Datastore/COUNTDOWN_TIME')
})
ipcRenderer.on('complete-timer', function(event, type) {
  store.dispatch('Datastore/COMPLETE_TIMER')
})
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  beforeCreate() {
    ipcRenderer.send('stop-timer')
  },
  created() {
    store.dispatch('Datastore/LOAD')
    store.dispatch('Archives/LOAD')
    store.dispatch('Settings/LOAD')
    store.dispatch('Datastore/UPDATE_MENUBAR_TITLE')
  },
  beforeDestroy() {
    ipcRenderer.removeListener('toggle-timer', function(event, type) {
      store.dispatch('Datastore/TOGGLE_TIMER')
    })
    ipcRenderer.send('stop-timer')
  },
}).$mount('#app')

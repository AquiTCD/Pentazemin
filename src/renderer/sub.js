import Vue from 'vue'
import Notifier from './Notifier.vue'
import store from './store'
import { ipcRenderer } from 'electron'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

ipcRenderer.on('fs-notification', function(event, type) {
  store.dispatch('Notifiers/ACTIVATE_FS_NOTIFIER', type)
})
ipcRenderer.on('apply-settings', function(event, type) {
  store.dispatch('Notifiers/APPLY_SETTINGS', type)
})

/* eslint-disable no-new */
new Vue({
  components: { Notifier },
  store,
  template: '<Notifier/>',
  beforeDestroy() {
    ipcRenderer.removeListener('fs-notification', function(event, type) {
      store.dispatch('Notifiers/ACTIVATE_FS_NOTIFIER', type)
      store.dispatch('Notifiers/APPLY_SETTINGS', type)
    })
  },
}).$mount('#notifier')

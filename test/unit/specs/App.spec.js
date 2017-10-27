import Vue from 'vue'
import { shallow } from 'avoriaz'
import Vuex from 'vuex'
import assert from 'power-assert'
import App from '@/App'
import Navbar from '@/components/Global/Navbar'
import Timer from '@/components/Global/Timer'
Vue.use(Vuex)
// mock component
const routerView = {
  name: 'router-view',
  render: h => h('div'),
}
describe('App.vue', () => {
  it('is a component', () => {
    const wrapper = shallow(App)
    Vue.component('router-view', routerView)
    assert.strictEqual(wrapper.isVueComponent, true)
  })
  it('should contain Navbar', () => {
    Vue.component('router-view', routerView)
    const wrapper = shallow(App)
    assert.strictEqual(wrapper.contains(Navbar), true)
  })
  it('should contain Timer', () => {
    Vue.component('router-view', routerView)
    const wrapper = shallow(App)
    assert.strictEqual(wrapper.contains(Timer), true)
  })
})

import Vue from 'vue'
import { shallow } from 'avoriaz'
import Vuex from 'vuex'
import Buefy from 'buefy'
// import sinon from 'sinon'
import assert from 'power-assert'
import Info from '@/components/Info'
import About from '@/components/Info/About'
import Settings from '@/components/Info/Settings'

Vue.use(Vuex)
Vue.use(Buefy)

describe('Info.vue', () => {
  it('is a component', () => {
    const wrapper = shallow(Info)
    assert(wrapper.isVueComponent === true)
  })
  describe('include components', () => {
    it('should contain About', () => {
      const wrapper = shallow(Info)
      assert(wrapper.contains(About) === true)
    })
    it('should contain Settings', () => {
      const wrapper = shallow(Info)
      assert(wrapper.contains(Settings) === true)
    })
  })
})

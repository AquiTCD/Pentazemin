import Vue from 'vue'
import { shallow } from 'avoriaz'
import Vuex from 'vuex'
import Buefy from 'buefy'
// import sinon from 'sinon'
import assert from 'power-assert'
import Aim from '@/components/Aim'
import Indicator from '@/components/Aim/Indicator'
import NextMission from '@/components/Aim/NextMission'

Vue.use(Vuex)
Vue.use(Buefy)

describe('Aim.vue', () => {
  it('is a component', () => {
    const wrapper = shallow(Aim)
    assert(wrapper.isVueComponent === true)
  })
  describe('include components', () => {
    it('should contain Indicator', () => {
      const wrapper = shallow(Aim)
      assert(wrapper.contains(Indicator) === true)
    })
    it('should contain NextMission', () => {
      const wrapper = shallow(Aim)
      assert(wrapper.contains(NextMission) === true)
    })
  })
})

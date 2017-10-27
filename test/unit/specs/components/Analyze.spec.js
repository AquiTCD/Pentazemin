import Vue from 'vue'
import { shallow } from 'avoriaz'
import Vuex from 'vuex'
import Buefy from 'buefy'
// import sinon from 'sinon'
import assert from 'power-assert'
import Factory from '@/../../test/unit/factories'
import Analyze from '@/components/Analyze'
import Archives from '@/components/Analyze/Archives'

Vue.use(Vuex)
Vue.use(Buefy)
describe('Analyze.vue', () => {
  let getters
  let testOptions
  beforeEach(() => {
    getters = {
      'Archives/allArchives': () => [],
    }
    testOptions = {
      getters,
    }
  })
  it('is a component', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(Analyze, { store })
    assert(wrapper.isVueComponent === true)
  })
  describe('include components', () => {
    beforeEach(() => {
      testOptions.getters['Archives/allArchives'] = () => [
        Factory.archive.build(),
      ]
    })
    it('should contain Archives', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Analyze, { store })
      assert(wrapper.contains(Archives) === true)
    })
  })
  describe('when any archives do not exist', () => {
    it('should render proper message')
  })
  // it('should not exist same archives of date')
})

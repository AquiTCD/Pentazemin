import Vue from 'vue'
import { shallow } from 'avoriaz'
import Vuex from 'vuex'
import Buefy from 'buefy'
import assert from 'power-assert'
import Factory from '@/../../test/unit/factories'
import NextMission from '@/components/Aim/NextMission'

Vue.use(Vuex)
Vue.use(Buefy)

describe('NextMission.vue', () => {
  let state
  let getters
  let testOptions
  beforeEach(() => {
    state = {
      Datastore: {
        noetes: '',
        timer: {},
      },
    }
    getters = {
      'Datastore/nextMission': () => {},
    }
    testOptions = {
      state,
      getters,
    }
  })
  describe('when any next mission do not exist', () => {
    it('should not render any information as a next mission', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(NextMission, { store })
      assert(wrapper.find('.next-mission').length === 0)
    })
  })
  describe('when any next mission exist', () => {
    beforeEach(() => {
      testOptions.getters['Datastore/nextMission'] = () =>
        Factory.mission.build({
          name: 'this is a next mission',
          notes: 'this is a notes of next mission',
          tags: [{ name: 'testTag', code: '@111' }],
        })
    })
    it('should render name of next mission', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(NextMission, { store })
      assert(
        /this is a next mission/.test(
          wrapper
            .find('.next-mission')[0]
            .find('.panel-heading')[0]
            .text()
        ) === true
      )
    })
    it('should render tags of next mission if it has them', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(NextMission, { store })
      assert(
        wrapper
          .find('.next-mission')[0]
          .find('.panel-content')[0]
          .find('.tags')[0]
          .find('.tag')[0]
          .text() === 'testTag '
      )
    })
    it('should render notes of next mission if it has them', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(NextMission, { store })
      assert(
        wrapper
          .find('.next-mission')[0]
          .find('.panel-content')[0]
          .find('.notes')[0]
          .text() === 'this is a notes of next mission'
      )
    })
  })
})

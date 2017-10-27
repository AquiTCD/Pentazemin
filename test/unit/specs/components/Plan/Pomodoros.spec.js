import Vue from 'vue'
import { shallow } from 'avoriaz'
import Vuex from 'vuex'
import Buefy from 'buefy'
// import sinon from 'sinon'
import assert from 'power-assert'
import Factory from '@/../../test/unit/factories'
import Pomodoros from '@/components/Plan/Pomodoros'

Vue.use(Vuex)
Vue.use(Buefy)

describe('Pomodoros.vue', () => {
  let state
  let getters
  let testOptions
  let propsData
  beforeEach(() => {
    state = {
      Settings: {
        user: Factory.setting.build(),
      },
    }
    getters = {
      'Datastore/projectTag': () => pomodoro => '',
      'Datastore/brotherPomodoros': () => pomodoro => [],
      'Datastore/parentMission': () => pomodoro => {},
    }
    testOptions = {
      state,
      getters,
    }
    propsData = {
      pomodoro: {},
    }
  })
  describe('when any pomodoros do not exist', () => {
    it('should not render anything', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Pomodoros, { propsData, store })
      assert.equal(wrapper.text(), false)
    })
  })
  describe('when any pomodoros exist', () => {
    beforeEach(() => {
      state.Settings.user.maxPomodoros = 4
      propsData.pomodoro = {
        missionId: 'THIS-IS-A-TEST-MISSION',
        isComplete: false,
      }
      testOptions.getters['Datastore/parentMission'] = () => pomodoro =>
        Factory.mission.build({
          id: 'THIS-IS-A-TEST-MISSION',
          name: 'this is a test mission',
          quadrant: 3,
          pomodoros: 5,
        })
      testOptions.getters['Datastore/projectTag'] = () => mission =>
        '@ProjectTag'
    })
    it('should render proper colors which depend on quadrant of thier mission', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Pomodoros, { propsData, store })
      assert(
        wrapper
          .find('tr')[0]
          .find('.index')[0]
          .hasClass('isQs3') === true
      )
    })
    describe('when a pomodoro is complete', () => {
      beforeEach(() => {
        propsData.pomodoro = {
          missionId: 'THIS-IS-A-TEST-MISSION',
          isComplete: true,
        }
      })
      it('should render complete pomodoro with class for striked style', () => {
        const store = new Vuex.Store(testOptions)
        const wrapper = shallow(Pomodoros, { propsData, store })
        assert(wrapper.find('tr')[0].hasClass('isComplete') === true)
      })
    })
    describe('when a pomodoro has tags', () => {
      beforeEach(() => {
        testOptions.getters['Datastore/projectTag'] = () => extra =>
          '@ProjectTag'
      })
      it('should render project tag', () => {
        const store = new Vuex.Store(testOptions)
        const wrapper = shallow(Pomodoros, { store, propsData })
        assert(
          wrapper
            .find('tr')[0]
            .find('.project')[0]
            .text() === '@ProjectTag '
        )
      })
    })
  })
})

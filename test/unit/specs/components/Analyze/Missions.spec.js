import Vue from 'vue'
import { shallow } from 'avoriaz'
import Vuex from 'vuex'
import Buefy from 'buefy'
// import sinon from 'sinon'
import assert from 'power-assert'
import Factory from '@/../../test/unit/factories'
import Missions from '@/components/Analyze/Missions'

Vue.use(Vuex)
Vue.use(Buefy)

describe('Archives.vue', () => {
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
      'Datastore/mission_by_id': () => id => {},
      'Datastore/projectTag': () => {},
    }
    testOptions = {
      state,
      getters,
    }
    propsData = {
      mission: {},
    }
  })
  it('is a component', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(Missions, { store, propsData })
    assert(wrapper.isVueComponent === true)
  })
  describe('when any missions do not exist', () => {
    it('should not render anything', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Missions, { store, propsData })
      assert.equal(wrapper.text(), false)
    })
  })
  describe('when any missions exist', () => {
    beforeEach(() => {
      state.Settings.user.maxPomodoros = 4
      propsData.mission = {
        id: 'THIS-IS-AN-ARCHIVED-MISSION',
        count: 5,
      }
      testOptions.getters['Datastore/mission_by_id'] = () => id =>
        Factory.mission.build({
          id: 'THIS-IS-AN-ARCHIVED-MISSION',
          name: 'this is an archived mission',
          quadrant: 3,
          pomodoros: 5,
        })
      testOptions.getters['Datastore/projectTag'] = () => mission =>
        '@ProjectTag'
      Factory.pomodoro.build({ isComplete: false })
    })
    it('should render something', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Missions, {
        propsData,
        store,
      })
      assert.ok(wrapper.text().length, true)
    })
    it('should render missions of pomodoros', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Missions, {
        propsData,
        store,
      })
      assert(wrapper.find('.name')[0].text() === 'this is an archived mission')
    })
    it('should render with proper color class which depend of quadrant of missions', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Missions, {
        propsData,
        store,
      })
      assert(wrapper.find('tr')[0].getAttribute('class') === 'isQs3')
    })
    it('should render project tags of missions', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Missions, {
        propsData,
        store,
      })
      assert(
        wrapper
          .find('tr')[0]
          .find('.project')[0]
          .find('.tag')[0]
          .text() === '@ProjectTag '
      )
    })
    it('should render notice icon if pomodoro count is over max pomodoro count', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Missions, {
        propsData,
        store,
      })
      assert(
        wrapper
          .find('tr')[0]
          .find('.pomodoros')[0]
          .contains('.warning') === true
      )
    })
  })
})

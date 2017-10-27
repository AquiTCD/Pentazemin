import Vue from 'vue'
import { shallow } from 'avoriaz'
import Vuex from 'vuex'
import Buefy from 'buefy'
import sinon from 'sinon'
import assert from 'power-assert'
import Factory from '@/../../test/unit/factories'
import Indicator from '@/components/Aim/Indicator'

Vue.use(Vuex)
Vue.use(Buefy)

describe('Indicator.vue', () => {
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
      'Datastore/currentChartData': () => {},
      'Datastore/allPomodoros': () => [],
      'Datastore/allPomodorosTime': () => 0,
      'Datastore/completePomodoros': () => [],
      'Datastore/completeTime': () => 0,
      'Datastore/incompletePomodoros': () => [],
      'Datastore/remainingTime': () => 0,
      'Datastore/currentMission': () => {},
      'Datastore/dayChartData': () => {},
    }
    testOptions = {
      state,
      getters,
    }
  })
  it('should render indicator frames', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(Indicator, { store })
    assert(wrapper.find('.main-indicator').length === 2)
    assert(wrapper.find('.sub-indicator').length === 3)
  })
  describe('when any pomodoros do not exist', () => {
    it('should render 0 in all pomodoro counts', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Indicator, { store })
      assert(
        wrapper
          .find('.sub-indicator')[2]
          .find('.title')[0]
          .text() === '0'
      )
    })
    it('should render 0 in all pomodoro time', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Indicator, { store })
      assert(
        wrapper
          .find('.sub-indicator')[2]
          .find('.subtitle')[0]
          .text() === '0 min'
      )
    })
  })
  describe('when pomodoros exist', () => {
    beforeEach(() => {
      testOptions.getters['Datastore/allPomodoros'] = () => [
        Factory.pomodoro.build(),
        Factory.pomodoro.build(),
      ]
      testOptions.getters['Datastore/allPomodorosTime'] = () => 3600
    })
    it('should render all pomodoro counts', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Indicator, { store })
      assert(
        wrapper
          .find('.sub-indicator')[2]
          .find('.title')[0]
          .text() === '2'
      )
    })
    it('should render all pomodoro time', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Indicator, { store })
      assert(
        wrapper
          .find('.sub-indicator')[2]
          .find('.subtitle')[0]
          .text() === '1.00 hrs'
      )
    })
  })
  describe('when incomplete pomodoros are not remaining', () => {
    it('should render proper message', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Indicator, { store })
      assert(
        wrapper
          .find('.main-indicator')[0]
          .find('p')[0]
          .text() === 'No Remaining Pomodoro'
      )
      assert(
        wrapper
          .find('.main-indicator')[1]
          .find('p')[0]
          .text() === 'No Remaining Missions'
      )
    })
    it('should render 0 in remaining pomodoro counts', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Indicator, { store })
      assert(
        wrapper
          .find('.sub-indicator')[0]
          .find('.title')[0]
          .text() === '0'
      )
    })
    it('should render 0 in remaining pomodoro time', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Indicator, { store })
      assert(
        wrapper
          .find('.sub-indicator')[0]
          .find('.subtitle')[0]
          .text() === '0 min'
      )
    })
  })
  describe('when incomplete pomodoros are remaining', () => {
    beforeEach(() => {
      state.Datastore.notes = 'this is note of the day'
      state.Datastore.timer.isInBreak = false
      testOptions.getters['Datastore/allPomodoros'] = () => [
        Factory.pomodoro.build({ isComplete: false }),
        Factory.pomodoro.build({ isComplete: false }),
      ]
      testOptions.getters['Datastore/incompletePomodoros'] = () => [
        Factory.pomodoro.build({ isComplete: false }),
        Factory.pomodoro.build({ isComplete: false }),
      ]
      testOptions.getters['Datastore/currentMission'] = () =>
        Factory.mission.build({
          name: 'this is a test mission',
          notes: 'this is a notes of test mission',
          tags: [{ name: 'testTag', code: '@111' }],
        })
      testOptions.getters['Datastore/remainingTime'] = () => 3600
      // new Date() should be 'Thu Jan 01 1970 09:00:00 GMT+0900 (JST)'
      sinon.useFakeTimers()
    })
    it('should render estimate time', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Indicator, { store })
      let date = new Date()
      let hours = ('0' + (date.getHours() + 1)).slice(-2)
      let minutes = ('0' + date.getMinutes()).slice(-2)
      assert(
        wrapper
          .find('.main-indicator')[1]
          .find('p')[0]
          .text() === 'will Finish at'
      )
      assert(
        wrapper
          .find('.main-indicator')[1]
          .find('p')[1]
          .text() === `${hours}:${minutes}`
      )
    })
    it('should render chart of mission')
    it('should render notes of the day', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Indicator, { store })
      assert(
        wrapper
          .find('.main-indicator')[1]
          .find('.notes')[0]
          .text() === 'this is note of the day'
      )
    })
    it('should render incomplete pomodoros count', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Indicator, { store })
      assert(
        wrapper
          .find('.sub-indicator')[0]
          .find('.title')[0]
          .text() === '2'
      )
    })
    it('should render total time of incomplete pomodoros', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Indicator, { store })
      assert(
        wrapper
          .find('.sub-indicator')[0]
          .find('.subtitle')[0]
          .text() === '1.00 hrs'
      )
    })
    // describe('when it is not break time', () => {

    it('should render chart of pomodoro')
    it('should render name of mission', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Indicator, { store })
      assert(
        wrapper
          .find('.main-indicator')[0]
          .find('.title')[0]
          .text() === 'this is a test mission'
      )
    })
    it('should render tags of pomodoro if it has them', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Indicator, { store })
      assert(
        wrapper
          .find('.main-indicator')[0]
          .find('.notes')[0]
          .text() === 'this is a notes of test mission'
      )
    })
    it('should render notes of pomodoro if it has them', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Indicator, { store })
      assert(
        wrapper
          .find('.main-indicator')[0]
          .find('.tags')[0]
          .find('.tag')[0]
          .text() === 'testTag '
      )
    })
  })
  // })
  describe('when complete pomodoros do not exist', () => {
    it('should render 0 in complete pomodoro counts', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Indicator, { store })
      assert(
        wrapper
          .find('.sub-indicator')[1]
          .find('.title')[0]
          .text() === '0'
      )
    })
    it('should render 0 in complete pomodoro time', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Indicator, { store })
      assert(
        wrapper
          .find('.sub-indicator')[1]
          .find('.subtitle')[0]
          .text() === '0 min'
      )
    })
  })
  describe('when complete pomodoros exist', () => {
    beforeEach(() => {
      testOptions.getters['Datastore/completePomodoros'] = () => [
        Factory.pomodoro.build(),
        Factory.pomodoro.build(),
        Factory.pomodoro.build(),
      ]
      testOptions.getters['Datastore/completeTime'] = () => 5400
    })
    it('should render complete pomodoro counts', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Indicator, { store })
      assert(
        wrapper
          .find('.sub-indicator')[1]
          .find('.title')[0]
          .text() === '3'
      )
    })
    it('should render complete pomodoro time', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Indicator, { store })
      assert(
        wrapper
          .find('.sub-indicator')[1]
          .find('.subtitle')[0]
          .text() === '1.50 hrs'
      )
    })
  })
})

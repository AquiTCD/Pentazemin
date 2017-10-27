import Vue from 'vue'
import { shallow } from 'avoriaz'
import Vuex from 'vuex'
import Buefy from 'buefy'
import sinon from 'sinon'
import assert from 'power-assert'
import Factory from '@/../../test/unit/factories'
import Timer from '@/components/Global/Timer'
Vue.use(Vuex)
Vue.use(Buefy)

describe('Timer.vue', () => {
  let state
  let getters
  let actions
  let testOptions
  beforeEach(() => {
    state = {
      Datastore: {
        timer: Factory.timer.build(),
      },
      Settings: {
        user: Factory.setting.build(),
      },
    }
    getters = {
      'Datastore/incompletePomodoros': () => [],
      'Datastore/currentMission': () => {},
    }
    actions = {
      'Datastore/START_TIMER': sinon.stub(),
      'Datastore/STOP_TIMER': sinon.stub(),
      'Datastore/EXTEND_TIMER': sinon.stub(),
      'Datastore/FORCE_COMPLETE_TIMER': sinon.stub(),
    }
    testOptions = {
      state,
      getters,
      actions,
    }
  })
  it('is a component', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(Timer, { store })
    assert(wrapper.isVueComponent === true)
  })
  describe('when no remaining pomodoros', () => {
    it('should not show button and timer', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Timer, { store })
      assert(wrapper.contains('.timerButton') === false)
      assert(wrapper.contains('.timerDisplay') === false)
    })
  })
  describe('when pomodoros remain', () => {
    beforeEach(() => {
      testOptions.getters['Datastore/incompletePomodoros'] = () => [
        Factory.pomodoro.build(),
        Factory.pomodoro.build(),
      ]
      testOptions.getters['Datastore/currentMission'] = () =>
        Factory.mission.build({
          name: 'test mission name',
          remainingSec: 1500,
        })
    })
    it('should show buttons and timer', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Timer, { store })
      assert(wrapper.contains('.timerButton') === true)
      assert(wrapper.contains('.timerDisplay') === true)
    })
    it('should show time', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Timer, { store })
      assert(wrapper.find('.remainingSeconds')[0].text() === '25:00')
    })
    it('should show name of current mission', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Timer, { store })
      assert(
        wrapper.find('.currentMissionName')[0].text() === 'test mission name'
      )
    })
    it('should show play button', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Timer, { store })
      assert(
        wrapper
          .find('.timerButton')[0]
          .find('i')[0]
          .text() === 'play-circle'
      )
    })
    it('should fire extend timer if push extend button', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Timer, { store })
      wrapper
        .find('.timerDisplay')[0]
        .find('.timerControl')[0]
        .find('.extend-timer')[0]
        .trigger('click')
      assert(actions['Datastore/EXTEND_TIMER'].calledOnce === true)
    })
    it('should fire make timer 0 if push force end button', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Timer, { store })
      wrapper
        .find('.timerDisplay')[0]
        .find('.timerControl')[0]
        .find('.force-complete-timer')[0]
        .trigger('click')
      assert(actions['Datastore/FORCE_COMPLETE_TIMER'].calledOnce === true)
    })
    describe('when timer is counting', () => {
      beforeEach(() => {
        state.Datastore.timer.isCounting = true
      })
      it('should show stop button when timer is counting', () => {
        const store = new Vuex.Store(testOptions)
        const wrapper = shallow(Timer, { store })
        wrapper.update()
        assert(
          wrapper
            .find('.timerButton')[0]
            .find('i')[0]
            .text() === 'pause-circle'
        )
      })
    })
  })
})

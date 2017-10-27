import Vue from 'vue'
import { mount } from 'avoriaz'
import Vuex from 'vuex'
import Buefy from 'buefy'
import sinon from 'sinon'
import assert from 'power-assert'
import Factory from '@/../../test/unit/factories'
import Settings from '@/components/Info/Settings'

Vue.use(Vuex)
Vue.use(Buefy)

describe('Settings.vue', () => {
  let state
  let getters
  let actions
  let testOptions
  beforeEach(() => {
    state = {
      Settings: {
        default: {
          pomodoroMin: 25,
          extendMin: 3,
          useWarning: true,
          warningMin: 3,
          shortBreakName: 'BREAK',
          shortBreakMin: 5,
          useLongBreak: true,
          longBreakPoint: 4,
          longBreakName: 'LONG BREAK',
          longBreakMin: 15,
          menubarTitle: 'Pentazemin',
          maxPomodoros: 4,
          defaultPomodoros: 1,
          defaultQuadrant: 2,
        },
      },
    }
    getters = {
      'Settings/user': () =>
        Factory.setting.build({
          pomodoroMin: 25,
          extendMin: 3,
          useWarning: true,
          warningMin: 3,
          shortBreakName: 'BREAK',
          shortBreakMin: 5,
          useLongBreak: true,
          longBreakPoint: 4,
          longBreakName: 'LONG BREAK',
          longBreakMin: 15,
          menubarTitle: 'Pentazemin',
          maxPomodoros: 4,
          defaultPomodoros: 1,
          defaultQuadrant: 2,
        }),
    }
    actions = {
      'Settings/UPDATE': sinon.stub(),
      'Settings/RESET': sinon.stub(),
      'Datastore/FS_NOTIFY': sinon.stub(),
    }
    testOptions = {
      state,
      getters,
      actions,
    }
  })
  it('should render component Title', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = mount(Settings, { store })
    assert(wrapper.find('.title')[0].text() === 'Preferences')
  })
  it('shoud fire RESET when reset button push', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = mount(Settings, { store })
    wrapper.find('.reset')[0].trigger('click')
    assert(actions['Settings/RESET'].calledOnce === true)
  })
  it('shoud fire UPDATE when saved button push', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = mount(Settings, { store })
    wrapper.find('.update')[0].trigger('click')
    assert(actions['Settings/UPDATE'].calledOnce === true)
  })
  // NOTE: how to mock or stub ipc
  // it('should quit if push quit button')
  describe('when user customized own settings', () => {
    beforeEach(() => {
      testOptions.getters['Settings/user'] = () =>
        Factory.setting.build({
          pomodoroMin: 30,
          extendMin: 5,
          useWarning: false,
          warningMin: 5,
          shortBreakName: 'TEST BREAK',
          shortBreakMin: 8,
          useLongBreak: false,
          longBreakPoint: 2,
          longBreakName: 'TEST LONG BREAK',
          longBreakMin: 20,
          menubarTitle: 'TEST Pentazemin',
          maxPomodoros: 6,
          defaultPomodoros: 3,
          defaultQuadrant: 0,
        })
    })
    it('should render user customized settings', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = mount(Settings, { store })
      assert(
        wrapper
          .find('.pomodoro-min')[0]
          .find('input')[0]
          .value() === '30'
      )
      assert(
        wrapper
          .find('.extend-min')[0]
          .find('input')[0]
          .value() === '5'
      )
      // NOTE: how to check the value of buefy switch
      // assert(
      //   wrapper
      //     .find('.use-warning')[0]
      //     .find('input')[0]
      //     .value() === 'off'
      // )
      assert(
        wrapper
          .find('.warning-min')[0]
          .find('input')[0]
          .value() === '5'
      )
      assert(
        wrapper
          .find('.short-break-name')[0]
          .find('input')[0]
          .value() === 'TEST BREAK'
      )
      assert(
        wrapper
          .find('.short-break-min')[0]
          .find('input')[0]
          .value() === '8'
      )
      // NOTE: how to check the value of buefy switch
      // assert(
      //   wrapper
      //     .find('.use-long-break')[0]
      //     .find('input')[0]
      //     .value() === 'off'
      // )
      assert(
        wrapper
          .find('.long-break-point')[0]
          .find('input')[0]
          .value() === '2'
      )
      assert(
        wrapper
          .find('.long-break-name')[0]
          .find('input')[0]
          .value() === 'TEST LONG BREAK'
      )
      assert(
        wrapper
          .find('.long-break-min')[0]
          .find('input')[0]
          .value() === '20'
      )
      assert(
        wrapper
          .find('.max-pomodoros')[0]
          .find('input')[0]
          .value() === '6'
      )
      assert(
        wrapper
          .find('.default-pomodoros')[0]
          .find('input')[0]
          .value() === '3'
      )
      assert(
        wrapper
          .find('.default-quadrant')[0]
          .find('select')[0]
          .value() === '0'
      )
    })
    it('should be disabled when Warking notice is false', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = mount(Settings, { store })
      assert(
        wrapper
          .find('.warning-min')[0]
          .find('input')[0]
          .hasAttribute('disabled') === true
      )
    })
    it('should be disabled when Use Long Break is false', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = mount(Settings, { store })
      assert(
        wrapper
          .find('.long-break-point')[0]
          .find('input')[0]
          .hasAttribute('disabled') === true
      )
      assert(
        wrapper
          .find('.long-break-name')[0]
          .find('input')[0]
          .hasAttribute('disabled') === true
      )
      assert(
        wrapper
          .find('.long-break-min')[0]
          .find('input')[0]
          .hasAttribute('disabled') === true
      )
    })
  })
})

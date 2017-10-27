import Vue from 'vue'
import { shallow } from 'avoriaz'
import Vuex from 'vuex'
import Buefy from 'buefy'
// import sinon from 'sinon'
import assert from 'power-assert'
import Factory from '@/../../test/unit/factories'
import Archives from '@/components/Analyze/Archives'
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
    getters = {}
    testOptions = {
      state,
      getters,
    }
    propsData = {}
  })
  it('is a component', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(Archives, { store })
    assert(wrapper.isVueComponent === true)
  })
  describe('when any archives do not exist', () => {
    it('should not render anything', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Archives, { store })
      assert.equal(wrapper.text(), false)
    })
  })
  describe('when any archives exist', () => {
    beforeEach(() => {
      propsData.archive = Factory.archive.build({
        date: new Date(0),
        notes: 'this is a note of daily archive',
      })
      testOptions.getters['Datastore/mission_by_id'] = () =>
        Factory.mission.build({ isComplete: false })
      testOptions.getters['Datastore/projectTag'] = () =>
        Factory.pomodoro.build({ isComplete: false })
    })
    it('should render something', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Archives, {
        propsData,
        store,
      })
      assert.ok(wrapper.text().length, true)
    })
    it('should contain Missions', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Archives, {
        propsData,
        store,
      })
      assert(wrapper.contains(Missions) === true)
    })
    it('should render archived date', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Archives, {
        propsData,
        store,
      })
      assert(
        /\d{4}-\d{2}-\d{2}/.test(
          wrapper
            .find('tr')[0]
            .find('.day')[0]
            .find('.date')[0]
            .text()
        ) === true
      )
    })
    it('should render notes of archived date if it has them', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Archives, {
        propsData,
        store,
      })
      assert(
        wrapper
          .find('tr')[1]
          .find('.notes')[0]
          .text() === 'this is a note of daily archive'
      )
    })
  })
})

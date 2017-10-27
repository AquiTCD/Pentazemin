import Vue from 'vue'
import { shallow } from 'avoriaz'
import Vuex from 'vuex'
import Buefy from 'buefy'
import sinon from 'sinon'
import assert from 'power-assert'
import Factory from '@/../../test/unit/factories'
import NewMission from '@/components/Global/Modals/NewMission'
Vue.use(Vuex)
Vue.use(Buefy)

const Multiselect = {
  name: 'multiselect',
  render: h => h('div'),
}
describe('NewMission.vue', () => {
  before(() => {
    Vue.component('multiselect', Multiselect)
  })
  let state
  let getters
  let actions
  let testOptions
  beforeEach(() => {
    state = {
      Settings: {
        user: Factory.setting.build(),
      },
    }
    getters = {
      'Datastore/allTags': () => [],
    }
    actions = {
      'Datastore/CREATE_MISSION': sinon.stub(),
    }
    testOptions = {
      state,
      getters,
      actions,
    }
  })
  it('should not be active at first', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(NewMission, { store })
    assert(wrapper.data().isActive === false)
  })
  it('should be inactive when modalClose() fired', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(NewMission, { store })
    wrapper.setData({ isActive: true })
    wrapper.vm.modalClose()
    assert(wrapper.data().isActive === false)
  })
  it('should fire CREATE_MISSION dispatch with proper datas', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(NewMission, { store })
    wrapper.setMethods({
      focusToDefault: () => {
        sinon.stub()
      },
    })
    wrapper.setData({ name: 'test new misison name' })
    wrapper.setData({ pomodoros: 2 })
    wrapper.setData({ quadrant: 2 })
    wrapper.setData({ notes: 'test notes' })
    wrapper.vm.createMission()
    assert(actions['Datastore/CREATE_MISSION'].calledOnce === true)
  })

  it('should not fire CREATE_MISSION New Mission without name', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(NewMission, { store })
    wrapper.setData({ name: '' })
    wrapper.setData({ pomodoros: 2 })
    wrapper.setData({ quadrant: 2 })
    wrapper.setData({ notes: 'test notes' })
    wrapper.vm.createMission()
    assert(actions['Datastore/CREATE_MISSION'].calledOnce === false)
  })
  it('should clear data when initForm fired', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(NewMission, { store })
    wrapper.setMethods({
      focusToDefault: () => {
        sinon.stub()
      },
    })
    wrapper.setData({ name: 'test new misison name' })
    wrapper.setData({ pomodoros: 2 })
    wrapper.setData({ quadrant: 2 })
    wrapper.setData({ notes: 'test notes' })
    wrapper.vm.initForm()
    assert(wrapper.data().name === '')
    assert(
      wrapper.data().pomodoros === store.state.Settings.user.defaultPomodoros
    )
    assert(
      wrapper.data().quadrant === store.state.Settings.user.defaultQuadrant
    )
    assert(wrapper.data().notes === '')
  })
})

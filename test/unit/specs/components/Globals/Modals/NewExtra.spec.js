import Vue from 'vue'
import { shallow } from 'avoriaz'
import Vuex from 'vuex'
import Buefy from 'buefy'
import sinon from 'sinon'
import assert from 'power-assert'
import Factory from '@/../../test/unit/factories'
import NewExtra from '@/components/Global/Modals/NewExtra'
Vue.use(Vuex)
Vue.use(Buefy)

const Multiselect = {
  name: 'multiselect',
  render: h => h('div'),
}
describe('NewExtra.vue', () => {
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
      'Datastore/CREATE_EXTRA': sinon.stub(),
    }
    testOptions = {
      state,
      getters,
      actions,
    }
  })
  it('should not be active at first', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(NewExtra, { store })
    assert(wrapper.data().isActive === false)
  })
  it('should be inactive when modalClose() fired', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(NewExtra, { store })
    wrapper.setData({ isActive: true })
    wrapper.vm.modalClose()
    assert(wrapper.data().isActive === false)
  })
  it('should fire CREATE_EXTRA dispatch with proper datas', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(NewExtra, { store })
    wrapper.setMethods({
      focusToDefault: () => {
        sinon.stub()
      },
    })
    wrapper.setData({ name: 'test new misison extra' })
    wrapper.setData({ min: 60 })
    wrapper.setData({ isRepeat: true })
    wrapper.setData({ notes: 'test notes' })
    wrapper.vm.createExtra()
    assert(actions['Datastore/CREATE_EXTRA'].calledOnce === true)
  })
  it('should not fire CREATE_Extra New Extra without name', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(NewExtra, { store })
    wrapper.setData({ name: '' })
    wrapper.setData({ min: 60 })
    wrapper.setData({ isRepeat: true })
    wrapper.setData({ notes: 'test notes' })
    wrapper.vm.createExtra()
    assert(actions['Datastore/CREATE_EXTRA'].calledOnce === false)
  })
  it('should not fire CREATE_Extra New Extra without min', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(NewExtra, { store })
    wrapper.setData({ name: 'test new misison extra' })
    wrapper.setData({ isRepeat: true })
    wrapper.setData({ notes: 'test notes' })
    wrapper.vm.createExtra()
    assert(actions['Datastore/CREATE_EXTRA'].calledOnce === false)
  })
  it('should clear data when initForm fired', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(NewExtra, { store })
    wrapper.setMethods({
      focusToDefault: () => {
        sinon.stub()
      },
    })
    wrapper.setData({ name: 'test new misison extra' })
    wrapper.setData({ min: 60 })
    wrapper.setData({ isRepeat: true })
    wrapper.setData({ notes: 'test notes' })
    wrapper.vm.initForm()
    assert(wrapper.data().name === '')
    assert(wrapper.data().min === '')
    assert(wrapper.data().isRepeat === false)
    assert(wrapper.data().notes === '')
  })
})

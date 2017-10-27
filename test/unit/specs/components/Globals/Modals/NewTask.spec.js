import Vue from 'vue'
import { shallow } from 'avoriaz'
import Vuex from 'vuex'
import Buefy from 'buefy'
import assert from 'power-assert'
import NewTask from '@/components/Global/Modals/NewTask'
import NewMission from '@/components/Global/Modals/NewMission'
import NewExtra from '@/components/Global/Modals/NewExtra'
Vue.use(Vuex)
Vue.use(Buefy)

describe.only('NewTask.vue', () => {
  it('is a component', () => {
    const wrapper = shallow(NewTask)
    assert(wrapper.isVueComponent === true)
  })
  it('should not be active at first', () => {
    const wrapper = shallow(NewTask)
    assert(wrapper.data().isActive === false)
  })
  it('should be inactive when modalClose() fired', () => {
    const wrapper = shallow(NewTask)
    wrapper.setData({ isActive: true })
    wrapper.vm.modalClose()
    assert(wrapper.data().isActive === false)
  })
  it('should make missionTab active as default', () => {
    const wrapper = shallow(NewTask)
    wrapper.setData({ isActive: true })
    assert(wrapper.contains(NewMission) === true)
  })
  it('should make extraTab active when selectExtraTab', () => {
    const wrapper = shallow(NewTask)
    wrapper.setData({ isActive: true, currentTab: 'Extra' })
    assert(wrapper.contains(NewExtra) === true)
  })
  it('should make missionTab active when selectMissionTab', () => {
    const wrapper = shallow(NewTask)
    wrapper.setData({ isActive: true, currentTab: 'Extra' })
    wrapper.setData({ currentTab: 'Mission' })
    assert(wrapper.contains(NewMission) === true)
  })
})

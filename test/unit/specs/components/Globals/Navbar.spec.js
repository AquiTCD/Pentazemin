import Vue from 'vue'
import { shallow } from 'avoriaz'
import Vuex from 'vuex'
import Buefy from 'buefy'
import assert from 'power-assert'
import Navbar from '@/components/Global/Navbar'
import NewTask from '@/components/Global/Modals/NewTask'
import Archive from '@/components/Global/Modals/Archive'
Vue.use(Vuex)
Vue.use(Buefy)

describe('Navbar.vue', () => {
  it('is a component', () => {
    const wrapper = shallow(Navbar)
    assert(wrapper.isVueComponent === true)
  })
  it('should contain link to root(/)')
  it('should contain logo image')
  it('should contain link to Plan(/plan)')
  it('should contain link to Aim(/Aim)')
  it('should contain link to Analyze(/Analyze)')
  it('should contain NewTask', () => {
    const wrapper = shallow(Navbar)
    assert(wrapper.contains(NewTask) === true)
  })
  it('should contain Archive', () => {
    const wrapper = shallow(Navbar)
    assert(wrapper.contains(Archive) === true)
  })
})

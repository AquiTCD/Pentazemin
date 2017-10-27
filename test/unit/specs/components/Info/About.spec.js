import Vue from 'vue'
import { mount } from 'avoriaz'
import Vuex from 'vuex'
import Buefy from 'buefy'
// import sinon from 'sinon'
import assert from 'power-assert'
import About from '@/components/Info/About'

Vue.use(Vuex)
Vue.use(Buefy)

describe('About.vue', () => {
  beforeEach(() => {})
  it('should render App Title', () => {
    const wrapper = mount(About)
    assert(wrapper.find('.title')[0].text() === 'Pentazemin')
  })
  it('should render App version', () => {
    const wrapper = mount(About)
    assert(/v\d+\.\d+\.\d+/.test(wrapper.find('.version')[0].text()) === true)
  })
  it('should render App description', () => {
    const wrapper = mount(About)
    assert(
      wrapper.find('.description')[0].text() ===
        'The Pomodoro technique based task management app.\n Helps your aiming for to do.'
    )
  })
})

import Vue from 'vue'
import { shallow } from 'avoriaz'
import Vuex from 'vuex'
import Buefy from 'buefy'
// import sinon from 'sinon'
import assert from 'power-assert'
import Factory from '@/../../test/unit/factories'
import Plan from '@/components/Plan'
import EditForm from '@/components/Plan/EditForm'
import Extras from '@/components/Plan/Extras'
import Notes from '@/components/Plan/Notes'
// import Pomodoros from '@/components/Plan/Pomodoros'

Vue.use(Vuex)
Vue.use(Buefy)

describe('Plan.vue', () => {
  let getters
  let testOptions
  beforeEach(() => {
    getters = {
      'Datastore/allPomodoros': () => [],
      'Datastore/allExtras': () => [],
    }
    testOptions = {
      getters,
    }
  })
  it('is a component', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(Plan, { store })
    assert(wrapper.isVueComponent === true)
  })
  describe('include components', () => {
    beforeEach(() => {
      testOptions.getters['Datastore/allPomodoros'] = () => [
        Factory.pomodoro.build(),
      ]
      testOptions.getters['Datastore/allExtras'] = () => [Factory.extra.build()]
    })
    it('should contain Extras', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Plan, { store })
      assert(wrapper.contains(Extras) === true)
    })
    it('should contain Notes', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Plan, { store })
      assert(wrapper.contains(Notes) === true)
    })
    it('should contain EditForm if form open', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Plan, { store })
      wrapper.setData({ form: { isOpen: true } })
      assert(wrapper.contains(EditForm) === true)
    })
    it('should contain Pomodoros')
    describe('integration test', () => {
      it('should not render pomodoros which has isDeleted property')
      it('should render each indexes number by order')
      it('should render pomodoro number by order in there mission')
      it('should render complete pomodoro on top of list')
    })
  })
})

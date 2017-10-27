import Vue from 'vue'
import { shallow } from 'avoriaz'
import Vuex from 'vuex'
import Buefy from 'buefy'
import sinon from 'sinon'
import assert from 'power-assert'
import Factory from '@/../../test/unit/factories'
import Archive from '@/components/Global/Modals/Archive'
Vue.use(Vuex)
Vue.use(Buefy)
describe('Archive.vue', () => {
  let state
  let getters
  let actions
  let testOptions
  beforeEach(() => {
    state = {
      Datastore: {
        missions: [],
        pomodoros: [],
      },
      Settings: {
        user: Factory.setting.build(),
      },
    }
    getters = {
      'Datastore/completePomodoros': () => [],
      'Datastore/completeExtras': () => [],
      'Archives/allArchives': () => [],
    }
    actions = {
      'Archives/ARCHIVE_COMPLETE_POMODOROS': sinon.stub(),
    }
    testOptions = {
      state,
      getters,
      actions,
    }
  })
  it('should not be active at first', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(Archive, { store })
    assert(wrapper.data().isActive === false)
  })
  it('should be inactive when modalClose() fired', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(Archive, { store })
    wrapper.setData({ isActive: true })
    wrapper.vm.modalClose()
    assert(wrapper.data().isActive === false)
  })
  describe('when any complete pomodoros do not exist', () => {
    it('should not fire ARCHIVE_POMODOROS dispatch if archive_pomodoros fired', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Archive, { store })
      wrapper.vm.archive_pomodoros()
      assert(
        actions['Archives/ARCHIVE_COMPLETE_POMODOROS'].calledOnce === false
      )
    })
  })
  describe('when any complete pomodoros exist', () => {
    beforeEach(() => {
      testOptions.getters['Datastore/completePomodoros'] = () => [
        Factory.pomodoro.build({ isComplete: true }),
      ]
    })
    it('should fire ARCHIVE_POMODOROS dispatch if archive_pomodoros fired', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Archive, { store })
      wrapper.vm.archive_pomodoros()
      assert(actions['Archives/ARCHIVE_COMPLETE_POMODOROS'].calledOnce === true)
    })
  })
})

import Vue from 'vue'
import { shallow } from 'avoriaz'
import Vuex from 'vuex'
import Buefy from 'buefy'
import sinon from 'sinon'
import assert from 'power-assert'
import Factory from '@/../../test/unit/factories'
import EditForm from '@/components/Plan/EditForm'

Vue.use(Vuex)
Vue.use(Buefy)

const Multiselect = {
  name: 'multiselect',
  render: h => h('div'),
}
describe('EditForm.vue', () => {
  before(() => {
    Vue.component('multiselect', Multiselect)
  })
  let getters
  let actions
  let testOptions
  let propsData
  beforeEach(() => {
    getters = {
      'Datastore/parentMission': () => pomodoro => {},
      'Datastore/allTags': () => [],
      'Datastore/editingMission': () => pomodoro => {},
      'Datastore/brotherPomodoros': () => pomodoro => {},
    }
    actions = {
      'Datastore/UPDATE_MISSION': sinon.stub(),
      'Datastore/DELETE_MISSION': sinon.stub(),
      'Datastore/INCREASE_POMODORO': sinon.stub(),
      'Datastore/DECREASE_POMODORO': sinon.stub(),
    }
    testOptions = {
      getters,
      actions,
    }
    propsData = {
      pomodoro: {},
      form: {
        isOpen: false,
      },
    }
  })
  describe('when it is loaded', () => {
    it('should not render if it is not open', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(EditForm, { propsData, store })
      wrapper.setMethods({
        modalClose: () => {
          wrapper.setProps({ form: { isOpen: false } })
        },
        focusToDefault() {
          sinon.stub()
        },
      })
      assert(wrapper.hasClass('is-active') === false)
    })
  })
  describe('when it is opened', () => {
    beforeEach(() => {
      propsData.form.isOpen = true
      testOptions.getters['Datastore/editingMission'] = () => pomodoro =>
        Factory.pomodoro.build({
          id: 'THIS-IS-A-DEEP-COPY-OF-MISSION',
          name: 'this is an editing mission',
          quadrant: 3,
          pomodoros: 5,
        })
    })
    it('should become inactive if close button pushed', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(EditForm, { store, propsData })
      assert(wrapper.hasClass('is-active') === true)
      wrapper.setMethods({
        modalClose: () => {
          wrapper.setProps({ form: { isOpen: false } })
        },
        focusToDefault: () => {
          sinon.stub()
        },
      })
      wrapper
        .find('.modal-card-head')[0]
        .find('.delete')[0]
        .trigger('click')
      assert(wrapper.hasClass('is-active') === false)
    })
    it('should render the mission name in input field', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(EditForm, { store, propsData })
      wrapper.setMethods({
        modalClose: () => {
          wrapper.setProps({ form: { isOpen: false } })
        },
        focusToDefault: () => {
          sinon.stub()
        },
      })
      assert(
        wrapper
          .find('.modal-card-body')[0]
          .find('.mission-name')[0]
          .find('input')[0]
          .value() === 'this is an editing mission'
      )
    })
    it('should fire INCREASE_POMODORO when + button clicked', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(EditForm, { store, propsData })
      wrapper.setMethods({
        modalClose: () => {
          wrapper.setProps({ form: { isOpen: false } })
        },
        focusToDefault: () => {
          sinon.stub()
        },
      })
      wrapper
        .find('.modal-card-body')[0]
        .find('.add-pomodoro')[0]
        .trigger('click')
      assert(actions['Datastore/INCREASE_POMODORO'].calledOnce === true)
    })
    describe('when the mission has several pomodoros', () => {
      beforeEach(() => {
        propsData.form.isOpen = true
        propsData.pomodoro = Factory.pomodoro.build({
          missionId: 'THIS-IS-A-DEEP-COPY-OF-MISSION',
          isComplete: false,
        })
        testOptions.getters['Datastore/editingMission'] = () => pomodoro =>
          Factory.mission.build({
            id: 'THIS-IS-A-DEEP-COPY-OF-MISSION',
            name: 'this is an editing mission',
            quadrant: 3,
            pomodoros: 5,
          })
        testOptions.getters['Datastore/brotherPomodoros'] = () => pomodoro => [
          Factory.pomodoro.build({
            missionId: 'THIS-IS-A-DEEP-COPY-OF-MISSION',
            isComplete: false,
          }),
          Factory.pomodoro.build({
            missionId: 'THIS-IS-A-DEEP-COPY-OF-MISSION',
            isComplete: false,
          }),
          Factory.pomodoro.build({
            missionId: 'THIS-IS-A-DEEP-COPY-OF-MISSION',
            isComplete: false,
          }),
          Factory.pomodoro.build({
            missionId: 'THIS-IS-A-DEEP-COPY-OF-MISSION',
            isComplete: false,
          }),
        ]
      })
      it('should fire DECREASE_POMODORO when - button clicked', () => {
        const store = new Vuex.Store(testOptions)
        const wrapper = shallow(EditForm, { store, propsData })
        wrapper.setMethods({
          modalClose: () => {
            wrapper.setProps({ form: { isOpen: false } })
          },
          focusToDefault: () => {
            sinon.stub()
          },
        })
        wrapper
          .find('.modal-card-body')[0]
          .find('.remove-pomodoro')[0]
          .trigger('click')
        assert(actions['Datastore/DECREASE_POMODORO'].calledOnce === true)
      })
    })
    describe('when the mission has several complete pomodoros', () => {
      beforeEach(() => {
        propsData.form.isOpen = true
        propsData.pomodoro = Factory.pomodoro.build({
          missionId: 'THIS-IS-A-DEEP-COPY-OF-MISSION',
          isComplete: true,
        })
        testOptions.getters['Datastore/editingMission'] = () => pomodoro =>
          Factory.mission.build({
            id: 'THIS-IS-A-DEEP-COPY-OF-MISSION',
            name: 'this is an editing mission',
            quadrant: 3,
            pomodoros: 5,
          })
        testOptions.getters['Datastore/brotherPomodoros'] = () => pomodoro => [
          Factory.pomodoro.build({
            missionId: 'THIS-IS-A-DEEP-COPY-OF-MISSION',
            isComplete: true,
          }),
          Factory.pomodoro.build({
            missionId: 'THIS-IS-A-DEEP-COPY-OF-MISSION',
            isComplete: true,
          }),
          Factory.pomodoro.build({
            missionId: 'THIS-IS-A-DEEP-COPY-OF-MISSION',
            isComplete: true,
          }),
          Factory.pomodoro.build({
            missionId: 'THIS-IS-A-DEEP-COPY-OF-MISSION',
            isComplete: true,
          }),
        ]
      })
      it('can not remove a complete pomodoro even if - button clicked', () => {
        const store = new Vuex.Store(testOptions)
        const wrapper = shallow(EditForm, { store, propsData })
        wrapper.setMethods({
          modalClose: () => {
            wrapper.setProps({ form: { isOpen: false } })
          },
          focusToDefault: () => {
            sinon.stub()
          },
        })
        wrapper
          .find('.modal-card-body')[0]
          .find('.remove-pomodoro')[0]
          .trigger('click')
        assert(actions['Datastore/DECREASE_POMODORO'].calledOnce === false)
      })
    })
    describe('when the mission has only 1 pomodoros', () => {
      beforeEach(() => {
        propsData.form.isOpen = true
        propsData.pomodoro = Factory.pomodoro.build({
          missionId: 'THIS-IS-A-DEEP-COPY-OF-MISSION',
          isComplete: false,
        })
        testOptions.getters['Datastore/editingMission'] = () => pomodoro =>
          Factory.mission.build({
            id: 'THIS-IS-A-DEEP-COPY-OF-MISSION',
            name: 'this is an editing mission',
            quadrant: 3,
            pomodoros: 1,
          })
        testOptions.getters['Datastore/brotherPomodoros'] = () => pomodoro => []
      })
      it('can not remove the last pomodoro even if - button clicked', () => {
        const store = new Vuex.Store(testOptions)
        const wrapper = shallow(EditForm, { store, propsData })
        wrapper.setMethods({
          modalClose: () => {
            wrapper.setProps({ form: { isOpen: false } })
          },
          focusToDefault: () => {
            sinon.stub()
          },
        })
        wrapper
          .find('.modal-card-body')[0]
          .find('.remove-pomodoro')[0]
          .trigger('click')
        assert(actions['Datastore/DECREASE_POMODORO'].calledOnce === false)
      })
    })
    it('should fire UPDATE_MISSION if save button clicked', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(EditForm, { store, propsData })
      wrapper.setMethods({
        modalClose: () => {
          wrapper.setProps({ form: { isOpen: false } })
        },
        focusToDefault: () => {
          sinon.stub()
        },
      })
      wrapper
        .find('.modal-card-foot')[0]
        .find('.update-mission')[0]
        .trigger('click')
      assert(actions['Datastore/UPDATE_MISSION'].calledOnce === true)
    })
    it('should not fire UPDATE_MISSION without name even if save button clicked', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(EditForm, { store, propsData })
      wrapper.setMethods({
        modalClose: () => {
          wrapper.setProps({ form: { isOpen: false } })
        },
        focusToDefault() {
          sinon.stub()
        },
      })
      const name = wrapper
        .find('.modal-card-body')[0]
        .find('.mission-name')[0]
        .find('input')[0]
      name.element.value = ''
      name.trigger('input')
      wrapper
        .find('.modal-card-foot')[0]
        .find('.update-mission')[0]
        .trigger('click')
      assert(actions['Datastore/UPDATE_MISSION'].calledOnce === false)
    })
    it('should fire DELETE_MISSION if delete button clicked', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(EditForm, { store, propsData })
      wrapper.setMethods({
        modalClose: () => {
          wrapper.setProps({ form: { isOpen: false } })
        },
        focusToDefault: () => {
          sinon.stub()
        },
      })
      wrapper
        .find('.modal-card-foot')[0]
        .find('.delete-mission')[0]
        .trigger('click')
      assert(actions['Datastore/DELETE_MISSION'].calledOnce === true)
    })
  })
})

import Vue from 'vue'
import { shallow } from 'avoriaz'
import Vuex from 'vuex'
import Buefy from 'buefy'
import sinon from 'sinon'
import assert from 'power-assert'
import Factory from '@/../../test/unit/factories'
import Extras from '@/components/Plan/Extras'

Vue.use(Vuex)
Vue.use(Buefy)

const Multiselect = {
  name: 'multiselect',
  render: h => h('div'),
}
describe('Extras.vue', () => {
  before(() => {
    Vue.component('multiselect', Multiselect)
  })
  let getters
  let actions
  let testOptions
  let propsData
  beforeEach(() => {
    getters = {
      'Datastore/projectTag': () => extra => '',
      'Datastore/allTags': () => [],
      'Datastore/editingExtra': () => extra => {},
    }
    actions = {
      'Datastore/UPDATE_EXTRA': sinon.stub(),
      'Datastore/TOGGLE_EXTRA': sinon.stub(),
      'Datastore/DELETE_EXTRA': sinon.stub(),
    }
    testOptions = {
      getters,
      actions,
    }
    propsData = {
      extra: {},
    }
  })
  describe('when any of extras exist', () => {
    beforeEach(() => {
      propsData.extra = Factory.extra.build({
        name: 'this is a TEST EXTRA',
        isComplete: false,
      })
      testOptions.getters['Datastore/editingExtra'] = () => extra =>
        Factory.extra.build()
    })
    it('should render an extra as table row', () => {
      const store = new Vuex.Store(testOptions)
      const wrapper = shallow(Extras, { store, propsData })
      assert(
        wrapper
          .find('tr')[0]
          .find('.name')[0]
          .text() === 'this is a TEST EXTRA'
      )
    })
    describe('when a extra is complete', () => {
      beforeEach(() => {
        propsData.extra = Factory.extra.build({ isComplete: true })
        testOptions.getters['Datastore/editingExtra'] = () => extra =>
          Factory.extra.build()
      })
      it('should render complete extra with class for striked style', () => {
        const store = new Vuex.Store(testOptions)
        const wrapper = shallow(Extras, { store, propsData })
        assert(wrapper.find('tr')[0].hasClass('isComplete') === true)
      })
    })
    describe('when a extra has tags', () => {
      beforeEach(() => {
        propsData.extra = Factory.extra.build({ isComplete: false })
        testOptions.getters['Datastore/editingExtra'] = () => extra =>
          Factory.extra.build()
        testOptions.getters['Datastore/projectTag'] = () => extra =>
          '@ProjectTag'
      })
      it('should render project tag', () => {
        const store = new Vuex.Store(testOptions)
        const wrapper = shallow(Extras, { store, propsData })
        assert(
          wrapper
            .find('tr')[0]
            .find('.project')[0]
            .text() === '@ProjectTag '
        )
      })
    })
    describe('when edit an extra', () => {
      beforeEach(() => {
        propsData.extra = Factory.extra.build({ isComplete: false })
        testOptions.getters['Datastore/editingExtra'] = () => extra =>
          Factory.extra.build({ name: 'this is an editing extra' })
        testOptions.getters['Datastore/projectTag'] = () => extra =>
          '@ProjectTag'
      })
      it('should not be active at first', () => {
        const store = new Vuex.Store(testOptions)
        const wrapper = shallow(Extras, { store, propsData })
        assert(wrapper.data().isActive === false)
      })
      it('should become inactive if close button pushed', () => {
        const store = new Vuex.Store(testOptions)
        const wrapper = shallow(Extras, { store, propsData })
        wrapper.setData({ isActive: true })
        assert(wrapper.data().isActive === true)
        wrapper
          .find('.modal-card-head')[0]
          .find('.delete')[0]
          .trigger('click')
        assert(wrapper.data().isActive === false)
      })
      it('should render the extra name in input field', () => {
        const store = new Vuex.Store(testOptions)
        const wrapper = shallow(Extras, { store, propsData })
        wrapper.setData({ isActive: true })
        assert(
          wrapper
            .find('.modal-card-body')[0]
            .find('.extra-name')[0]
            .find('input')[0]
            .value() === 'this is an editing extra'
        )
      })
      it('should fire UPDATE_EXTRA if save button clicked', () => {
        const store = new Vuex.Store(testOptions)
        const wrapper = shallow(Extras, { store, propsData })
        wrapper
          .find('.modal-card-foot')[0]
          .find('.update-extra')[0]
          .trigger('click')
        assert(actions['Datastore/UPDATE_EXTRA'].calledOnce === true)
      })
      it('should not fire UPDATE_MISSION without name even if save button clicked', () => {
        const store = new Vuex.Store(testOptions)
        const wrapper = shallow(Extras, { store, propsData })
        const name = wrapper
          .find('.modal-card-body')[0]
          .find('.extra-name')[0]
          .find('input')[0]
        name.element.value = ''
        name.trigger('input')
        wrapper
          .find('.modal-card-foot')[0]
          .find('.update-extra')[0]
          .trigger('click')
        assert(actions['Datastore/UPDATE_EXTRA'].calledOnce === false)
      })
      it('should fire DELETE_MISSION if delete button clicked', () => {
        const store = new Vuex.Store(testOptions)
        const wrapper = shallow(Extras, { store, propsData })
        wrapper
          .find('.modal-card-foot')[0]
          .find('.delete-extra')[0]
          .trigger('click')
        assert(actions['Datastore/DELETE_EXTRA'].calledOnce === true)
      })
      it('should fire TOGGLE_MISSION if toggle button clicked', () => {
        const store = new Vuex.Store(testOptions)
        const wrapper = shallow(Extras, { store, propsData })
        wrapper
          .find('.modal-card-foot')[0]
          .find('.toggle-extra')[0]
          .trigger('click')
        assert(actions['Datastore/TOGGLE_EXTRA'].calledOnce === true)
      })
    })
  })
})

import Vue from 'vue'
import { shallow } from 'avoriaz'
import Vuex from 'vuex'
import Buefy from 'buefy'
import sinon from 'sinon'
import assert from 'power-assert'
import Notes from '@/components/Plan/Notes'

Vue.use(Vuex)
Vue.use(Buefy)

describe('Notes.vue', () => {
  let state
  let actions
  let testOptions
  beforeEach(() => {
    state = {
      Datastore: {
        note: '',
      },
    }
    actions = {
      'Datastore/UPDATE_NOTES': sinon.stub(),
    }
    testOptions = {
      state,
      actions,
    }
  })
  it('should render textarea', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(Notes, { store })
    assert(wrapper.contains('textarea') === true)
  })
  it('should save when it change', () => {
    const store = new Vuex.Store(testOptions)
    const wrapper = shallow(Notes, { store })
    wrapper.find('textarea')[0].value = 'add notes'
    wrapper.find('textarea')[0].trigger('input')
    assert(actions['Datastore/UPDATE_NOTES'].called === true)
  })
})

import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './userStore'
import noteStore from './noteStore'
import Types from './mutationType'
import paletteColors from '../../static/paletteColors'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userStore,
    noteStore,
  },
  state: {
    paletteColors,
    currentEvent: null,
  },
  getters: {
    getBgColors: state => colorIndex => state.paletteColors[colorIndex],
    getGlobalProps: state => propName => state[propName],
  },
  mutations: {
    [Types.EDIT_NOTE](state, { note }) {
      Vue.set(state, Types.EDIT_NOTE, note)
      state.currentEvent = Types.EDIT_NOTE
    },
    [Types.FINALIZE_TARGET_EVENT](state, { eventRelatedProp }) {
      state.currentEvent = null
      Vue.set(state, eventRelatedProp, null)
    },
    [Types.TERMINATE_TARGET_EVENT](state) {
      state.currentEvent = Types.TERMINATE_TARGET_EVENT
    },
    [Types.EDIT_TAG_ADMIN](state) {
      state.currentEvent = Types.EDIT_TAG_ADMIN
    },
  }
})

export default store

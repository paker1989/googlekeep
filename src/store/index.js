import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './userStore'
import noteStore from './noteStore'
import paletteColors from '../../static/paletteColors'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userStore,
    noteStore,
  },
  state: {
    paletteColors
  },
  getters: {
    getBgColors: state => colorIndex => state.paletteColors[colorIndex]
  }
})

export default store

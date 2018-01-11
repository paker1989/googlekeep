import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './userStore'
import noteStore from './noteStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userStore,
    noteStore,
  }
})

export default store

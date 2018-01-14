import Vue from 'vue'
import Types from './mutationType'
// import paletteColors from '../../static/paletteColors'

/* eslint no-shadow: off */
const state = {
  activeUsers: {
    abc: {
      userId: 1, // fake, to be removed
      sideBarStatus: true, // hide = true
      // noteEditionBgIndex: 0,
    }
  }
}

const getters = {
  getUserProp: state => (userId, prop) => state.activeUsers[userId][prop],
  // getUserBgColor: state => userId => paletteColors[state.activeUsers[userId].noteEditionBgIndex]
}

const mutations = {
  [Types.TOGGLE_SIDE_BAR](state, { sideBarStatus, userId }) {
    Vue.set(state.activeUsers[userId], 'sideBarStatus', sideBarStatus)
  },
  // [Types.CHANGE_NOTE_EDIT_BG](state, { colorIndex, userId }) {
  //   Vue.set(state.activeUsers[userId], 'noteEditionBgIndex', colorIndex)
  // },
}

const actions = {

}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions,
}

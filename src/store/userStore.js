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
      cachedTags: {
        isRefresh: false,
        lastRefresh: null,
        tags: []
      }
    }
  }
}

const getters = {
  getUserProp: state => (userId, prop) => state.activeUsers[userId][prop]
  // getUserBgColor: state => userId => paletteColors[state.activeUsers[userId].noteEditionBgIndex]
}

const mutations = {
  [Types.REFRESH_TAGS](state, { userId, tags }) {
    Vue.set(state.activeUsers[userId], 'cachedTags', {
      isRefreshed: true,
      lastRefresh: Date.now(),
      tags
    })
  },
  [Types.UPDATE_TAGS](state, { userId, tag }) {
    const isExist = state.activeUsers[userId].cachedTags.tags.find(
      e => e.name === tag.name) !== undefined
    if (!isExist) {
      state.activeUsers[userId].cachedTags.tags.push(tag)
    }
  },
  [Types.TOGGLE_SIDE_BAR](state, { sideBarStatus, userId }) {
    Vue.set(state.activeUsers[userId], 'sideBarStatus', sideBarStatus)
  },
  // [Types.CHANGE_NOTE_EDIT_BG](state, { colorIndex, userId }) {
  //   Vue.set(state.activeUsers[userId], 'noteEditionBgIndex', colorIndex)
  // },
}

const actions = {
  getTags({ commit }, { userId }) {
    return new Promise((resolve, reject) => {
      Vue.http.post('/user/getTags', { userId }).then((res) => {
        if (res.body.err) {
          reject(res.body.err)
        } else {
          commit({
            type: Types.REFRESH_TAGS,
            userId,
            tags: res.body.tags
          })
          resolve({ tags: res.body.tags })
        }
      })
    })
  },
  addTag({ commit }, { userId, tag }) {
    return new Promise((resolve, reject) => {
      Vue.http.post('/user/addTag', { userId, tag }).then((res) => {
        if (res.body.err) {
          reject(res.body.err)
        } else {
          commit({
            type: Types.UPDATE_TAGS,
            userId,
            tag: res.body.tag
          })
          resolve({ tag: res.body.tag })
        }
      })
    })
  }
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions,
}

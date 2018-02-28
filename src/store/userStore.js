import Vue from 'vue'
import Types from './mutationType'

/* eslint no-shadow: off */
const state = {
  activeUsers: {
    abc: {
      userId: 1, // fake, to be removed
      sideBarStatus: true, // hide = true
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
  [Types.REMOVE_TAGS](state, { userId, tag }) {
    const index = state.activeUsers[userId].cachedTags.tags.findIndex(
      e => e.name === tag.name)
    console.log('remove tags index: ' + index)
    if (index >= 0) {
      state.activeUsers[userId].cachedTags.tags.splice(index, 1)
    }
  },
  [Types.TOGGLE_SIDE_BAR](state, { sideBarStatus, userId }) {
    Vue.set(state.activeUsers[userId], 'sideBarStatus', sideBarStatus)
  },
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
  },
  deleteTagAction({ commit }, { tag, userId }) {
    console.log(tag)
    console.log(userId)
    return new Promise((resolve, reject) => {
      Vue.http.post('/user/deleteTag', { tagId: tag._id }).then((res) => {
        if (res.body.err) {
          reject(res.body.err)
        } else {
          commit({
            type: Types.REMOVE_TAGS,
            userId,
            tag,
          })
          resolve({ isDeleted: true })
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

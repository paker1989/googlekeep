import Vue from 'vue'
// import Types from './mutationType'

/* eslint no-shadow: off */
const state = {
  cachedNotes: {}
}

const getters = {
}

const mutations = {
}

const actions = {
  savePhoto({ commit, state }, { formData }) {
    return new Promise((resolve, reject) => {
      Vue.http.post('/note/savePhoto', formData).then((res) => {
        if (res.body.err) {
          reject(res.body.err)
        } else {
          resolve({
            filepath: res.body.filepath,
            noteId: res.body.noteId
          })
        }
      })
    })
  }
}

        // if (res.status === 200) {
        //   resolve( { res.body })
        // } else {
        //   reject( { res.body })
        // }

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions,
}

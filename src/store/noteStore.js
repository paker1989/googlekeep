import Vue from 'vue'
import Types from './mutationType'

/* eslint no-shadow: off, no-unused-vars: off, consistent-return: off */
const state = {
  cachedNotes: {}
}

const getters = {
  getUserNotes: state => userId => Object.keys(state.cachedNotes)
    .map(noteId => state.cachedNotes[noteId])
    .sort((a, b) => new Date(b.meta.updateAt) - new Date(a.meta.updateAt))
}

const mutations = {
  [Types.CACHE_NOTES](state, { notes }) {
    [...notes].forEach((note) => {
      Vue.set(state.cachedNotes, note._id, note)
    })
  },
  [Types.UPDATE_NOTE](state, { note }) {
    Vue.set(state.cachedNotes, note._id, note)
  }
}

const actions = {
  fetchNotes({ commit }) {
    return new Promise((resolve, reject) => {
      Vue.http.post('/note/fetchNotes').then((res) => {
        if (res.body.err) {
          reject({ err: res.body.err })
        } else {
          commit({
            type: Types.CACHE_NOTES,
            notes: res.body.notes
          })
          resolve({ notes: res.body.notes })
        }
      })
    })
  },
  saveNoteText({ commit, state, dispatch }, { note, isUpdateCache }) {
    return new Promise((resolve, reject) => {
      Vue.http.post('/note/saveNoteText', { note }).then((res) => {
        if (res.body.err) {
          reject({ err: res.body.err })
        } else {
          if (isUpdateCache) {
            dispatch({
              type: 'fetchNoteById',
              noteId: res.body.note._id
            })
          }
          resolve({ note: res.body.note })
        }
      })
    })
  },
  fetchNoteById({ commit, state }, { noteId }) {
    return new Promise((resolve, reject) => {
      Vue.http.post('/note/fetchNoteById', { noteId }).then((res) => {
        if (res.body.err) {
          reject({ err: res.body.err })
        } else {
          commit({
            type: Types.UPDATE_NOTE,
            note: res.body.note
          })
          resolve({ note: res.body.note })
        }
      })
    })
  },
  savePhoto({ commit, state }, { formData }) {
    return new Promise((resolve, reject) => {
      Vue.http.post('/note/savePhoto', formData).then((res) => {
        if (res.body.err) {
          reject(res.body.err)
        } else {
          resolve({
            photo: res.body.savedPhoto
          })
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

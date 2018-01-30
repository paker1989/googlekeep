import Vue from 'vue'
import Types from './mutationType'

/* eslint no-shadow: off, no-unused-vars: off, consistent-return: off */
const state = {
  mostUndo: 5,
  zoomRange: 1.4,
  currentEvent: null,
  cachedNotes: {},

  // noteToEdit: null,
}

const getters = {
  getNoteConfigProp: state => prop => state[prop],
  getUserNotes: state => userId => Object.keys(state.cachedNotes)
    .map(noteId => state.cachedNotes[noteId])
    .sort((a, b) => new Date(b.meta.updateAt) - new Date(a.meta.updateAt)),
}

const mutations = {
  [Types.CACHE_NOTES](state, { notes }) {
    [...notes].forEach((note) => {
      Vue.set(state.cachedNotes, note._id, note)
    })
  },
  [Types.UPDATE_NOTE](state, { note }) {
    Vue.set(state.cachedNotes, note._id, note)
  },
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
  [Types.DELETE_NOTE](state, { noteId }) {
    if (state.cachedNotes[noteId]) { Vue.delete(state.cachedNotes, noteId) }
  },
  [Types.PRESENT_PHOTO](state, { imageIndex, images }) {
    Vue.set(state, Types.PRESENT_PHOTO, { imageIndex, images })
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
  /**
   *
   * @param {*} noteId
   * @param {*} isShallow: indicates if shallow delete
   */
  deleteNote({ commit }, { noteId, isShallow }) {
    return new Promise((resolve, reject) => {
      Vue.http.post('/note/deleteNote', { noteId, isShallow }).then((res) => {
        if (res.body.err) {
          reject({ err: res.body.err })
        } else {
          if (isShallow) {
            commit({
              type: Types.UPDATE_NOTE,
              note: res.body.note
            })
          } else {
            commit({
              type: Types.DELETE_NOTE,
              noteId
            })
          }
          resolve({ isDeleted: res.body.isDeleted })
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
            savedPhoto: res.body.savedPhoto
          })
        }
      })
    })
  },
  /**
   * @param {*} param0
   * @param {*} param1
   * @returns { err | updatedPhotos }
   */
  removePhoto({ commit, state }, { imageId, noteId, isShallow }) {
    return new Promise((resolve, reject) => {
      Vue.http.post('/note/removePhoto', { imageId, noteId, isShallow }).then((res) => {
        if (res.body.err) {
          reject(res.body.err)
        } else {
          // removePhoto的时候无须update cache, 因为之后必定显式update cache
          // commit({
          //   type: Types.UPDATE_NOTE,
          //   note: res.body.note
          // })
          resolve({ updatedPhotos: res.body.note.photos })
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

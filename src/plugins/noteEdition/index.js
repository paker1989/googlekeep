import Vue from 'vue'

const NoteEditionConstructor = Vue.extend(require('../../components/content/noteEdition.vue').default)

/**
 * @deprecated
 * @param {*} noteItem
 */
const EditNote = (noteItem) => {
  const NoteInstance = new NoteEditionConstructor({
    data: {
      noteId: noteItem._id,
      colorIndex: noteItem.colorIndex,
      uploadedImages: noteItem.photos,
      noteContent: noteItem.content,
    }
  })

  NoteInstance.vm = NoteInstance.$mount()
  NoteInstance.dom = NoteInstance.vm.$el
  NoteInstance.dom.style.zIndex = 4001
  document.body.appendChild(NoteInstance.dom)

  return NoteInstance.vm
}

export default {
  install: (vue) => {
    vue.prototype.$editNote = EditNote
  }
}

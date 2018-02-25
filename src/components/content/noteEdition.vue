<template lang="jade">
  .noteEdition(@focus.capture="editMode=true", :style="bgColor")
    .hightLightWraper
      span.glyphicon.glyphicon-bookmark(v-show="editMode",
                                        :class="{ isHighLighted: highLight}"
                                        @click="highLightNote")
    .noteEditableContainer
      image-wraper(:images="uploadedImages", ref="imageWraper", @deleteImage="deletePhoto"
                   @photoUploaded="updatePhoto", @presentPhoto="presentPhoto")
      note-title(ref="noteTitle", v-show="editMode", :editMode="editMode",
                 :title="title",
                 @focusContent="focusContent")
      note-content(ref="noteContent",
                   :content="content",
                   :cachedInputs.sync="cachedInputs",
                   :removedInputs.sync="removedInputs")  
      tag-presenter(:selectedTags="tags", @deleteTag="deleteTag",
                    v-if="tags.length > 0")        
    note-toolbar.toolbar(:colorIndex.sync="colorIndex", v-show="editMode",
                         :cachedInputs="cachedInputs",
                         :removedInputs="removedInputs",
                         :actionItems="actionItems",
                         :selectedTags="tags",
                         @toggleTagToNote="toggleTagToNote",
                         @saveNote="saveNote",
                         @undo="undoContent",
                         @redo="redoContent",
                         @newImageUpload="uploadImage",
                         @deleteNote="deleteNoteEvent") 
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Types from '../../store/mutationType'
import ImageWraper from './imageWraper'
import NoteContent from './noteContentEditable'
import NoteTitle from './noteTitleEditable'
import NoteToolbar from './noteToolbar'
import TagPresenter from '../common/tagPresenter'
import noteActions from '../../assets/noteActions'


/* eslint no-unused-expressions: off */
export default {
  name: 'noteEdition',
  props: {
    note: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      noteId: this.note ? this.note._id : null,
      colorIndex: this.note ? this.note.colorIndex : 0,
      editMode: !!this.note,
      title: this.note ? this.note.title : '',
      content: this.note ? this.note.content : '',
      uploadedImages: this.note ? this.note.photos.filter(photo => !photo.meta.isArchived) : [],
      highLight: this.note ? this.note.meta.isHighLighted : false,
      cachedInputs: [''],
      removedInputs: [],
      tags: this.note ? this.note.tags : [],
      type: this.note ? this.note.type : 'note',
      actionItems: JSON.parse(JSON.stringify(noteActions)),
      // originalNote: this.note
    }
  },
  created() {
    this.updateActionItems()
  },
  components: {
    NoteToolbar, NoteContent, NoteTitle, ImageWraper, TagPresenter,
  },
  methods: {
    focusContent() {
      this.$refs.noteContent.focusContent()
    },
    createNewNote() {
      const vm = this
      return new Promise((resolve, reject) => {
        const note = this.collectNoteText()
        this.saveNoteText({ note }).then((res) => {
          if (res.err) {
            reject(res.err)
          }
          vm.noteId = res.note._id
          resolve({ noteId: res.note._id })
        })
      })
    },
    uploadImage(files) {
      const vm = this
      if (!this.noteId) {
        this.createNewNote().then((res) => {
          vm.$refs.imageWraper.uploadNewImage({ newImages: files }, res.noteId)
        }, (err) => { console.log(err) })
      } else {
        this.$refs.imageWraper.uploadNewImage({ newImages: files }, vm.noteId)
      }
    },
    deletePhoto(imageId) {
      this.removePhoto({ imageId, noteId: this.noteId, isShallow: true })
        .then((res) => {
          this.uploadedImages = res.updatedPhotos.filter(photo => !photo.meta.isArchived)
        })
    },
    updatePhoto(newPhoto) {
      this.uploadedImages.push(newPhoto)
    },
    undoContent() {
      this.$refs.noteContent.undo()
    },
    redoContent() {
      this.$refs.noteContent.redo()
    },
    saveNote() {
      const isUpdateCache = true
      const note = this.collectNoteText()
      this.saveNoteText({ note, isUpdateCache }).then((res) => {
        if (res.note) {
          if (this.getGlobalProps(Types.EDIT_NOTE) != null) {
            this.finalizeTargetNoteEvent({
              eventRelatedProp: Types.EDIT_NOTE
            })
          } else {
            this.resetNote(null) // create new note edition event
          }
        }
      })
    },
    collectNoteText() {
      const note = {
        title: this.$refs.noteTitle.noteTitle,
        content: this.$refs.noteContent.getFinalText(),
        colorIndex: this.colorIndex,
        meta: { isHighLighted: this.highLight },
        tags: this.tags,
      }

      if (this.noteId) {
        note._id = this.noteId
      }
      return note
    },
    resetNote(newNote) {
      this.noteId = newNote ? newNote._id : null
      this.colorIndex = newNote ? newNote.colorIndex : 0
      this.editMode = !!newNote
      this.title = newNote ? newNote.title : ''
      this.content = newNote ? newNote.content : ''
      this.uploadedImages = newNote ? newNote.photos.filter(
        photo => !photo.meta.isArchived) : []
      this.highLight = newNote ? newNote.meta.isHighLighted : false
      this.type = 'note'
      this.tags = []
      this.cachedInputs = ['']
      this.removedInputs = []
      this.$refs.noteTitle.reset()  // 手动reset，否则这里子组件无法通过监听到
      this.$refs.noteContent.reset() // 母组件变化来reset，因为母组件值无变化
      this.$refs.imageWraper.reset()
      this.updateActionItems()
    },
    updateActionItems() {
      this.actionItems.deleteNote.isVisible = !!this.noteId
      this.actionItems.changeTag.isVisible = this.tags.length > 0
      this.actionItems.addTag.isVisible = this.tags.length === 0
    },
    highLightNote() {
      this.highLight = !this.highLight
    },
    deleteNoteEvent() {
      if (!this.noteId) return
      this.deleteNote({ noteId: this.noteId, isShallow: true }).then(() => {
        if (this.getGlobalProps(Types.EDIT_NOTE)) {
          this.finalizeTargetNoteEvent({
            eventRelatedProp: Types.EDIT_NOTE
          })
        } else {
          this.resetNote(null) // create new note edition event
        }
      }, (err) => {
        console.log(err)
      })
    },
    presentPhoto(imageIndex) {
      this.vpresentPhoto({
        imageIndex,
        images: this.uploadedImages
      })
    },
    toggleTagToNote({ tag }) {
      const vm = this
      if (!this.noteId) {
        this.createNewNote().then(() => {
          vm.toggleTag(tag)
        }, (err) => { console.log(err) })
      } else {
        vm.toggleTag(tag)
      }
    },
    toggleTag(tag) {
      const index = this.tags.findIndex(e => e.name === tag.name)
      if (index !== -1) {
        this.tags.splice(index, 1)
      } else {
        this.tags.unshift(tag)
      }
    },
    ...mapActions('noteStore', [
      'saveNoteText', 'deleteNote', 'removePhoto'
    ]),
    ...mapMutations('noteStore', {
      vpresentPhoto: Types.PRESENT_PHOTO,
    }),
    ...mapMutations({
      finalizeTargetNoteEvent: Types.FINALIZE_TARGET_EVENT,
    }),
    deleteTag(tagIndex) {
      this.tags.splice(tagIndex, 1)
    }
  },
  computed: {
    ...mapGetters([
      'getBgColors'
    ]),
    ...mapGetters('noteStore', [
      'getNoteConfigProp'
    ]),
    ...mapGetters([
      'getGlobalProps'
    ]),
    bgColor() {
      return this.getBgColors(this.colorIndex)
    },
    globalNoteEvent() {
      return this.getGlobalProps('currentEvent')
    }
  },
  watch: {
    globalNoteEvent(newVal) {
      if (newVal === Types.TERMINATE_TARGET_EVENT && this.editMode) {
        this.saveNote()
      }
    },
    noteId() {
      this.updateActionItems()
    },
    type() {
      this.updateActionItems()
    },
    tags() {
      this.updateActionItems()
    }
  }
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/contentVars';

.noteEdition {
  position: relative;
  background: white;
  box-shadow: 0 3px 5px rgba(0,0,0,0.20);

  @media only screen and (max-width : 600px) {
     width: 93vw;
  }
  @media only screen and (min-width : 600px) {
    width: 600px;
  }
  & .hightLightWraper {
    position: absolute;
    top: .5em;
    right: 2em;
    & > span {
      cursor: pointer;
      z-index: 3;
      &:hover {
        color: lightblue;
      }
      &.isHighLighted {
        color: #4285f4;
      }
    }
  }

  & .noteEditableContainer {
    position: relative;
    max-height: 70vh;
    height: 100%;
    overflow-y: auto;
    clear: both;
  }

  & .toolbar {
    .basicLayout();
  }
}
</style>

<!--
    // saveNoteFromOutSide() {
    //   // console.log('saveNoteFromOutSide')
    //   if (this.editMode) {
    //     this.saveNote()
    //   }
    // },

    // value change only when edit a note, triger children components
    // change by watch
    // note(newNote) {
    //   this.resetNote(newNote)
    // },

    // resetForCreate() {
    //   this.resetNote(null)
    // },
-->
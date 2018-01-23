<template lang="jade">
  .noteEdition(@focus.capture="editMode=true", :style="bgColor")
    .noteEditableContainer
      image-wraper(:images="uploadedImages", ref="imageWraper")
      note-title(ref="noteTitle", v-show="editMode", :editMode="editMode",
                 :title="title",
                 @focusContent="focusContent")
      note-content(ref="noteContent",
                   :content="content",
                   :cachedInputs.sync="cachedInputs",
                   :removedInputs.sync="removedInputs")          
    note-toolbar.toolbar(:colorIndex.sync="colorIndex", v-show="editMode",
                         :cachedInputs="cachedInputs",
                         :removedInputs="removedInputs",
                         @saveNote="saveNote",
                         @undo="undoContent",
                         @redo="redoContent",
                         @newImageUpload="uploadImage")
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Types from '../../store/mutationType'
import ImageWraper from './imageWraper'
import NoteContent from './noteContentEditable'
import NoteTitle from './noteTitleEditable'
import NoteToolbar from './noteToolbar'

export default {
  name: 'noteEdition',
  props: {
    note: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      noteId: this.note ? this.note._id : null,
      colorIndex: this.note ? this.note.colorIndex : 0,
      editMode: !!this.note,
      title: this.note ? this.note.title : '',
      content: this.note ? this.note.content : '',
      uploadedImages: this.note ? this.note.photos : [],
      cachedInputs: [''],
      removedInputs: [],
    }
  },
  components: {
    NoteToolbar, NoteContent, NoteTitle, ImageWraper
  },
  methods: {
    focusContent() {
      this.$refs.noteContent.focusContent()
    },
    stopEditing() {
      this.editMode = false
    },
    uploadImage(files) {
      const vm = this
      if (!this.noteId) {
        const note = this.collectNoteText()
        this.saveNoteText({ note }).then((res) => {
          if (res.err) {
            console.log(res.err)
          } else {
            vm.noteId = res.note._id
            this.$refs.imageWraper.uploadNewImage({ newImages: files }, vm.noteId)
          }
        })
      } else {
        this.$refs.imageWraper.uploadNewImage({ newImages: files }, vm.noteId)
      }
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
          if (this.getNoteConfigProp('currentEvent') === Types.EDIT_NOTE) {
            this.resetTargetNoteEvent({
              eventRelatedProp: Types.EDIT_NOTE
            })
          } else {
            this.reset() // create new note edition event
          }
        }
      })
    },
    collectNoteText() {
      const note = {
        title: this.$refs.noteTitle.noteTitle,
        content: this.$refs.noteContent.getFinalText(),
        colorIndex: this.colorIndex
      }
      if (this.noteId) {
        note._id = this.noteId
      }
      return note
    },
    reset() {
      this.noteId = null
      this.colorIndex = 0
      this.editMode = false
      this.uploadedImages = []
      this.$refs.noteTitle.reset()
      this.$refs.noteContent.reset()
      this.$refs.imageWraper.reset()
    },
    ...mapActions('noteStore', [
      'saveNoteText'
    ]),
    ...mapMutations('noteStore', {
      resetTargetNoteEvent: Types.RESET_TARGET_EVENT
    }),
  },
  computed: {
    ...mapGetters([
      'getBgColors'
    ]),
    ...mapGetters('noteStore', [
      'getNoteConfigProp'
    ]),
    bgColor() {
      return this.getBgColors(this.colorIndex)
    },
  },
  watch: {
    note() { // value change only when edit a note, triger children components
                   // change by watch
      this.noteId = this.note ? this.note._id : null
      this.colorIndex = this.note ? this.note.colorIndex : 0
      this.editMode = !!this.note
      this.title = this.note ? this.note.title : ''
      this.content = this.note ? this.note.content : ''
      this.uploadedImages = this.note ? this.note.photos : []
      this.cachedInputs = ['']
      this.removedInputs = []
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


<template lang="jade">
  .noteEdition(@focus.capture="editMode=true", :style="bgColor")
    .noteEditableContainer
      image-wraper(:images="uploadedImages", ref="imageWraper")
      note-title(ref="noteTitle", v-show="editMode", :editMode="editMode")
      note-content(ref="noteContent")          
    note-toolbar.toolbar(:colorIndex.sync="colorIndex", v-show="editMode",
                 @saveNote="saveNote",
                 @newImageUpload="uploadImage")
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ImageWraper from './imageWraper'
import NoteContent from './noteContentEditable'
import NoteTitle from './noteTitleEditable'
import NoteToolbar from './noteToolbar'

// import testImages from '../../assets/testImages'
import { arrangeImages } from '../../plugins/utils'

// const { mapGetters } = createNamespacedHelpers('userStore')
/* eslint no-console: off */
export default {
  name: 'noteEdition',
  data() {
    return {
      noteId: null,
      colorIndex: 0,
      editMode: false,
      // noteTitle: '',
      // NoteContent: '',
      uploadedImages: []
    }
  },
  components: {
    NoteToolbar, NoteContent, NoteTitle, ImageWraper
  },
  methods: {
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
    saveNote() {
      const isUpdateCache = true
      const note = this.collectNoteText()
      this.saveNoteText({ note, isUpdateCache }).then((res) => {
        this.reset()
      })
    },
    collectNoteText() {
      const note = {
        title: this.$refs.noteTitle.noteTitle,
        content: this.$refs.noteContent.noteContent,
        colorIndex: this.colorIndex
      }
      if (this.noteId) {
        note._id = this.noteId
      }
      return note
    },
    reset() {
      this.$refs.noteTitle.reset()
      this.$refs.noteContent.reset()
      this.colorIndex = 0
      this.editMode = false
      this.uploadedImages = []
    },
    ...mapActions('noteStore', [
      'saveNoteText'
    ])
  },
  computed: {
    ...mapGetters([
      'getBgColors'
    ]),
    bgColor() {
      return this.getBgColors(this.colorIndex)
    },
  }
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/contentVars';

.noteEdition {
  position: relative;
  margin: 32px auto 16px auto; 
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
    max-height: 600px;
    overflow-y: auto;
    clear: both;
  }

  & .toolbar {
    .basicLayout();
  }
}
</style>


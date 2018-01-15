<template lang="jade">
  .noteEdition(@focus.capture="editMode=true", :style="bgColor")
    image-wraper(:images="uploadedImages", ref="imageWraper",
                 @updateNoteId="updateNoteId" )
    note-title(ref="noteTitle", v-show="editMode", :editMode="editMode")
    note-content(ref="noteContent")          
    note-toolbar(:colorIndex.sync="colorIndex", v-show="editMode",
                 @saveNote="saveNote",
                 @newImageUpload="uploadImage")
</template>
<script>
// import { createNamespacedHelpers } from 'vuex'
import { mapGetters, mapActions } from 'vuex'
import ImageWraper from './imageWraper'
import NoteContent from './noteContentEditable'
import NoteTitle from './noteTitleEditable'
import NoteToolbar from './noteToolbar'

import testImages from '../../assets/testImages'
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
      noteTitle: '',
      NoteContent: '',
      uploadedImages: arrangeImages(testImages)
    }
  },
  components: {
    NoteToolbar, NoteContent, NoteTitle, ImageWraper
  },
  methods: {
    stopEditing() {
      this.editMode = false
    },
    uploadImage(newImage) {
      this.uploadedImages.unshift(newImage.tmpUrl)
      this.$refs.imageWraper.uploadNewImage({ newImage }, this.noteId) // file, userId, noteId
    },
    updateNoteId(noteId) {
      this.noteId = noteId
    },
    saveNote() {
      const note = {
        title: this.$refs.noteTitle.noteTitle,
        content: this.$refs.noteContent.noteContent,
        colorIndex: this.colorIndex
      }
      if (this.noteId) {
        note._id = this.noteId
      }
      this.saveNoteText({ note }).then((res) => {
        console.log(res)
      })
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
  overflow-y: auto;
  max-height: 800px;

  @media only screen and (max-width : 600px) {
     width: 93vw;
  }
  @media only screen and (min-width : 600px) {
    width: 600px;
  }
  & >* {
    .basicLayout;
    clear: both;
  }
}
</style>
<!--
  {
    noteTile: this.$refs.noteTitle.noteTitle,
    noteContent: this.$refs.noteContent.noteContent
  },
  { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
-->


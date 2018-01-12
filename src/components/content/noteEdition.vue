<template lang="jade">
  .noteEdition(@focus.capture="editMode=true", :style="bgColor")
    note-title(ref="noteTitle", v-show="editMode", :editMode="editMode")
    note-content(ref="noteContent")          
    note-toolbar(v-show="editMode", @saveNote="saveNote")
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import NoteContent from './noteContentEditable'
import NoteTitle from './noteTitleEditable'
import NoteToolbar from './noteToolbar'

const { mapGetters } = createNamespacedHelpers('userStore')
/* eslint no-console: off */
export default {
  name: 'noteEdition',
  data() {
    return {
      editMode: false,
      noteTitle: '',
      NoteContent: '',
    }
  },
  methods: {
    stopEditing() {
      this.editMode = false
    },
    saveNote() {
      // const formData = new FormData()
      // formData.append('noteTile', this.$refs.noteTitle.noteTitle)
      // formData.append('noteContent', this.$refs.noteContent.noteContent)

      // this.$http.post('/note/saveNote', formData).then((res) => {
      //   console.log(res)
      // })
      const noteText = {
        title: this.$refs.noteTitle.noteTitle,
        content: this.$refs.noteContent.noteContent,
        colorIndex: this.getUserProp('abc', 'noteEditionBgIndex'),
      }
      this.$http.post('/note/saveNoteText', { note: noteText }).then((res) => {
        console.log(res)
      })
    }
  },
  components: {
    NoteToolbar, NoteContent, NoteTitle
  },
  computed: {
    ...mapGetters([
      'getUserBgColor', 'getUserProp'
    ]),
    bgColor() {
      return this.getUserBgColor('abc')
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
  & >* {
    .basicLayout;
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


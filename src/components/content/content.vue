<template lang="jade">
  .contentContainer
    note-edition.noteEditionLayout
    NoteWaterfallWraper.highLighted(:items="highLightedUserNotes")
      | {{ highLightedUserNotes.length === 0 ? '': '已固定的记事'}}
    NoteWaterfallWraper(:items="userNotes")
      | {{ highLightedUserNotes.length === 0 ? '': '其他'}}
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import NoteEdition from './noteEdition'
import NoteWaterfallWraper from './noteWaterfallWraper'
/* eslint no-underscore-dangle: off, no-console: off */
export default {
  name: 'contentContainer',
  components: {
    NoteEdition, NoteWaterfallWraper
  },
  created() {
    this.fetchNotes()
  },
  methods: {
    ...mapActions('noteStore', [
      'fetchNotes'
    ]),
  },
  computed: {
    userNotes() {
      return this.getUserNotes('abc').filter(note => note.meta.isHighLighted === false)
    },
    highLightedUserNotes() {
      return this.getUserNotes('abc').filter(note => note.meta.isHighLighted === true)
    },
    ...mapGetters('noteStore', [
      'getUserNotes'
    ])
  }

}
</script>
<style lang="less" scoped>
// @import (reference) '../../style/headerVars';
.contentContainer {
  box-sizing: border-box;
  position: relative;
  width: 100vw;
  max-width: 100%;
  transition: all .25s ease;
  & .highLighted {
    padding-bottom: 40px;
  }
  & .noteEditionLayout {
    margin: 32px auto 16px auto; 
  }
}
</style>
<template lang="jade">
  .contentContainer
    note-edition
    NoteWaterfallWraper(:items="userNotes")

</template>
<script>
import NoteEdition from './noteEdition'
import NoteWaterfallWraper from './noteWaterfallWraper'
/* eslint no-underscore-dangle: off, no-console: off */
export default {
  name: 'contentContainer',
  data() {
    return {
      userNotes: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // to be revised
      this.$http.post('/note/fetchNotes').then(function (res) {
        if (res.err) {
          console.log(res.err)
        } else {
          this.userNotes.push(...res.body.notes)
        }
      })
    }
  },
  components: {
    NoteEdition, NoteWaterfallWraper
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
}
</style>



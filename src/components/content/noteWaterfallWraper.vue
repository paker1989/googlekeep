<template lang="jade">
  .noteWaterfallWraper
    note-item(v-for="(note, index) in items", :item="note", :key="index")
</template>
<script>
import NoteItem from './noteItem'

export default {
  name: 'noteWaterfallWraper',
  props: ['items'],
  components: {
    NoteItem
  }
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/headerVars';
.noteWaterfallWraper {
  .headerLayout(flex-start, column, wrap, flex-start);
  position: relative;
  margin: 0 auto;
  width: 650px;
  height: 900px; // to remove
}
</style>



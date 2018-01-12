<template lang="jade">
  .noteItem
    .noteItemWraper
      .noteTitle
        {{ item.title}}
      .noteContent
        {{ item.content }}
    // note-toolbar.toolbar(@saveNote="saveNote")

</template>
<script>
import { waterFall, setFontSize } from '../../plugins/utils'
import NoteToolbar from './noteToolbar'

export default {
  name: 'noteItem',
  props: ['item', 'last'],
  components: {
    NoteToolbar
  },
  mounted() {
    if (this.last) {
      setFontSize()
      waterFall()
      window.addEventListener('resize', _.debounce(() => { waterFall() }, 100))
    }
  }
}
</script>
<style lang="less" scoped>
 @import (reference) '../../style/contentVars';
.noteItem {
  position: absolute;
  // background: #ffffff;
  width: 240px; // to revise
  background: #ffffff;
  &> * {
    padding: 15px 15px 0 15px;
  }
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 
              0 3px 1px -2px rgba(0,0,0,0.2), 
              0 1px 5px 0 rgba(0,0,0,0.12);
  &:hover {
    box-shadow: 0 0 0 0 transparent,
                0 0 0 0 transparent,
                0 2px 15px rgba(0,0,0,0.30);
  }

  & .noteItemWraper {
    text-align: left;
    position: relative;
    overflow: hidden;
    min-height: 30px;
    max-height: 293px;

    & .noteTitle {
      .textStyle .noteTextEdit(14px);
      font-weight: bold; 
    }
    & .noteContent {
      .textStyle .noteTextEdit(15px);
      font-weight: 300;
    }
  }
}
</style>

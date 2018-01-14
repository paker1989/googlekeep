<template lang="jade">
  .noteItem(:style="bgColor")
    .noteItemWraper
      .noteTitle
        {{ item.title}}
      .noteContent
        {{ item.content }}
    note-toolbar.toolbar(:isEdit="false", :colorIndex.sync="colorIndex")

</template>
<script>
import { mapGetters } from 'vuex'
import { waterFall, setFontSize } from '../../plugins/utils'
import NoteToolbar from './noteToolbar'

export default {
  name: 'noteItem',
  props: ['item', 'last'],
  data() {
    return {
      colorIndex: this.item.colorIndex || 0,
    }
  },
  components: {
    NoteToolbar
  },
  mounted() {
    if (this.last) {
      setFontSize()
      waterFall()
      window.addEventListener('resize', _.debounce(() => { waterFall() }, 100))
    }
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
.noteItem {
  position: absolute;
  // background: #ffffff;
  width: 240px; // to revise
  background: #ffffff;
  // transition: left .25s ease, top .25s ease;
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
    & .toolbar {
      opacity: 1;
    }
  }

  & .toolbar {
    opacity: 0;
    transition: opacity .25s ease;
  }

  & .noteItemWraper {
    position: relative;
    text-align: left;
    min-height: 30px;
    padding-bottom:10px;

    & .noteTitle {
      .textStyle .noteTextEdit(14px);
      font-weight: bold; 
    }
    & .noteContent {
      position: relative;
      overflow: hidden;
      font-size: 15px;
      font-weight: 300;
      max-height: 280px;
      // text-overflow: ellipsis;
      // word-wrap: break-word;
      // white-space: pre-wrap;

      // &:before {
      //   content: '';
      //   position: absolute;
      //   width: 100%;
      //   height: 10px;
      //   pointer-events   : none;
      //   background-image : linear-gradient(to bottom, 
      //                    rgba(215, 204, 200, 0), 
      //                    rgba(215, 204, 200, 1) 90%);
      //   bottom: 0;
      //   left: 0;
      // }
    }
  }
}
</style>

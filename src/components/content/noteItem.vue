<template lang="jade">
  .noteItem(:style="bgColor")
    .noteItemWraper
      image-wraper.photoWraper(:images="uploadedImages | noteItemImageFilter('6')", ref="imageWraper")
      .noteTitle
        {{ item.title}}
      .noteContent(v-html="item.content")
        // {{ item.content }}
    note-toolbar.toolbar(:isEdit="false", :colorIndex.sync="colorIndex")

</template>
<script>
import { mapGetters } from 'vuex'
import { waterFall, setFontSize } from '../../plugins/utils'
import noteItemImageFilter from '../../filters'
import NoteToolbar from './noteToolbar'
import ImageWraper from './imageWraper'

export default {
  name: 'noteItem',
  props: ['item', 'last'],
  data() {
    return {
      colorIndex: this.item.colorIndex || 0,
      uploadedImages: this.item.photos,
    }
  },
  components: {
    NoteToolbar, ImageWraper
  },
  filters: {
    noteItemImageFilter,
  },
  mounted() {
    if (this.last) {
      setFontSize('.noteItem .noteItemWraper .noteTitle', 40)
      setFontSize()
      waterFall()
      $(window).on('load', () => {
        waterFall()
        window.addEventListener('resize', _.debounce(() => { waterFall() }, 100))
      })
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
    padding: 15px;
    opacity: 0;
    transition: opacity .25s ease;
  }

  & .noteItemWraper {
    position: relative;
    text-align: left;
    min-height: 30px;
    padding-bottom:10px;
    &>*:not(.photoWraper) {
      padding: 15px 15px 0 15px;
    }

    & .noteTitle {
      .textStyle .noteTextEdit(14px);
      font-weight: bold; 
      max-height: 40px;  
    }
    & .noteContent {
      position: relative;
      overflow: hidden;
      font-size: 15px;
      font-weight: 300;
      max-height: 280px;
      word-wrap: break-word;
    }
  }
}
</style>

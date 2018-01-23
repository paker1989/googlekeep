<template lang="jade">
  .noteItem(:style="bgColor")
    .noteItemWraper(@click.capture="editItem")
      image-wraper.photoWraper(:images="uploadedImages | noteItemImageFilter('6')", ref="imageWraper")
      .noteTitle
        {{ item.title}}
      .noteContent(v-html="item.content")
    note-toolbar.toolbar(:isEdit="false", :colorIndex.sync="colorIndex")

</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import Types from '../../store/mutationType'
import noteItemImageFilter from '../../filters'
import NoteToolbar from './noteToolbar'
import ImageWraper from './imageWraper'

export default {
  name: 'noteItem',
  props: ['item'],
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
  computed: {
    ...mapGetters([
      'getBgColors'
    ]),
    bgColor() {
      return this.getBgColors(this.colorIndex)
    },
  },
  methods: {
    editItem() {
      this.editNote({
        note: this.item
      })
    },
    ...mapMutations('noteStore', {
      editNote: Types.EDIT_NOTE,
    })
  },
  watch: {
    item(newVal) {
      this.colorIndex = newVal.colorIndex || 0
      this.uploadedImages = newVal.photos
    }
  }
}
</script>
<style lang="less" scoped>
 @import (reference) '../../style/contentVars';
.noteItem {
  width: 100%;
  background: #ffffff;
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

<!--
      waterFall()
      $(window).on('load', () => {
        waterFall()
        window.addEventListener('resize', _.debounce(() => { waterFall() }, 100))
      })
-->
<template lang="jade">
  .noteEdition(@focus.capture="editMode=true", :style="bgColor")
    .noteTitlePlaceHolder.textStyle(v-show="showTitlePh")
      | 标题
    .noteTextEdit.textStyle.noteTitleEdit(contenteditable="true",
                             v-show="editMode",
                             @input="tapeTitle")
    .noteContentPlaceHolder.textStyle(v-show="showContentPh")
      | 添加记事...
    note-content.noteTextEdit.textStyle                  
    note-toolbar(v-show="editMode")
    
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import NoteContent from './noteContentEditable'
import NoteToolbar from './noteToolbar'

const { mapGetters } = createNamespacedHelpers('userStore')

export default {
  name: 'noteEdition',
  data() {
    return {
      editMode: false,
      noteTitle: '',
      noteContent: '',
    }
  },
  methods: {
    stopEditing() {
      this.editMode = false
    },
    tapeTitle(event) {
      this.noteTitle = event.target.innerText
    }
  },
  components: {
    NoteToolbar, NoteContent,
  },
  computed: {
    ...mapGetters([
      'getUserBgColor'
    ]),
    bgColor() {
      return this.getUserBgColor('abc')
    },
    showTitlePh() {
      return this.editMode && this.noteTitle.length === 0
    },
    showContentPh() {
      return this.noteContent.length === 0
    }
  }
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/contentVars';

.noteEdition {
  position: relative;
  margin: 32px auto 16px auto; 
  min-height: 50px; // to remove
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
  & .textStyle{
    text-align: left;
    line-height: 23px;
    min-height: @title-mini-height;
    &.noteTitlePlaceHolder {
      position: absolute;
      color: rgba(0,0,0,.54);
      font-size: 17px;
      font-weight: bold;
      pointer-events: none;      
    }
    &.noteTitleEdit {
      font-size: 15px;
      font-weight: bold; 
    }
    &.noteContentPlaceHolder {
      position: absolute;
      color: rgba(0,0,0,.54);
      pointer-events: none;      
    }
    &.noteTextEdit {
      position: relative;
      outline: none;
      direction: ltr;
      unicode-bidi: isolate;
    }
  }

}
</style>



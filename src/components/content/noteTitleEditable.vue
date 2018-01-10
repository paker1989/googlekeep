<template lang="jade">
  .noteTitleEditable
    .noteTitlePlaceHolder(v-show="showTitlePh")
      | 标题
    .noteTitleEdit(contenteditable="true",
                   @input="tapeTitle")
</template>
<script>
export default {
  name: 'noteTitleEdit',
  props: [
    'editMode',
  ],
  data() {
    return {
      noteTitle: ''
    }
  },
  methods: {
    tapeTitle(event) {
      this.noteTitle = event.target.innerText
    }
  },
  computed: {
    showTitlePh() {
      return this.editMode && this.noteTitle.length === 0
    },
  }
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/contentVars';

.noteTitleEditable {
  .textStyle();
  & .noteTitlePlaceHolder {
    position: absolute;
    color: rgba(0,0,0,.54);
    font-size: 17px;
    font-weight: bold;
    pointer-events: none;      
  }
  & .noteTitleEdit {
    .textStyle .noteTextEdit();
    font-weight: bold; 
  }
}
</style>



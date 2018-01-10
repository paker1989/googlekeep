<template lang="jade">
  .noteMainEdition
    .noteContentPlaceHolder(v-show="showContentPh")
      | 添加记事...
    .noteTextEdit(contenteditable="true",
                  @input="tapeContent" )
</template>
<script>
export default {
  name: 'noteContentEditable',
  data() {
    return {
      noteContent: ''
    }
  },
  methods: {
    tapeContent(event) {
      this.noteContent = event.target.innerText
    }
  },
  computed: {
    showContentPh() {
      return this.noteContent.length === 0
    }
  }
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/contentVars';

.noteMainEdition {
  .textStyle();
  & .noteContentPlaceHolder {
    position: absolute;
    color: rgba(0,0,0,.54);
    pointer-events: none;      
  }
  & .noteTextEdit {
    .textStyle .noteTextEdit();
  }
}
</style>



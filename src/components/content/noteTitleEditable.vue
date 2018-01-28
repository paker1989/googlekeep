<template lang="jade">
  .noteTitleEditable
    .noteTitlePlaceHolder(v-show="showTitlePh")
      | 标题
    .noteTitleEdit(contenteditable="true",
                   ref="noteTitleEdit",
                   v-html="noteTitle",
                   v-once="true",
                   @input="tapeTitle",
                   @keydown.prevent.enter="focusContent")
</template>
<script>
/* eslint no-multi-assign: off */
export default {
  name: 'noteTitleEdit',
  props: {
    title: {
      type: String,
      default: '',
    },
    editMode: {
      type: Boolean,
    }
  },
  data() {
    return {
      noteTitle: this.title,
      target: null,
    }
  },
  mounted() {
    this.target = this.$refs.noteTitleEdit
  },
  methods: {
    focusContent() {
      this.$emit('focusContent')
    },
    tapeTitle(event) {
      this.noteTitle = event.target.innerText
      if (!this.target) {
        this.target = event.target
      }
    },
    reset() {
      if (this.target) {
        this.noteTitle = this.target.innerHTML = ''
      }
    }
  },
  computed: {
    showTitlePh() {
      return this.editMode && this.noteTitle.length === 0
    },
  },
  // watch: {
  //   title(newval) {
  //     console.log('title changed')
  //     this.target.innerHTML = this.noteTitle = newval
  //   }
  // }
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/contentVars';

.noteTitleEditable {
  .textStyle();
  .basicLayout();
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
    -webkit-user-modify: read-write-plaintext-only;
    -moz-user-modify: read-write-plaintext-only;
  }
}
</style>



<template lang="jade">
  .noteMainEdition
    .noteContentPlaceHolder(v-show="showContentPh")
      | 添加记事...
    .noteTextEdit(ref="noteTextEdit"
                  contenteditable="true",
                  @input="updateContent",
                  v-html="noteContent",
                  @paste="pastText"
                  v-once="true")
</template>
<script>
import { replaceRec } from '../../plugins/contentUtil'

export default {
  name: 'noteContentEditable',
  data() {
    return {
      noteContent: '',
      timer: null,
      timeoutDuration: 1500,
      target: null,
    }
  },
  mounted() {
    this.target = this.$refs.noteTextEdit
  },
  methods: {
    focusContent() {
      this.target.focus()
    },
    pastText(e) {
      e.preventDefault()
      const text = (e.originalEvent || e).clipboardData.getData('text/plain')
      document.execCommand('insertText', false, text)
    },
    updateContent(event) {
      const vm = this
      vm.noteContent = event.target.innerHTML
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        vm.noteContent = vm.formatterContent(event.target.innerHTML)
      }, vm.timeoutDuration)
    },
    // return formatted value
    formatterContent(originHtml) {
      const regex = []
      regex.push(
        {
          pattern: /<div>((<br>)+?)<\/div>/g,
          replacement: '$1'
        },
        {
          pattern: /<div>([\s\S]*?)<\/div>/g,
          replacement: '<br>$1'
        }
      )
      return replaceRec(originHtml, regex)
    },
    reset() {
      this.noteContent = this.target.innerHTML = ''
    },
    getFinalText() {
      return this.formatterContent(this.target.innerHTML)
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
  .basicLayout();
  & .noteContentPlaceHolder {
    position: absolute;
    color: rgba(0,0,0,.54);
    pointer-events: none;      
  }
  & .noteTextEdit {
    .textStyle .noteTextEdit();
    white-space: pre-wrap;
    -webkit-user-modify: read-write;
    -moz-user-modify: read-write;
  }
}
</style>
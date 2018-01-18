<template lang="jade">
  .noteMainEdition
    .noteContentPlaceHolder(v-show="showContentPh")
      | 添加记事...
    .noteTextEdit(contenteditable="true", @input="updateContent", v-html="noteContent",
      @paste="pastText"
      v-once="true")
</template>
<script>
import { replaceRec } from '../../plugins/contentUtil'

export default {
  name: 'noteContentEditable',
  data() {
    return {
      noteContent: '', // '假装你人还没走<br><br>旧地如重游<br><br>月圆更寂寞' &lt;div id="editArea"
      timer: null,
      timeoutDuration: 1500,
      target: null
    }
  },
  methods: {
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
        if (!vm.target) {
          vm.target = event.target
        }
        vm.noteContent = vm.formatterContent(event.target)
      }, vm.timeoutDuration)
    },
    // return formatted value
    formatterContent(target) {
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
      return replaceRec(target.innerHTML, regex)
    },
    reset() {
      if (this.target) {
        this.noteContent = this.target.innerHTML = ''
      }
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

<!--
    formatterContent(target) {
      const restore = saveCaretPosition(target)
      const vm = this
      console.log(target.innerHTML)
      const formattedHtml = target.innerHTML.replace(/<div>((<br>)+?)<\/div>/g, '$1')
        .replace(/<div>(.*?)<\/div>/g, '<br>$1')
      target.innerHTML = formattedHtml
      vm.noteContent = formattedHtml
      console.log(formattedHtml)
      restore()
    },
-->

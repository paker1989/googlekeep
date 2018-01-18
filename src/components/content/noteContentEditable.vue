<template lang="jade">
  .noteMainEdition
    .noteContentPlaceHolder(v-show="showContentPh")
      | 添加记事...
    .noteTextEdit(contenteditable="true", @input="updateContent", v-html="noteContent",
      @paste="pastText"
      v-once="true")
</template>
<script>
export default {
  name: 'noteContentEditable',
  data() {
    return {
      noteContent: '&lt;div id="editArea"', // '假装你人还没走<br><br>旧地如重游<br><br>月圆更寂寞'
      // lastEditRange: null,
      timer: null,
      timeoutDuration: 1000
    }
  },
  methods: {
    pastText(e) {
      const target = e.target
      e.preventDefault()
      const text = (e.originalEvent || e).clipboardData.getData('text/plain')
      console.log(text)
      console.log(text.indexOf('div'))
      document.execCommand('insertText', false, text)
      this.$nextTick(function() {
        // console.log('next tick')
        console.log(target.innerHTML)
        console.log($(target).html())
        console.log(target.innerHTML.indexOf('div'))
        this.formatterContent(target.innerHTML, target)
      })
    },
    updateContent(event) {
     // this.noteContent = event.target.innerText
      const vm = this
      // let selection = window.getSelection()
      // this.lastEditRange = selection.getRangeAt(0)
      // console.log('Origin lastEditRange :')
      // console.log(this.lastEditRange)
      // console.log($(event.target).html())
      const formattedHtml = $(event.target).html().replace(/\\n/g, '<br>')
      clearTimeout(this.timer)
      this.timer = setTimeout(function() {
        $(event.target).html(formattedHtml)
        vm.noteContent = formattedHtml
        let range = window.getSelection()
        range.selectAllChildren($(event.target)[0])
        range.collapseToEnd()
      }, this.timeoutDuration)
    },
    formatterContent(html, target) {
      /* TO DO */
    },
    reset() {
      /* TO DO */
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



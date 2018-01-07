<template lang="jade">
  .noteToolbar
    .toollistContainer
      a(href="#", data-toggle="tooltip", data-placement="bottom", title="提醒")
        span.glyphicon.glyphicon-bell
      a(href="#", data-toggle="tooltip", data-placement="bottom", title="图片")
        span.glyphicon.glyphicon-picture
      a.optionBg(href="#", data-placement="auto", title="背景")
        span.glyphicon.glyphicon-th
      a(href="#", data-toggle="tooltip", data-placement="bottom", title="撤销")
        span.glyphicon.glyphicon-arrow-left
      a(href="#", data-toggle="tooltip", data-placement="bottom", title="重做")
        span.glyphicon.glyphicon-arrow-right
    .actionContainer
      span 完成
    .notePaletteWraper
      note-palette
</template>
<script>
import NotePalette from './notePalette'

export default {
  name: 'noteToolbar',
  created() {
    $(() => {
      $('[data-toggle="tooltip"]').tooltip()
      $('.optionBg').popover({
        animation: true,
        html: true,
        placement: 'auto',
        template: '<div class="popover" role="tooltip"><div class="popover-content"></div></div>',
        content: function() {
          return $('.notePaletteWraper').html()
        }
      })
    })
  },
  components: {
    NotePalette,
  },
}
</script>

<style lang="less" scoped>
@import (reference) '../../style/headerVars';
.noteToolbar {
  .headerLayout;
  &> .toollistContainer {
    flex-grow: 1;
    .headerLayout(flex-start);
    &> * {
      margin-right: 2em;
    }
  }
  &> .actionContainer {
    &> span {
      border-radius: 10%;
      padding: .5em 1em;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        background: lighten(grey, 40%);
      }
    }
  } // end actionContainer
  & .notePaletteWraper {
    display: none;
  }
}



</style>



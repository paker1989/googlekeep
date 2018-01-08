<template lang="jade">
  .noteToolbar
    .toollistContainer
      a(href="#", data-toggle="tooltip", data-placement="bottom", title="提醒")
        span.glyphicon.glyphicon-bell
      a(href="#", data-toggle="tooltip", data-placement="bottom", title="图片")
        span.glyphicon.glyphicon-picture
      a.optionBg(href="#", data-toggle="tooltip", data-placement="bottom", title="背景")                  
        span.glyphicon.glyphicon-th(@mouseover.stop = "togglePalette($event, true)")
      a(href="#", data-toggle="tooltip", data-placement="bottom", title="撤销")
        span.glyphicon.glyphicon-arrow-left
      a(href="#", data-toggle="tooltip", data-placement="bottom", title="重做")
        span.glyphicon.glyphicon-arrow-right
    .actionContainer
      span 完成
    .notePaletteWraper(:style="palettePosition", @mouseleave.capture="test")
      note-palette
</template>
<script>
import NotePalette from './notePalette'

export default {
  name: 'noteToolbar',
  data() {
    return {
      palettePosition: {
        top: 0,
        left: 0,
        display: 'none'
      }
    }
  },
  created() {
    $(() => {
      $('[data-toggle="tooltip"]').tooltip()
    })
  },
  components: {
    NotePalette,
  },
  methods: {
    togglePalette(event, isShow) {
      _.extend(this.palettePosition,
        isShow ?
        {
          top: `${event.clientY + 10}px`,
          left: `${event.clientX + 10}px`,
          display: 'block'
        }
        : {
          top: 0,
          left: 0,
          display: 'none'
        })
    },
    test() {
      console.log('mouseleave')
    }
  }
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
    position: fixed;
    display: none;
  }
}



</style>



<template lang="jade">
  .noteToolbar
    .toollistContainer
      a(href="#", data-toggle="tooltip", data-placement="bottom", title="提醒")
        span.glyphicon.glyphicon-bell
      a(href="#", data-toggle="tooltip", data-placement="bottom", title="图片")
        span.glyphicon.glyphicon-picture
      a.optionBg(href="#", data-toggle="tooltip", data-placement="top", title="背景")                  
        span.glyphicon.glyphicon-th(@mouseover.stop="togglePalette($event, true)")
      a(href="#", data-toggle="tooltip", data-placement="bottom", title="撤销")
        span.glyphicon.glyphicon-arrow-left
      a(href="#", data-toggle="tooltip", data-placement="bottom", title="重做")
        span.glyphicon.glyphicon-arrow-right
    .actionContainer
      span 完成
    .notePaletteWraper(:style="palettePosition",
                       @mouseleave = "togglePalette($event, false)")
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
      const target = $(event.target)
      _.extend(this.palettePosition,
        isShow ?
        {
          top: `${Math.ceil(target.position().top) + 3}px`,
          left: `${Math.ceil(target.position().left) + 3}px`,
          display: 'block'
        }
        : {
          top: 0,
          left: 0,
          display: 'none'
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import (reference) '../../style/headerVars';
.noteToolbar {
  position: relative;
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
        background: lighten(black, 10%);
      }
    }
  } // end actionContainer
  & .notePaletteWraper {
    position: absolute;
    display: none;
  }
}



</style>



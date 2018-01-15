<template lang="jade">
  .noteToolbar
    .toollistContainer
      a(href="#", data-toggle="tooltip", data-placement="top", title="提醒")
        span.glyphicon.glyphicon-bell
      a(href="#", data-toggle="tooltip", data-placement="top", title="图片")
        span.glyphicon.glyphicon-picture(@click="openFile")
        input(type="file" ref="fileInput", accept="image/**", multiple=true,
              @change="handleFile($event)")
      a.optionBg(href="#", data-toggle="tooltip", data-placement="top", title="背景")                  
        span.glyphicon.glyphicon-th(@mouseover.stop="togglePalette($event, true)")
      a(href="#", data-toggle="tooltip", data-placement="top", title="撤销")
        span.glyphicon.glyphicon-arrow-left
      a(href="#", data-toggle="tooltip", data-placement="top", title="重做")
        span.glyphicon.glyphicon-arrow-right
    .actionContainer(v-if="isEdit")
      span(@click="saveNote") 完成
    .notePaletteWraper(:style="palettePosition",
                       @mouseleave = "togglePalette($event, false)")
      note-palette(:colorIndex.sync='selectedIndex')
</template>
<script>
import NotePalette from './notePalette'

export default {
  name: 'noteToolbar',
  props: {
    isEdit: {
      type: Boolean,
      default: true
    },
    colorIndex: Number
  },
  data() {
    return {
      selectedIndex: this.colorIndex,
      palettePosition: {
        top: 0,
        left: 0,
        display: 'none'
      }
    }
  },
  watch: {
    selectedIndex(newVal) {
      this.$emit('update:colorIndex', newVal)
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
    openFile() {
      this.$refs.fileInput.click()
    },
    handleFile(event) {
      const files = event.target.files
      if (!files) return

      [...files].forEach( file => {
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
          this.$emit('newImageUpload', {
            tmpUrl: e.target.result,
            file
          })
        }
        fileReader.readAsDataURL(file)
      })
    },
    togglePalette(event, isShow) {
      const $target = $(event.target)
      _.extend(this.palettePosition,
        isShow ?
        {
          top: `-${Math.ceil($target.position().top) + 80}px`,
          left: `${Math.ceil($target.position().left) + 5}px`,
          display: 'block'
        }
        : {
          top: 0,
          left: 0,
          display: 'none'
        })
    },
    saveNote() {
      this.$emit('saveNote')
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
    & .glyphicon-picture+input[type="file"] {
      opacity: 0;
      position: absolute; 
      width: 0.1px;
      height: 0.1px;
    }
  }
  &> .actionContainer {
    &> span {
      border-radius: 10%;
      padding: .5em 1em;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        background: lighten(lightgray, 10%);
      }
    }
  } // end actionContainer
  & .notePaletteWraper {
    position: absolute;
    display: none;
  }
}



</style>



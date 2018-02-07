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
        span.glyphicon.glyphicon-arrow-left(:class="{ isDisabled : disableUndo }",
                                            @click.prevent="undo")
      a(href="#", data-toggle="tooltip", data-placement="top", title="重做")
        span.glyphicon.glyphicon-arrow-right(:class="{ isDisabled : disableRedo }",
                                             @click.prevent="redo")
      a(href="#", data-toggle="tooltip", data-placement="top", title="更多")
        span.glyphicon.glyphicon-option-vertical(@click.prevent="displayDropdown")
    .actionContainer(v-if="isEdit")
      span(@click="saveNote") 完成
    .notePaletteWraper(:style="palettePosition",
                       @mouseleave = "togglePalette($event, false)")
      note-palette(:colorIndex.sync='selectedIndex')
    drop-down(ref="dropdown", :style="dropDownPosition",
              :actionItems="actionItems",
              v-if="isShowDropdown",
              v-cust-blur="hideDropdown",
              @dropdownEvent="emitDropdownEvent")
    tag-modifier(v-if="isShowTagModifier", :style="dropDownPosition",
                 :selectedTags = "selectedTags",
                 v-cust-blur="hideTagModifier",
                 @toggleTagToNote="toggleTagToNote")
</template>
<script>
import NotePalette from './notePalette'
import DropDown from '../common/dropdown'
import TagModifier from '../common/tagModifier'
import { custBlur } from '../../directives'

export default {
  name: 'noteToolbar',
  props: {
    isEdit: {
      type: Boolean,
      default: true
    },
    colorIndex: Number,
    cachedInputs: {
      type: Array,
      default() { return [] }
    },
    removedInputs: {
      type: Array,
      default() { return [] }
    },
    actionItems: {
      type: Object,
    },
    selectedTags: {
      type: Array,
      default() { return [] }
    }
  },
  data() {
    return {
      selectedIndex: this.colorIndex,
      palettePosition: {
        top: 0,
        left: 0,
        display: 'none'
      },
      dropDownPosition: {
        top: 0,
        left: 0,
      },
      isShowDropdown: false,
      isShowTagModifier: false,
    }
  },
  directives: {
    custBlur
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
    NotePalette, DropDown, TagModifier
  },
  methods: {
    openFile() {
      this.$refs.fileInput.click()
    },
    handleFile(event) {
      const files = event.target.files
      if (!files) return
      this.$emit('newImageUpload', [...files])
      event.target.value = '' // 手动重置，否则无法上传同样文件
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
    displayDropdown(event) {
      this.isShowDropdown = true
      const $target = $(event.target)
      this.$nextTick(function () {
        _.extend(this.dropDownPosition,
          {
            top: `${Math.ceil($target.position().top) + 20}px`,
            left: `${Math.ceil($target.position().left) - 10}px`,
          }
        )
      })
    },
    hideDropdown() {
      this.isShowDropdown = false
    },
    hideTagModifier() {
      this.isShowTagModifier = false
    },
    undo() {
      this.$emit('undo')
    },
    redo() {
      this.$emit('redo')
    },
    saveNote() {
      this.$emit('saveNote')
    },
    emitDropdownEvent(event) {
      if (event === 'addTag' || event === 'changeTag') {
        this.isShowDropdown = false
        this.isShowTagModifier = !this.isShowDropdown
      } else {
        this.$emit(event)
      }
    },
    toggleTagToNote({ tag }) {
      this.$emit('toggleTagToNote', { tag })
    }
  },
  computed: {
    disableUndo() {
      return this.cachedInputs.length < 2
    },
    disableRedo() {
      return this.removedInputs.length === 0
    },
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
    .headerLayout(space-between);
    & .glyphicon {
      color: lighten(black, 25%);
    }
    & .glyphicon-picture+input[type="file"] {
      opacity: 0;
      position: absolute; 
      width: 0.1px;
      height: 0.1px;
    }
  }
  &> .actionContainer {
    width: 50%;
    .headerLayout(flex-end);
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

  & .isDisabled {
  opacity: .3;
  }
}



</style>



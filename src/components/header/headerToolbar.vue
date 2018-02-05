<template lang="jade">
  .headerToolbar
    .toollistContainer
      a(href="#", data-toggle="tooltip", data-placement="left", title="提醒")
        span.glyphicon.glyphicon-bell
      a(href="#", data-toggle="tooltip", data-placement="left", title="提醒")
        span.glyphicon.glyphicon-bookmark(:class="{ highLight: isHighLight }",
                                          @click="toggleHighLight")
      a.optionBg(href="#", data-toggle="tooltip", data-placement="left", title="背景")                  
        span.glyphicon.glyphicon-th(@mouseover.stop="togglePalette($event, true)")
      a(href="#", title="更多")
        span.glyphicon.glyphicon-option-vertical(@click.prevent="displayDropdown")
    .notePaletteWraper(:style="palettePosition",
                       @mouseleave = "togglePalette($event, false)")
      note-palette(:colorIndex.sync='selectedIndex')
    drop-down(ref="dropdown", :style="dropDownPosition",
              :actionItems="actionItems", 
              v-if="isShowDropdown",
              v-cust-blur="hideDropdown",
              @dropdownEvent="emitDropdownEvent")
</template>
<script>
import NotePalette from '../content/notePalette'
import DropDown from '../common/dropdown'
import { custBlur } from '../../directives'

export default {
  name: 'headerToolbar',
  props: {
    actionItems: {
      type: Object
    },
    selectedNotes: {
      type: Array,
      default() { return [] }
    }
  },
  data() {
    return {
      selectedIndex: 0,
      palettePosition: {
        top: 0,
        left: 0,
        display: 'none'
      },
      dropDownPosition: {
        top: 0,
        left: 0,
      },
      isShowDropdown: false
    }
  },
  directives: {
    custBlur
  },
  components: {
    NotePalette, DropDown
  },
  computed: {
    isHighLight() {
      return this.selectedNotes.some(e => e.meta.isHighLighted)
    }
  },
  methods: {
    togglePalette(event, isShow) {
      const $target = $(event.target)
      _.extend(this.palettePosition,
        isShow ?
        {
          top: `${Math.ceil($target.position().top) + 20}px`,
          left: `${Math.ceil($target.position().left) - 100}px`,
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
            left: `${Math.ceil($target.position().left) - 100}px`,
          }
        )
      })
    },
    hideDropdown() {
      this.isShowDropdown = false
    },
    emitDropdownEvent(event) {
      this.$emit(event)
    },
    toggleHighLight() {
      this.$emit('toggleHighLight', !this.isHighLight)
    },
  },
  watch: {
    selectedIndex(newVal) {
      this.$emit('globalChangeColorIndex', newVal)
    }
  }
}
</script>

<style lang="less" scoped>
@import (reference) '../../style/headerVars';
.headerToolbar {
  position: relative;
  .headerLayout;
  &> .toollistContainer {
    flex-grow: 1;
    .headerLayout(space-between);
    & .glyphicon {
      color: lighten(black, 50%);
    }
    & .highLight {
      color: #4285f4;
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



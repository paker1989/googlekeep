<template lang="jade">
  .noteItem(:style="bgColor", :class="{ globalSelect: isGlobalSelect }",
            v-cust-blur:contentContainer="cancelGlobalSelect")
    .globalSelectIcon(data-toggle="tooltip", data-placement="bottom", title="选择该记事",
                      :class="{ globalSelect: isGlobalSelect }",
                      @click="actionGlobalSelect")
    .hightLightWraper
      span.glyphicon.glyphicon-bookmark(:class="{ isHighLighted: highLight}")
    .noteItemWraper(@click.capture="editItem")
      image-wraper.photoWraper(:images="uploadedImages | noteItemImageFilter('6')", 
                               :showDelete="false",
                               ref="imageWraper")
      .noteTitle(v-html="item.title", v-show="!isNoText")
      .noteContent(v-html="item.content", v-show="!isNoText")
      tag-Presenter(:selectedTags="item.tags", :maxDisplayItems="2")
    .toolbarWraper(:class="{ transparent: isNoText }")
      .toolbarGlobalSelectWraper(v-if="isGlobalSelecting", @click="actionGlobalSelect")
      note-toolbar.toolbar(:isEdit="false",
                           :class="{transparentBg: isNoText, globalSelect : isGlobalSelecting }",
                           :colorIndex.sync="colorIndex",
                           :actionItems="actionItems")
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import Types from '../../store/mutationType'
import noteItemImageFilter from '../../filters'
import NoteToolbar from './noteToolbar'
import ImageWraper from './imageWraper'
import TagPresenter from '../common/tagPresenter'
import noteActions from '../../assets/noteActions'
import { custBlur } from '../../directives'

/* eslint no-nested-ternary: off */
export default {
  name: 'noteItem',
  props: ['item'],
  data() {
    return {
      colorIndex: this.item.colorIndex || 0,
      uploadedImages: this.item.photos.filter(photo => !photo.meta.isArchived),
      highLight: this.item.meta.isHighLighted,
      actionItems: JSON.parse(JSON.stringify(noteActions)),
    }
  },
  components: {
    NoteToolbar, ImageWraper, TagPresenter
  },
  filters: {
    noteItemImageFilter,
  },
  directives: {
    custBlur
  },
  computed: {
    ...mapGetters([
      'getBgColors'
    ]),
    ...mapGetters('noteStore', [
      'isGlobalSelected', 'isGlobalSelecting'
    ]),
    bgColor() {
      return this.getBgColors(this.colorIndex)
    },
    isNoText() {
      return this.item.title.trim() === ''
        && this.item.content.trim() === ''
        && this.item.photos.filter(photo => photo.meta.isArchived === false).length > 0
    },
    isGlobalSelect() {
      // console.log('isGlobalSelect for ' + this.isGlobalSelected(this.item._id))
      return this.isGlobalSelected(this.item._id)
    }
  },
  methods: {
    editItem() {
      const currentGlobalStat = this.isGlobalSelecting ? (this.isGlobalSelect ? 1 : 2) : 3
      switch (currentGlobalStat) {
        case 1: // 全局事件进行中且被选中
          this.updateGlobalSelectEvent({
            noteId: this.item._id,
            isAdd: false
          })
          break
        case 2: // 全局事件进行中但未被选中
          this.updateGlobalSelectEvent({
            noteId: this.item._id,
            isAdd: true
          })
          break
        default: // 3 全局事件尚未发送
          this.editNote({
            note: this.item
          })
          break
      }
    },
    updateActionItems() {
      this.actionItems.deleteNote.isVisible = !!this.item.noteId
      this.actionItems.changeTag.isVisible = this.item.tags.length > 0
      this.actionItems.addTag.isVisible = this.item.tags.length === 0
    },
    actionGlobalSelect() {
      const currentGlobalStat = this.isGlobalSelecting ? (this.isGlobalSelect ? 1 : 2) : 3
      switch (currentGlobalStat) {
        case 1: // 全局事件进行中且被选中
          this.updateGlobalSelectEvent({
            noteId: this.item._id,
            isAdd: false
          })
          break
        case 2: // 全局事件进行中但未被选中
          this.updateGlobalSelectEvent({
            noteId: this.item._id,
            isAdd: true
          })
          break
        default: // 3 全局事件尚未发送
          this.updateGlobalSelectEvent({
            noteId: this.item._id,
            isAdd: true
          })
          break
      }
    },
    cancelGlobalSelect() {
      // console.log('cancel it')
      this.cancelGlobalSelectEvent()
    },
    ...mapMutations('noteStore', {
      editNote: Types.EDIT_NOTE,
      updateGlobalSelectEvent: Types.UPDATE_NOTE_GLOBAL_SELECT,
      cancelGlobalSelectEvent: Types.CANCEL_NOTE_GLOBAL_SELECT
    })
  },
  watch: {
    item(newVal) {
      this.colorIndex = newVal.colorIndex || 0
      this.uploadedImages = newVal.photos.filter(photo => !photo.meta.isArchived)
    }
  }
}
</script>
<style lang="less" scoped>
 @import (reference) '../../style/contentVars';
.noteItem {
  position: relative;
  width: 100%;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 
              0 3px 1px -2px rgba(0,0,0,0.2), 
              0 1px 5px 0 rgba(0,0,0,0.12);
  &:hover {
    box-shadow: 0 0 0 0 transparent,
                0 0 0 0 transparent,
                0 2px 15px rgba(0,0,0,0.30);
    & .hightLightWraper span {
      opacity: 1;
    }
    & .toolbar:not(.globalSelect) {
      opacity: 1;
      // transform: scaleY(1);
    }
    & .globalSelectIcon {
      opacity: 1;
    }
  }

  &.globalSelect {
    border: solid lighten(black, 45%);
    border-width: 5px;
    border-radius: 6px;
  }

  & .globalSelectIcon {
    position: absolute;
    border-radius: 50%;
    width: 2em;
    height: 2em;
    background-color: white;
    top:0;
    left:0;
    cursor: pointer;
    background-image: url('../../assets/globalSelect.svg');
    background-position: center;
    background-repeat: no-repeat;
    transform: translate3d(-50%, -50%, 0);
    transition: opacity .25s ease;
    box-shadow: 0 1px 1px 1px rgba(0,0,0,.1);
    z-index: 3;
    opacity: 0;
    &.globalSelect {
      background-color: lighten(black, 45%);
      opacity: 1;
    }
  }

  & .transparent {
    position:absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    & .transparentBg:not(.globalSelect) {
      background: rgba(255,255,255,0.6);
    }
  }

  & .hightLightWraper {
    position: absolute;
    top: .5em;
    right: 1em;
    & > span {
      cursor: pointer;
      z-index: 3;
      opacity: 0;
      transition: opacity .25s ease;
      &.isHighLighted {
        opacity: 1;
      }
      &.isHighLighted {
        color: #4285f4;
      }
    }    
  }

  & .toolbarGlobalSelectWraper {
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    top: 0;
    left: 0;
    z-index: 3;
  }
  & .toolbar {
    padding: 15px;
    // transform: scaleY(0);
    // transform-origin: bottom;
    opacity: 0;
    transition: opacity .25s ease;
    // transition: transform .25s ease;
  }

  & .noteItemWraper {
    position: relative;
    text-align: left;
    min-height: 30px;
    & > *:not(.photoWraper) {
      padding: 15px 15px 0 15px;
    }

    & .noteTitle {
      .textStyle .noteTextEdit(14px);
      font-weight: bold; 
      max-height: 40px;  
    }
    & .noteContent {
      position: relative;
      overflow: hidden;
      font-size: 15px;
      font-weight: 300;
      max-height: 280px;
      word-wrap: break-word;
    }
  }
}
</style>

<!--
      waterFall()
      $(window).on('load', () => {
        waterFall()
        window.addEventListener('resize', _.debounce(() => { waterFall() }, 100))
      })
-->
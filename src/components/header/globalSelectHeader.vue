<template lang="jade">
  .globalSelectHeader
    .backContainer
      .backWraper
        span.glyphicon.glyphicon-arrow-left(@click="cancelGlobalSelectEvent")
      span 已选择{{globalSelectedNotes.length}}项
    header-toolbar.toolbar(:actionItems="actionItems", :selectedNotes="globalSelectedNotes",
                           @deleteNote="deleteNotes", @toggleHighLight="toggleHighLight",
                           @globalChangeColorIndex="globalChangeColorIndex")
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Types from '../../store/mutationType'
import HeaderToolbar from './headerToolbar'
import noteActions from '../../assets/noteActions'

export default {
  name: 'globalSelectHeader',
  data() {
    return {
      actionItems: JSON.parse(JSON.stringify(noteActions)),
    }
  },
  components: {
    HeaderToolbar,
  },
  computed: {
    ...mapGetters('noteStore', [
      'globalSelectedNotes'
    ])
  },
  methods: {
    deleteNotes() {
      const vm = this
      const deleteNotesPromises = []
      this.globalSelectedNotes.forEach((note) => {
        deleteNotesPromises.push(vm.deleteNote({ noteId: note._id, isShallow: true }))
      })
      Promise.all(deleteNotesPromises).then((res) => {
        if (_.isArray(res) && res.every(e => e.isDeleted)) {
          vm.cancelGlobalSelectEvent()
        }
      }, (err) => {
        console.log(`global delete failed: ${err}`)
      })
    },
    toggleHighLight(highLightStatus) {
      const vm = this
      const actionPromises = []
      this.globalSelectedNotes.forEach((note) => {
        note.meta.isHighLighted = highLightStatus
        actionPromises.push(vm.saveNoteText({ note, isUpdateCache: true }))
      })
      Promise.all(actionPromises).then(() => {
        vm.cancelGlobalSelectEvent()
      }, (err) => {
        console.log(`global toggle highLight failed: ${err}`)
      })
    },
    globalChangeColorIndex(colorIndex) {
      const vm = this
      const actionPromises = []
      this.globalSelectedNotes.forEach((note) => {
        note.colorIndex = colorIndex
        actionPromises.push(vm.saveNoteText({ note, isUpdateCache: true }))
      })
      Promise.all(actionPromises).then(() => {
        vm.cancelGlobalSelectEvent()
      }, (err) => {
        console.log(`global delete failed: ${err}`)
      })
    },
    ...mapMutations('noteStore', {
      cancelGlobalSelectEvent: Types.CANCEL_NOTE_GLOBAL_SELECT
    }),
    ...mapActions('noteStore', [
      'deleteNote', 'saveNoteText'
    ])
  }
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/headerVars';
.globalSelectHeader {
  .headerLayout;
  position: fixed;
  top:0;
  background-color: white;
  width: 100%;
  height: @bar-height;
  padding: 0 @padding-hor;
  z-index: 998;
  transition: all .35s ease;
  & > .toolbar {
    flex-basis: 150px;
  }
  & > .backContainer {
    height: 100%;
    color: lighten(black, 50%);
    font-size: 1.3em;
    font-weight: 100;
    letter-spacing: 2px;
    & > * {
      margin-right: .75em;
      line-height: @bar-height;
      vertical-align: middle;
    }
    & .backWraper {
      display: inline-block;
      cursor: pointer;
      padding: 0 .75em;
      &:hover {
        color: lighten(black, 20%);
      }
    }
  } // backContainer end
}
</style>



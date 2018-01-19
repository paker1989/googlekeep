<template lang="jade">
  .noteWaterfallWraper
    .noteItemColumns(v-for="i in nbColumns", v-cloak="true")
      note-item(v-for="(note, index) in items",
                :item="note",
                v-if="index % nbColumns === i-1",
                :last="index===items.length-1",
                :key="note._id")
</template>
<script>
import NoteItem from './noteItem'

export default {
  name: 'noteWaterfallWraper',
  props: ['items'],
  data() {
    return {
      align: 'center',
      nbColumns: 1,
    }
  },
  components: {
    NoteItem,
  },
  mounted() {
    const vm = this
    window.addEventListener('resize', _.debounce(() => { vm.resetColumnSize(vm.items) }, 500))
  },
  watch: {
    items(newVal) {
      this.resetColumnSize(newVal)
    }
  },
  methods: {
    resetColumnSize(notes) {
      const wraperWidth = this.$el.clientWidth
      const itemWidth = 240
      this.nbColumns = Math.min(Math.floor(wraperWidth / itemWidth), notes.length)
    }
  }
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/headerVars';
.noteWaterfallWraper {
  .headerLayout(center, row, nowrap, flex-start);
  position: relative;
  margin: 0 auto;
  width: 70%;
  height: 1000px;
  & .noteItemColumns {
   .headerLayout(flex-start, column, nowrap, flex-start);
   width: 260px;
   padding: 0 10px;
   & > * {
     margin: 10px;
   }
  }

}
</style>
<!--
  .headerLayout(flex-start, column, wrap, flex-start);
  position: relative;
  margin: 0 auto;
  max-width: 70vw;

  :last="index===items.length-1",
-->
<template lang="jade">
  .contentContainer
    note-edition
</template>
<script>
import NoteEdition from './noteEdition'

export default {
  name: 'contentContainer',
  components: {
    NoteEdition,
  }
}
</script>
<style lang="less" scoped>
// @import (reference) '../../style/headerVars';
.contentContainer {
  box-sizing: border-box;
  position: relative;
  width: 100vw;
  max-width: 100%;
  transition: all .25s ease;
}
</style>



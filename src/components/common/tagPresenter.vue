<template lang="jade">
  .tagPresenter
     
</template>
<script>
export default {
  name: 'tagPresenter',
  props: {
    maxDisplayItems: {
      type: Number,
      default: -1 // meaning no limitation
    },
    selectedTags: {
      type: Array,
      default() { return [] }
    }
  },
  created() {
    
  }
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/headerVars';
.tagPresenter {
  .headerLayout(flex-start);
  & .
}
</style>
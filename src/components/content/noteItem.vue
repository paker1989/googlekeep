<template lang="jade">
  .noteItem
    .noteContainer
      {{ item.title}}
      {{ item.content }}
</template>
<script>
import  waterFall  from '../../plugins/custWaterFall'

export default {
  name: 'noteItem',
  props: ['item', 'last'],
  mounted() {
    if(this.last) {
      waterFall()
      window.addEventListener('resize', _.debounce( () => { waterFall() }, 100))
    }
  }
}
</script>
<style lang="less" scoped>
// @import (reference) '../../style/headerVars';
.noteItem {
  position: absolute;
  min-height: 80px; // to remove
  background: #ffffff;
  width: 220px; // to revise
  & .noteContainer {
    position: relative;
    background: #ffffff;
    margin: 10px;  // to revise
    
    // height: 100px; // to remove
  }
  // @media only screen and (min-width : 600px) {
  //   width: 240px;
  // }
  // @media only screen and (max-width : 600px) {
  //   width: 600px;
  // }
}
</style>



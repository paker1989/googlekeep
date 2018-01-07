<template lang="jade">
  .nodePalette
    .colorWraper(v-for="i in 12")  
</template>
<script>
export default {
  name: 'nodePalette',
  data() {
    return {
      nbs: 12,
    }
  },
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/headerVars';
.nodePalette {
  position: relative;
  .headerLayout(space-around, row, wrap);
  width: 136px;
  padding: 5px 7px 3px;
  z-index: 999;
  background: white;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  & .colorWraper {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    margin: 5px auto;
    background-color:rgb(255, 138, 128);
  }
}
</style>



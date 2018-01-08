<template lang="jade">
  .nodePalette
    .colorWraper(v-for="(item, index) in bgColors", :style="item", :key="index")  
</template>
<script>
/* eslint import/no-absolute-path: off, no-console: off */
import paletteColors from '../../../static/paletteColors'

export default {
  name: 'nodePalette',
  data() {
    return {
      bgColors: [],
    }
  },
  created() {
    this.bgColors = _.assignIn(this.bgColors, paletteColors)
  }
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
    cursor: pointer;
    &:hover {
      border: 2px solid rgba(0,0,0,0.4);
    }
  }
}
</style>



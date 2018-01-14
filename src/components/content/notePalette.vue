<template lang="jade">
  .nodePalette
    .colorWraper(v-for="(item, index) in bgColors",
                 :style="item",
                 :class="{selected: index === colorIndex }",
                 :key="index",
                 @click="setBgColor(index)")  
</template>
<script>
// import { createNamespacedHelpers } from 'vuex'
import paletteColors from '../../../static/paletteColors'
// import Types from '../../store/mutationType'

// const { mapGetters, mapMutations } = createNamespacedHelpers('userStore')

export default {
  name: 'nodePalette',
  data() {
    return {
      bgColors: [],
    }
  },
  props: ['colorIndex'],
  created() {
    this.bgColors = _.assignIn(this.bgColors, paletteColors)
  },
  methods: {
    setBgColor(index) {
      this.$emit('update:colorIndex', index)
    }
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
    &:hover, &.selected {
      border: 2px solid rgba(0,0,0,0.4);
    }
  }
}
</style>



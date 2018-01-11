<template lang="jade">
  .noteItem
    {{ item.title}}
    {{ item.content }}
</template>
<script>
export default {
  name: 'noteItem',
  props: ['item']
}
</script>
<style lang="less" scoped>
// @import (reference) '../../style/headerVars';
.noteItem {
  background: white;
  min-height: 80px; // to remove
  // margin: 16px;
  @media only screen and (min-width : 600px) {
    width: 240px;
  }
  @media only screen and (max-width : 600px) {
    width: 600px;
  }
}
</style>



<template lang="jade">
  .modalWraper
     slot
</template>
<script>
export default {
  name: 'modal',
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/headerVars';
.modalWraper {
  position: absolute;
  font-size: .9em;
  border-radius: 2px;
  box-shadow: 0 0 4px rgba(0,0,0,0.2);
  background-color: white;
  z-index: 5002;
  min-width: 102px;
}
</style>
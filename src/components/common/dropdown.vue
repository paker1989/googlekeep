<template lang="jade">
  .dropdownContainer
    ul
      li(v-for="item in actionItems")
        span {{ item }}
</template>
<script>
export default {
  name: 'dropdown',
  props: ['actionItems']
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/headerVars';

  .dropdownContainer {
    position: absolute;
    font-size: .9em;
    border-radius: 2px;
    box-shadow: 0 0 4px rgba(0,0,0,0.2);
    background-color: white;
    z-index: 5002;
    min-width: 102px;
     & ul {
       .headerLayout(flex-start, column, nowrap, flex-start);
       list-style-type: none;
       width: 100%;
       padding: 0 0 10px 0;
       margin: 0;
       & > li {
         text-align: left;
         width: 100%;
         padding: 7px 10px 3px 17px;
         cursor: pointer;
         &:hover {
           background: darken(white, 5%);
         }
       }
     }
  }
</style>
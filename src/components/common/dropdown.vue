<template lang="jade">
  modal.dropdownContainer
    ul
      li(v-for="item in actionItems")
        span {{ item }}
</template>
<script>
import Modal from './modal'

export default {
  name: 'dropdown',
  props: ['actionItems'],
  components: {
    Modal,
  }
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/headerVars';
.dropdownContainer {
    & ul {
      .headerLayout(flex-start, column, nowrap, flex-start);
      list-style-type: none;
      width: 100%;
      padding: 0 0 10px 0;
      margin: 0;
      & > li {
        white-space: nowrap;
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
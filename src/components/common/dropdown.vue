<template lang="jade">
  modal.dropdownContainer
    ul
      li(v-for="(item, index) in items", :key="index", v-if="item.isVisible",
         @click.stop="emitAction(item.event)")
        span {{ item.label }}
</template>
<script>
import Modal from './modal'

export default {
  name: 'dropdown',
  props: ['actionItems'],
  components: {
    Modal,
  },
  computed: {
    items() {
      return Object.values(this.actionItems)
    }
  },
  methods: {
    emitAction(event) {
      this.$emit('dropdownEvent', event)
    }
  }
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/headerVars';
.dropdownContainer {
    position: absolute;
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
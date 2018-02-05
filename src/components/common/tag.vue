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

</style>